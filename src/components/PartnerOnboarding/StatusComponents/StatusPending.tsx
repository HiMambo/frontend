"use client";

import { CheckCheck, Clock, Info, ShieldCheck, Timer } from "lucide-react";
import { type NextStepItem, NextSteps } from "./NextSteps";

const pendingNextSteps: NextStepItem[] = [
  {
    icon: ShieldCheck,
    label:
      "Our team will verify your submitted documents and business details to ensure eligibility.",
  },
  {
    icon: Timer,
    label: "This review process usually takes between 3 to 5 business days.",
  },
  {
    icon: Info,
    label:
      "If additional information is needed, we will contact you via the provided contact details.",
  },
  {
    icon: CheckCheck,
    label:
      "Once your application is approved, you will receive a confirmation email with next steps to fully activate your partnership and publish your experiences.",
  },
];

export function StatusPending() {
  return (
    <main className="flex flex-col gap-800">
      <div className="flex flex-col px-1600 py-800 gap-600 bg-[var(--surface)]/50 rounded-600">
        <header className="flex flex-row gap-300 justify-center">
          <Clock className="icon-size-l text-[var(--yellow-500)]"/>
          <span className="body-xxl-label text-secondary">
            Application Under Review!
          </span>
        </header>
        <p className="body-l text-primary text-left">
          Thank you for submitting your application for the HiMambo Partner Program. 
          We have received your information and will review your application shortly.        
        </p>
        <p className="body-l text-primary text-left">
          You will be contacted if further details are needed or once your partnership is approved.     
        </p>
      </div>
      <NextSteps items={pendingNextSteps}/>
    </main>
  );
}
