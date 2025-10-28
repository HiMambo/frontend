"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { InputForm } from "./InputForm";
import { useAuth } from "@/context/AuthContext";

export const ForgotPassword: React.FC = () => {

  const { formData, updateFormData, setActiveView } = useAuth();

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
      <InputForm 
        formLabel="Email"
        value={formData.forgot.email}
        onChange={(val) => updateFormData("forgot", "email", val)}
      />

      {/* Submit */}
      <Button 
        className="w-[var(--width-authforms)]"
        onClick={() => setActiveView('reset')}
      >
        Reset Password
      </Button>

      {/* Links: forgot + signup */}
      <div className="flex flex-col gap-[var(--spacing-300)] items-center">
        <div className="flex items-center body-m gap-2">
          <span className="text-tertiary">Remember your password?</span>
          <button className="text-primary hover:text-[var(--terracotta-600)] hover:underline hover:cursor-pointer" onClick={() => setActiveView("login")}>Log in</button>
        </div>
        <div className="flex items-center body-m gap-2">
          <span className="text-tertiary">Don’t have an account?</span>
          <button className="text-primary hover:text-[var(--terracotta-600)] hover:underline hover:cursor-pointer" onClick={() => setActiveView("signup")}>Sign up</button>
        </div>
      </div>
    </div>
  );
};
