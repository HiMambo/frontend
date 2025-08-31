// src/components/PartnerOnboarding/VerifyEmailForm.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

const OTP_LENGTH = 4;
const RESEND_SECONDS = 30;
const NEXT_STEP = "/register-experience/business-details";

export default function VerifyEmailForm() {
  const router = useRouter();
  const [code, setCode] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  const canSubmit = useMemo(() => code.every((c) => c.length === 1), [code]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  // Resend countdown
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [secondsLeft]);

  function handleChange(i: number, v: string) {
    const onlyDigit = v.replace(/\D/g, "");
    setCode((prev) => {
      const next = [...prev];
      next[i] = onlyDigit.slice(-1) ?? "";
      return next;
    });
    if (onlyDigit && i < OTP_LENGTH - 1) {
      inputsRef.current[i + 1]?.focus();
    }
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    const cur = code[i];
    if (e.key === "Backspace" && !cur && i > 0) {
      setCode((prev) => {
        const next = [...prev];
        next[i - 1] = "";
        return next;
      });
      inputsRef.current[i - 1]?.focus();
      e.preventDefault();
    }
    if (e.key === "ArrowLeft" && i > 0) inputsRef.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < OTP_LENGTH - 1)
      inputsRef.current[i + 1]?.focus();
  }

  // Accept paste on the wrapper or any input
  function handlePaste(e: React.ClipboardEvent) {
    const txt = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (!txt) return;
    const arr = txt.split("");
    setCode((prev) => prev.map((_, i) => arr[i] ?? ""));
    inputsRef.current[Math.min(txt.length, OTP_LENGTH) - 1]?.focus();
    e.preventDefault();
  }

  function onVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    router.push(NEXT_STEP); // immediate redirect
  }

  function resend() {
    if (secondsLeft > 0) return;
    // TODO: call resend API if needed
    setSecondsLeft(RESEND_SECONDS);
  }

  return (
    <form onSubmit={onVerify} className="flex flex-col items-center gap-400">
      {/* OTP boxes */}
      <div className="flex items-center gap-300" onPaste={handlePaste}>
        {code.map((c, i) => (
          <input
            key={i}
            ref={(el) => (inputsRef.current[i] = el)} // ✅ restore this line
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            autoComplete="one-time-code"
            className="
      w-12 h-12 text-center text-3xl font-semibold
      rounded-md border-2 bg-white
      border-green-300 focus:border-green-600
      focus:outline-none focus:ring-2 focus:ring-green-500
      text-[color:var(--terracotta-900)]
    "
            value={c}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            aria-label={`Digit ${i + 1}`}
          />
        ))}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="bg-yellow-500 hover:bg-yellow-400 text-white rounded-300 px-600 h-1200"
        disabled={!canSubmit}
      >
        Verify Code
      </Button>

      {/* Resend */}
      <p className="text-xs text-neutral-600">
        Didn’t receive the code yet?{" "}
        <button
          type="button"
          onClick={resend}
          className={`underline ${
            secondsLeft > 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-disabled={secondsLeft > 0}
        >
          Resend code{secondsLeft > 0 ? ` (${secondsLeft}s)` : ""}
        </button>
      </p>
    </form>
  );
}
