"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface BrandMultiLineInputProps {
  formLabel: string;
  formLabelClassName?: string;
  width?: string;
  className?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  lines: number;
  placeholder?: string;
  description?: string;
  descriptionClassName?: string;
  error?: string;
}

export const BrandMultiLineInput: React.FC<BrandMultiLineInputProps> = ({
  formLabel,
  formLabelClassName = "body-s text-disabled",
  width = "w-full",
  className = "",
  value,
  onChange,
  onBlur,
  lines,
  placeholder = "",
  description = "",
  descriptionClassName = "",
  error,
}) => {
  return (
    <div className={`flex flex-col gap-300 ${width} ${className}`}>
      {/* Label */}
      <label className={formLabelClassName}>{formLabel}</label>
      {/* Description (optional) */}
      {description && (
        <label className={descriptionClassName}>{description}</label>
      )}
      {/* Textarea */}
      <textarea
        rows={lines}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={cn(
          "w-full bg-white body-m text-tertiary", 
          "px-[var(--spacing-600)] py-[var(--spacing-400)]",
          "rounded-300 focus:outline-none resize-none",
          "placeholder:text-disabled",
          error ? "border border-[3px] border-destructive" : ""
        )}
      />

      {/* Error Message */}
      {error && <p className="body-s text-destructive">{error}</p>}

    </div>
  );
};
