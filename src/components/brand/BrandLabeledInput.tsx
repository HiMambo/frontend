"use client";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Mail } from "lucide-react";
import * as React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  icon?: React.ReactNode;
};

export default function BrandLabeledInput({
  label,
  icon = <Mail className="w-4 h-4 text-yellow-600" />,
  className,
  ...props
}: Props) {
  const id = React.useId();
  return (
    <div className="space-y-150">
      {label && (
        <Label htmlFor={id} className="text-sm text-neutral-800">
          {label}
        </Label>
      )}
      <div className="relative">
        <span className="absolute left-300 top-1/2 -translate-y-1/2">
          {icon}
        </span>
        <input
          id={id}
          className={cn(
            "w-full bg-white border border-neutral-200 rounded-300",
            "h-[58px] pl-900 pr-400 text-sm placeholder:text-neutral-400",
            "focus:outline-none focus:ring-2 focus:ring-yellow-500/30",
            className
          )}
          {...props}
        />
      </div>
    </div>
  );
}
