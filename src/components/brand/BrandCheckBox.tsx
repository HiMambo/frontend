"use client";

import React from "react";
import { CheckedIcon, NotCheckedIcon } from "../shared/IconComponents";

interface CheckboxProps {
  value: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const BrandCheckbox: React.FC<CheckboxProps> = ({
  value,
  onChange,
  children,
  className = "",
  disabled = false,
}) => {
  const handleToggle = () => {
    if (!disabled) onChange(!value);
  };

  return (
    <div
      className={`flex items-center gap-200 ${className} ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      }`}
    >
      <div
        className="icon-size-s text-primary flex-shrink-0 cursor-pointer"
        onClick={handleToggle}
        role="checkbox"
        aria-checked={value}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") handleToggle();
        }}
      >
        {value ? (
          <CheckedIcon className="w-full h-full" />
        ) : (
          <NotCheckedIcon className="w-full h-full" />
        )}
      </div>

      <label className="body-m text-tertiary">
        {children}
      </label>
    </div>
  );
};
