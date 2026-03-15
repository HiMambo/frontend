"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { InputForm } from "./InputForm";
import { useAuth } from "@/context/AuthContext";

export const ResetPassword: React.FC = () => {
  
  const { formData, updateFormData, setActiveView } = useAuth();

  return (
    <div className="flex flex-col bg-surface gap-[var(--spacing-800)] p-[var(--spacing-600)] items-center">
      {/* Header */}
      <h2 className="heading-h5-light text-secondary text-center border-b-2 border-[var(--text-disabled)] py-[var(--spacing-600)] w-full">
        Set a new Password
      </h2>

      {/* Subheader */}
      <p className="body-m text-tertiary w-[var(--width-authbuttons)] text-justify">
        Create a new password. Ensure it contains at least 8 characters, including one lowercase, one uppercase...
      </p>

      {/* Input Forms */}
      <div className="flex flex-col gap-[var(--spacing-800)] items-center w-full">
        <InputForm 
          formLabel="New password"
          contentHidden 
          value={formData.reset.password}
          onChange={(val) => updateFormData("reset", "password", val)}
        />
        <InputForm 
          formLabel="Confirm new password" 
          contentHidden 
          value={formData.reset.confirm}
          onChange={(val) => updateFormData("reset", "confirm", val)}
        />
      </div>

      {/* Submit */}
      <Button 
        className="w-[var(--width-authforms)]"
        onClick={() => setActiveView('success')}
      >
        Reset Password
      </Button>
      
    </div>
  );
};
