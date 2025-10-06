"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "../IconComponents";
import { InputForm } from "./InputForm";
import { FaApple } from "react-icons/fa";

interface LoginProps {
  onSwitchToSignup: () => void;
  onSwitchToForgot: () => void;
  onGoogleAuth: () => Promise<void>;
  isGoogleLoading: boolean;
  onComplete: () => void;
}

export const Login: React.FC<LoginProps> = ({ 
  onSwitchToSignup,
  onSwitchToForgot,
  onGoogleAuth, 
  isGoogleLoading,
  onComplete
}) => {
  return (
    <div className="flex flex-col bg-surface gap-[var(--spacing-1000)] p-[var(--spacing-600)] items-center w-full">
      {/* Header */}
      <h2 className="heading-h5-light text-secondary text-center border-b-2 border-[var(--text-disabled)] py-[var(--spacing-600)] w-full">
        Login
      </h2>

      {/* Form fields */}
      <div className="flex flex-col gap-[var(--spacing-800)] items-center w-full">
        <InputForm formLabel="Login" />
        <InputForm formLabel="Password" contentHidden />
      </div>

      {/* Submit */}
      <Button className="w-[var(--width-authforms)]" onClick={onComplete}>Login</Button>

      {/* Links: forgot + signup */}
      <div className="flex flex-col gap-[var(--spacing-600)] items-center text-primary body-m">
        <button className="text-primary hover:text-[var(--terracotta-600)] hover:underline hover:cursor-pointer" onClick={onSwitchToForgot}>Forgot your password?</button>
        <div className="flex gap-2">
          <span className="text-tertiary">Don’t have an account?</span>
          <button className="text-primary hover:text-[var(--terracotta-600)] hover:underline hover:cursor-pointer" onClick={onSwitchToSignup}>Sign up</button>
        </div>
      </div>

      {/* Divider + Google login */}
      <div className="flex flex-col gap-[var(--spacing-300)] items-center w-full">
        {/* Divider row */}
        <div className="flex items-center w-full">
          <div className="flex-1 border-t-2 border-[var(--text-disabled)] mr-[var(--spacing-600)]" />
          <span className="body-l text-primary whitespace-nowrap">
            Or continue with
          </span>
          <div className="flex-1 border-t-2 border-[var(--text-disabled)] ml-[var(--spacing-600)]" />
        </div>

        <Button 
          variant="outline"
          className="w-[var(--width-authbuttons)] flex items-center gap-[var(--spacing-200)]"
          onClick={onGoogleAuth}
          disabled={isGoogleLoading}
        >
          <GoogleIcon className="icon-size-s" />
          {isGoogleLoading ? 'Logging in...' : 'Login with Google'}
        </Button>
        <Button variant="outline" className="w-[var(--width-authbuttons)] flex items-center gap-[var(--spacing-200)]">
          <FaApple className="icon-size-s text-black" />
            Login with Apple
        </Button>
      </div>
    </div>
  );
};
