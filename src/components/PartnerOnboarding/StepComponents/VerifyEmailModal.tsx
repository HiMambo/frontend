import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface VerifyEmailModalProps {
  open: boolean;
  email: string;
  onVerified: () => void;
  onCancel: () => void;
}

export function VerifyEmailModal({ open, email, onVerified, onCancel }: VerifyEmailModalProps) {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const code = digits.join("");

  // Cooldown timer for resend button
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleDigitChange = (index: number, value: string) => {
    // Only accept a single digit
    const digit = value.replace(/\D/g, "").slice(-1);
    const newDigits = [...digits];
    newDigits[index] = digit;
    setDigits(newDigits);
    setError("");

    // Auto-advance to next box
    if (digit && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (digits[index] === "" && index > 0) {
        // Move back and clear previous
        const newDigits = [...digits];
        newDigits[index - 1] = "";
        setDigits(newDigits);
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current
        const newDigits = [...digits];
        newDigits[index] = "";
        setDigits(newDigits);
      }
    } else if (e.key === "Enter" && !isVerifying && code.length === 4) {
      handleVerify();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (!pasted) return;
    const newDigits = ["", "", "", ""];
    for (let i = 0; i < pasted.length; i++) newDigits[i] = pasted[i];
    setDigits(newDigits);
    setError("");
    // Focus the box after the last pasted digit (or last box)
    const nextIndex = Math.min(pasted.length, 3);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerify = async () => {
    if (code.length < 4) {
      setError("Please enter all 4 digits");
      return;
    }

    setIsVerifying(true);
    setError("");

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/verify-email', {
      //   method: 'POST',
      //   body: JSON.stringify({ email, code }),
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate validation (replace with actual response check)
      if (code === "1234") {
        setSuccess(true);
        setTimeout(() => {
          onVerified();
        }, 1500);
      } else {
        setError("Invalid verification code. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setResendCooldown(60);
    setError("");

    try {
      // TODO: Replace with actual API call
      // await fetch('/api/resend-verification', {
      //   method: 'POST',
      //   body: JSON.stringify({ email }),
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log("Verification code resent to:", email);
    } catch {
      setError("Failed to resend code. Please try again.");
      setResendCooldown(0);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <DialogContent className="flex flex-col px-1200 py-800 gap-1200 w-[var(--onboarding-step-card-width)] items-center">
        <DialogHeader>
          <DialogTitle className="text-center body-xxl-label text-primary">
            {success ? "Email Verified!" : "Verify Your Business Email Address"}
          </DialogTitle>
          <DialogDescription className="text-start body-l text-primary">
            {success ? (
              <span className="flex items-center justify-center gap-2 text-teal-500">
                <CheckCircle className="icon-size-s" />
                Your email has been successfully verified
              </span>
            ) : (
              <>
                We&apos;ve sent a verification code to
                <br />
                <strong className="text-primary">{email}</strong>
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        {!success && (
          <div className="flex flex-col gap-1200">
            {/* 4-digit code input + error anchored below without affecting layout */}
            <div className="relative flex justify-center pb-400">
              <div className="flex gap-600">
                {digits.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleDigitChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className={[
                    // Size
                    "badge-size-s",
                    // Shape
                    "rounded-400",
                    // Border
                    "shadow-[inset_0_0_0_2px_var(--surface-accent-2)]",
                    // Remove default outline
                    "outline-none",
                    // Typography
                    "text-center heading-h4 text-primary",
                    // Background
                    "bg-transparent",
                    // Cursor
                      "cursor-text",
                    ].join(" ")}
                  />
                ))}
              </div>

              {/* Error message — absolutely positioned so it never shifts the button */}
              {error && (
                <p className="absolute top-full text-center body-s text-[var(--text-error,red)] w-full">
                  {error}
                </p>
              )}
            </div>

            <Button
              onClick={handleVerify}
              disabled={isVerifying || code.length < 4}
              className="w-full"
            >
              {isVerifying ? "Verifying..." : "Verify Email"}
            </Button>

            <div className="text-center body-m text-tertiary">
              Didn&apos;t receive the code yet?{" "}
              {resendCooldown > 0 ? (
                <span>Resend in {resendCooldown}s</span>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-primary hover:text-[var(--text-secondary)] underline transition-colors cursor-pointer"
                >
                  Resend Code
                </button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}