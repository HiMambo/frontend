"use client";
import { cn } from "@/lib/utils";
import * as React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline";
  size?: "L" | "M" | "S";
};

export default function BrandButton({
  className,
  variant = "solid",
  size = "L",
  ...props
}: Props) {
  const sizes =
    size === "L"
      ? "h-[58px] px-600 text-base font-semibold rounded-300"
      : size === "M"
      ? "h-800 px-500 text-sm font-semibold rounded-300"
      : "h-700 px-400 text-sm font-medium rounded-200";

  const variants =
    variant === "solid"
      ? "bg-yellow-500 text-white hover:bg-yellow-400 focus-visible:ring-2 focus-visible:ring-yellow-500/40"
      : "border border-yellow-500 text-terracotta-900 bg-transparent hover:bg-yellow-50 focus-visible:ring-2 focus-visible:ring-yellow-500/20";

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center transition-colors disabled:opacity-60 disabled:cursor-not-allowed",
        sizes,
        variants,
        className
      )}
      {...props}
    />
  );
}
