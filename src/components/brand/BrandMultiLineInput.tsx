"use client";

import React from "react";

interface BrandMultiLineInputProps {
  formLabel: string;
  formLabelClassName?: string;
  width?: string;
  className?: string;
  value: string;
  onChange: (value: string) => void;
  lines: number;
  placeholder?: string;
  description?: string;
  descriptionClassName?: string;
}

export const BrandMultiLineInput: React.FC<BrandMultiLineInputProps> = ({
  formLabel,
  formLabelClassName = "body-s text-disabled",
  width = "w-full",
  className = "",
  value,
  onChange,
  lines,
  placeholder = "",
  description = "",
  descriptionClassName = "",
}) => {
  return (
    <div className={`flex flex-col gap-[var(--spacing-300)] ${width} ${className}`}>
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
        className={`
          w-full bg-white body-m text-tertiary 
          px-[var(--spacing-600)] py-[var(--spacing-400)]
          rounded-300 focus:outline-none resize-none
          placeholder:text-disabled
        `}
      />
    </div>
  );
};
