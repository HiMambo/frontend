"use client";

import { Button } from "@/components/ui/button";

export default function AuthButtons() {
  return (
    <div className="flex items-center gap-[var(--spacing-600)]">
      <Button variant="outline" onClick={() => {}}>
        Login
      </Button>
      <Button className="px-[var(--spacing-1200)]" onClick={() => {}}>
        Sign up
      </Button>
    </div>
  );
}