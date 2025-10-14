"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputFormProps {
  formLabel: string;
  formLabelClassName?: string;
  width?: string;
  contentHidden?: boolean;
  className?: string;
}

export const InputForm: React.FC<InputFormProps> = ({
  formLabel,
  formLabelClassName = "body-s text-disabled",
  width = "w-full max-w-[var(--width-authforms)]",
  contentHidden = false,
  className = "",
}) => {
  const [showContent, setShowContent] = useState(!contentHidden);

  return (
    <div className={`flex flex-col gap-[var(--spacing-300)] ${width} ${className}`}>
      {/* Label */}
      <label className={formLabelClassName}>{formLabel}</label>

      {/* Input wrapper */}
      <div className="relative">
        <input
          type={showContent ? "text" : "password"}
          className={`w-full bg-white body-m text-tertiary h-[var(--height-input)] px-[var(--spacing-600)] py-[var(--spacing-400)] rounded-300 focus:outline-none`}
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
    </div>
  );
};
