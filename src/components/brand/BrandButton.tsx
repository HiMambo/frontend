"use client";
import { cn } from "@/lib/utils";
import * as React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline";
  size?: "L" | "M" | "S";
  selected?: boolean;
  color?: "amber" | "blue" | "green" | "red"; 
};

export default function BrandButton({
  className,
  variant = "solid",
  size = "L",
  selected = false,
  color = "amber",
  ...props
}: Props) {
  const sizes =
    size === "L"
      ? "h-[58px] px-6 text-base font-semibold rounded-xl"
      : size === "M"
      ? "h-10 px-5 text-sm font-semibold rounded-full"
      : "h-8 px-4 text-sm font-medium rounded-md";

  const colorMap = {
    amber: {
      bg: "bg-amber-400",
      hover: "hover:bg-amber-400/90",
      border: "border-amber-400",
      ring: "focus-visible:ring-amber-500/40",
    },
    blue: {
      bg: "bg-blue-500",
      hover: "hover:bg-blue-500/90",
      border: "border-blue-500",
      ring: "focus-visible:ring-blue-500/40",
    },
    green: {
      bg: "bg-green-500",
      hover: "hover:bg-green-500/90",
      border: "border-green-500",
      ring: "focus-visible:ring-green-500/40",
    },
    red: {
      bg: "bg-red-500",
      hover: "hover:bg-red-500/90",
      border: "border-red-500",
      ring: "focus-visible:ring-red-500/40",
    },
  } as const;

  const c = colorMap[color];

  const variants =
    variant === "solid"
      ? selected
        ? 
          `${c.bg} text-white border ${c.border}`
        : 
          "bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50"
      : variant === "outline"
      ? selected
        ?
          `${c.bg} text-white border ${c.border}`
        :
          "border border-[#D6D1C4] text-[#B6B0A3] bg-transparent hover:bg-[#f9f9f8]"
      : "";

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center transition-colors disabled:opacity-60 disabled:cursor-not-allowed",
        sizes,
        variants,
        color,
        className
      )}
      {...props}
    />
  );
}
