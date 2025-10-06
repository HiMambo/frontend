"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { OctagonHelp } from "@/components/shared/IconComponents";

export const FAQ: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const faqs = [
    {
      question: "What is included in my booking?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum."
    },
    {
      question: "Can I cancel or reschedule?",
      answer:
        "Cras ultricies ligula sed magna dictum porta. Donec rutrum congue leo eget malesuada."
    },
    {
      question: "Do I need to bring anything?",
      answer:
        "Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem."
    }
  ];

  return (
    <section className="flex flex-col">
      {/* Header Row */}
      <div
        className="flex justify-between items-center gap-[var(--spacing-200)] p-[var(--spacing-800)] pl-[var(--spacing-1600)] text-tertiary body-xxl-label cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="flex items-center gap-[var(--spacing-200)]">
          <OctagonHelp className="icon-size-l text-disabled" />
          Your questions answered
        </div>
        {isOpen ? (
          <ChevronUp className="text-disabled icon-size-l" />
        ) : (
          <ChevronDown className="text-disabled icon-size-l" />
        )}
      </div>

      {/* Expandable Content */}
      {isOpen && (
        <div className="flex flex-col gap-[var(--spacing-600)] px-[var(--spacing-1600)] pb-[var(--spacing-800)] text-primary body-l">
          {faqs.map((faq, index) => (
            <div key={index} className="flex flex-col gap-[var(--spacing-200)]">
              <span className="body-xl-label text-tertiary">{faq.question}</span>
              <span className="body-l text-disabled">{faq.answer}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
