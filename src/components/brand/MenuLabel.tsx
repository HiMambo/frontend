"use client";
import { cn } from "@/lib/utils";
import * as React from "react";

export default function MenuLabel({
  className,
  ...props
}: React.ComponentProps<"a">) {
  return (
    <a
      className={cn(
        "text-terracotta-900 text-base font-medium underline underline-offset-4 decoration-2",
        "hover:text-terracotta-800 decoration-yellow-500",
        className
      )}
      {...props}
    />
  );
}
