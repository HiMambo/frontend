"use client";

import React, { useState } from "react";
import { type LucideIcon, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface BrandInputFormProps {
  formLabel?: string;
  formLabelClassName?: string;
  width?: string;
  contentHidden?: boolean;
  className?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  icon?: LucideIcon;
  placeholder?: string;
  error?: string;
  showErrorMessage?: boolean;
}

export const BrandInputForm: React.FC<BrandInputFormProps> = ({
  formLabel,
  formLabelClassName = "body-s text-tertiary",
  width = "w-full",
  contentHidden = false,
  className = "",
  value,
  onChange,
  onBlur,
  icon: Icon,
  placeholder,
  error,
  showErrorMessage = true,
}) => {
  const [showContent, setShowContent] = useState(!contentHidden);

  return (
    <div className={`flex flex-col gap-[var(--spacing-300)] ${width} ${className}`}>
      {/* Label */}
      {formLabel && <label className={formLabelClassName}>{formLabel}</label>}

      {/* Input wrapper */}
      <div className="relative">
        {/* Optional left icon */}
        {Icon && (
          <div className="absolute left-600 top-1/2 -translate-y-1/2 text-disabled">
            <Icon className="icon-size-s" />
          </div>
        )}

        <input
          type={showContent ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full bg-white body-m text-tertiary h-[var(--height-input)]",
            "px-[var(--spacing-600)] py-[var(--spacing-400)] rounded-300 focus:outline-none",
            Icon ? "pl-[calc(var(--spacing-600)*2+var(--spacing-250))]" : "",
            error ? "border border-[3px] border-destructive" : ""
          )}
          onBlur={onBlur}
        />

        {/* Toggle visibility if contentHidden */}
        {contentHidden && (
          <button
            type="button"
            onClick={() => setShowContent(!showContent)}
            className="absolute right-[var(--spacing-400)] top-1/2 -translate-y-1/2 text-disabled cursor-pointer"
          >
            {showContent ? (
              <Eye className="icon-size-s" />
            ) : (
              <EyeOff className="icon-size-s" />
            )}
          </button>
        )}
      </div>

      {/* Error message */}
      {error && showErrorMessage && <p className="body-s text-destructive">{error}</p>}
    </div>
  );
}
