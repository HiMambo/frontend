"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { InputForm } from "./InputForm";

interface ForgotPasswordProps {
  onSwitchToSignup: () => void;
  onSwitchToLogin: () => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  onSwitchToSignup,
  onSwitchToLogin
}) => {
  return (
    <div className="flex flex-col bg-surface gap-[var(--spacing-800)] p-[var(--spacing-600)] items-center w-full">
      {/* Header */}
      <h2 className="heading-h5-light text-secondary text-center border-b-2 border-[var(--text-disabled)] py-[var(--spacing-600)] w-full">
        Forgot Password
      </h2>

      {/* Subheader */}
      <p className="body-m text-tertiary w-[var(--width-authbuttons)] text-justify">
        Please enter your email to reset your password
      </p>

      {/* Form */}
      <InputForm formLabel="Email" />

      {/* Submit */}
      <Button className="w-[var(--width-authforms)]">Reset Password</Button>

      {/* Links: forgot + signup */}
      <div className="flex flex-col gap-[var(--spacing-300)] items-center">
        <div className="flex items-center body-m gap-2">
          <span className="text-tertiary">Remember your password?</span>
          <button className="text-primary hover:text-[var(--terracotta-600)] hover:underline hover:cursor-pointer" onClick={onSwitchToLogin}>Log in</button>
        </div>
        <div className="flex items-center body-m gap-2">
          <span className="text-tertiary">Don’t have an account?</span>
          <button className="text-primary hover:text-[var(--terracotta-600)] hover:underline hover:cursor-pointer" onClick={onSwitchToSignup}>Sign up</button>
        </div>
      </div>
    </div>
  );
};
