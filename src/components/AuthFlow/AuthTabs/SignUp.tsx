"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CheckedIcon, GoogleIcon, NotCheckedIcon } from "@/components/shared/IconComponents"
import { BrandInputForm } from "../../brand/BrandInputForm";
import { FaApple } from "react-icons/fa";
import { ChevronDown } from "lucide-react";
import { useGoogleAuth } from "@/hooks/auth/useGoogleAuth";
import { useAuth } from "@/context/AuthContext";

export const SignUp: React.FC = () => {

  const { formData, updateFormData, setActiveView, onComplete } = useAuth();
  const { isGoogleLoading, handleGoogleAuth } = useGoogleAuth(onComplete);

  return (
    <div className="flex flex-col bg-surface gap-[var(--spacing-1000)] p-[var(--spacing-600)] items-center w-full">
      {/* Header */}
      <h2 className="heading-h5-light text-secondary text-center border-b-2 border-[var(--text-disabled)] py-[var(--spacing-600)] w-full">
        Create an account
      </h2>

      {/* Form fields */}
      <div className="grid grid-cols-2 gap-[var(--spacing-800)] w-full">
        {/* Row 1 */}
        <BrandInputForm 
          formLabel="First Name *" 
          formLabelClassName="body-s text-disabled"
          value={formData.signup.firstName}
          onChange={(val) => updateFormData("signup", "firstName", val)}
        />
        <BrandInputForm 
          formLabel="Last Name *" 
          formLabelClassName="body-s text-disabled"
          value={formData.signup.lastName}
          onChange={(val) => updateFormData("signup", "lastName", val)}
        />

        {/* Row 2 */}
        <BrandInputForm 
          formLabel="Email *" 
          formLabelClassName="body-s text-disabled"
          value={formData.signup.email}
          onChange={(val) => updateFormData("signup", "email", val)}
        />
        <BrandInputForm 
          formLabel="Set password *"
          formLabelClassName="body-s text-disabled"
          contentHidden 
          value={formData.signup.password}
          onChange={(val) => updateFormData("signup", "password", val)}
        />

        {/* Row 3 */}
        <div className="relative">
          <select className="w-full bg-white body-m text-tertiary h-[var(--height-input)] px-[var(--spacing-600)] py-[var(--spacing-400)] rounded-300 focus:outline-none appearance-none">
            <option value="">Where did you hear about us</option>
            <option value="search">Search Engine</option>
            <option value="social">Social Media</option>
            <option value="friend">Friend/Family</option>
            <option value="other">Other</option>
          </select>
          <ChevronDown className="icon-size-s text-disabled absolute right-[var(--spacing-400)] top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <div className="flex items-center gap-[var(--spacing-200)]">
          <div 
            className="icon-size-s text-primary flex-shrink-0 cursor-pointer"
            onClick={() => updateFormData('signup', 'acceptedTerms', !formData.signup.acceptedTerms)}
          >
            {formData.signup.acceptedTerms? (
              <CheckedIcon className="w-full h-full" />
            ) : (
              <NotCheckedIcon className="w-full h-full" />
            )}
          </div>
          <label className="body-m text-tertiary cursor-pointer">
            I have read & accept the <a href="#" className="underline">Terms of Service</a> and the <a href="#" className="underline">Privacy Policy</a>
          </label>
        </div>
      </div>

      {/* Submit */}
      <Button className="w-full" onClick={onComplete}>Sign up</Button>

      {/* Or log in */}
      <div className="flex items-center text-primary body-m gap-2">
        <span className="text-tertiary">Already have an account?</span>
        <button className="text-primary hover:text-[var(--terracotta-600)] hover:underline hover:cursor-pointer" onClick={() => setActiveView("login")}>Log in</button>
      </div>

      {/* Divider + Google Sign Up */}
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
          onClick={handleGoogleAuth}
          disabled={isGoogleLoading}
        >
          <GoogleIcon className="icon-size-s" />
          {isGoogleLoading ? 'Signing up...' : 'Sign up with Google'}
        </Button>
        <Button variant="outline" className="w-[var(--width-authbuttons)] flex items-center gap-[var(--spacing-200)]">
            <FaApple className="icon-size-s text-black" />
            Sign up with Apple
        </Button>
      </div>
    </div>
  );
};
