"use client";

import { FileQuestion, MailIcon, RefreshCcw, ShieldCheck, UserX } from "lucide-react";
import { NextSteps, type NextStepItem } from "./NextSteps";

const rejectedNextSteps: NextStepItem[] = [
  {
    icon: ShieldCheck,
    label:
      "Revisit your descriptions and highlight the sustainability impacts more clearly.",
  },
  {
    icon: FileQuestion,
    label:
      "Provide additional proof through documents, certifications, or photos.",
  },
  {
    icon: RefreshCcw,
    label:
      "Adjust your experience to include more community participation and environmental care.",
  },
  {
    icon: MailIcon,
    label:
      "Contact our team for free advice. We’re happy to provide personalized guidance to help you shape an application that aligns with HiMambo’s values.",
  },
];

export function StatusRejected() {
  return (
    <main className="flex flex-col gap-800">
      <div className="flex flex-col px-1600 py-800 gap-600 bg-[var(--surface)]/50 rounded-600">
        <header className="flex flex-row gap-300 items-center justify-center">
          <UserX className="icon-size-l text-[var(--yellow-500)]"/>
          <span className="body-xxl-label text-secondary">
            Your application update from HiMambo
          </span>
        </header>
        <p className="body-l text-primary text-left">
          Thank you for applying to become a HiMambo Partner. 
          After careful review of your application and experiences, at this time your application does not meet HiMambo's Partner Program policies.
        </p>
        <p className="body-l text-tertiary text-left">
          We truly appreciate your commitment to tourism and your effort to join HiMambo. While it’s not the right fit right now, 
          our door is open if your business grows in a sustainable direction.         
        </p>
      </div>
      <NextSteps items={rejectedNextSteps}/>
    </main>
  );
}
