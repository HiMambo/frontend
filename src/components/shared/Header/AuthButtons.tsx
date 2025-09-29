"use client";

import { Button } from "@/components/ui/button";

export default function AuthButtons() {
  return (
    <div className="flex items-center gap-[var(--spacing-600)]">
      <Button 
        variant="outline" 
        size="custom" 
        className="px-[var(--spacing-400)] py-[var(--spacing-300)]"
        onClick={() => {}}
      >
        Login
      </Button>
      <Button 
        className="px-[var(--spacing-1200)] py-[var(--spacing-300)]" 
        size="custom"
        onClick={() => {}}
      >
        Sign up
      </Button>
    </div>
  );
}