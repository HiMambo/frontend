"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function CreateAccountForm() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("spanish");
  const [role, setRole] = useState<string | undefined>();
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const initials = useMemo(() => {
    const parts = fullName.trim().split(/\s+/);
    return (
      parts
        .slice(0, 2)
        .map((p) => p[0]?.toUpperCase() ?? "")
        .join("") || "EM"
    );
  }, [fullName]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: call signup API later; for now, go to verify step
    // If you want to pass the email to the verify page:
    // router.push(`/register-experience/verify?email=${encodeURIComponent(email)}`);
    router.push("/register-experience/verify");
  }

  return (
    <form onSubmit={submit} className="grid md:grid-cols-2 gap-400 relative">
      {/* badge avatar */}
      <div className="hidden md:block absolute right-400 -top-200">
        <div className="w-1200 h-1200 rounded-1000 bg-neutral-100 grid place-items-center text-terracotta-900 font-semibold text-400">
          {initials}
        </div>
      </div>

      <div className="md:col-span-2">
        <h3 className="text-2xl font-semibold text-primary">
          Create Free Account
        </h3>
        <p className="text-sm text-neutral-600 mt-050">
          Please provide your contact details below & start your registration.
        </p>
      </div>

      <div>
        <Label htmlFor="fullName">Full Name *</Label>
        <Input
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enrique Maldonado"
          className="mt-150"
          required
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+49 234 338 76 984"
          className="mt-150"
          required
        />
      </div>

      <div>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="enrique@himambo.com"
          className="mt-150"
          required
        />
      </div>

      <div>
        <Label htmlFor="password">Password *</Label>
        <div className="relative mt-150">
          <Input
            id="password"
            type={showPwd ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          <button
            type="button"
            onClick={() => setShowPwd((v) => !v)}
            className="absolute right-200 top-1/2 -translate-y-1/2 text-neutral-500"
            aria-label={showPwd ? "Hide password" : "Show password"}
          >
            {showPwd ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <div>
        <Label>Languages</Label>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="mt-150">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="spanish">Spanish</SelectItem>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="german">German</SelectItem>
            <SelectItem value="french">French</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>What is your role *</Label>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="mt-150">
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="owner">Owner</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="marketer">Marketer</SelectItem>
            <SelectItem value="guide">Guide</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="md:col-span-2 flex items-start gap-200">
        <Checkbox
          id="terms"
          checked={accepted}
          onCheckedChange={(v) => setAccepted(!!v)}
        />
        <label
          htmlFor="terms"
          className="text-sm text-neutral-700 leading-snug"
        >
          I have read & accept the{" "}
          <a className="underline" href="#">
            Terms of Service
          </a>{" "}
          and the{" "}
          <a className="underline" href="#">
            Privacy Policy
          </a>
          .
        </label>
      </div>

      <div className="md:col-span-2">
        <Button
          type="submit"
          disabled={!accepted || !role}
          className="w-full bg-yellow-500 hover:bg-yellow-400 text-white rounded-300 h-1200"
        >
          Sign Up
        </Button>
      </div>
    </form>
  );
}
