"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { BadgeCheck } from "lucide-react";

export const Success: React.FC = () => {
  return (
    <div className="flex flex-col bg-surface gap-[var(--spacing-800)] p-[var(--spacing-600)] items-center">
      {/* Header */}
      <div className="flex items-center justify-center gap-[var(--spacing-400)] border-b-2 border-[var(--text-disabled)] py-[var(--spacing-600)] w-full">
        <BadgeCheck className="icon-size-l text-secondary" />
        <h2 className="heading-h5-light text-secondary">
          Successful
        </h2>
      </div>

      {/* Subheader */}
      <p className="body-m text-tertiary w-[var(--width-authforms)] text-justify">
        Congratulations your password has been changed. Click continue to login.
      </p>

      {/* Submit */}
      <Button className="w-[var(--width-authforms)]">Continue</Button>
    </div>
  );
};
