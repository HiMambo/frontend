"use client";

import { BadgeCheckIcon } from "lucide-react";
import { Button } from "../../ui/button";

export default function StatusForm() {
  return (
    <main className="flex flex-col px-2400 py-800 gap-600">
      <header className="flex flex-row gap-300 justify-center">
        <BadgeCheckIcon className="icon-size-l text-[var(--surface-accent-2)]"/>
        <span className="body-xxl-label text-secondary">
            Registration Successful!
        </span>
      </header>

      <p className="body-l text-primary">
        Congratulations! You are now an official HiMambo partner. 
      </p>
      
      <Button
        size={"custom"}
        className="w-full px-600 py-400"
      >
        Continue to Dashboard
      </Button>
    </main>
  );
}
