"use client"

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { OctagonHelp } from "./IconComponents";

// Type definitions
type SimpleFAQ = {
  question: string;
  answer: string | React.ReactNode;
};

type IconFAQ = {
  icon: React.ReactNode;
  question: string;
  answer: string | React.ReactNode;
};

type FAQItem = SimpleFAQ | IconFAQ;

interface FAQProps {
  faqs: FAQItem[];
  title?: string;
  defaultOpen?: boolean;
  questionClassName?: string;
  answerClassName?: string;
}

// Type guard to check if FAQ has an icon
const hasIcon = (faq: FAQItem): faq is IconFAQ => {
  return 'icon' in faq;
};

export const FAQ: React.FC<FAQProps> = ({ 
  faqs, 
  title = "Your questions answered",
  defaultOpen = false,
  questionClassName = "body-xl-label text-tertiary",
  answerClassName = "body-l text-disabled"
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section className="flex flex-col">
      {/* Header Row */}
      <div
        className="flex justify-between items-center gap-[var(--spacing-200)] p-[var(--spacing-800)] pl-[var(--spacing-1600)] text-tertiary body-xxl-label cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="flex items-center gap-[var(--spacing-200)]">
          <OctagonHelp className="icon-size-l text-disabled" />
          {title}
        </div>
        {isOpen ? (
          <ChevronUp className="text-disabled icon-size-l" />
        ) : (
          <ChevronDown className="text-disabled icon-size-l" />
        )}
      </div>

      {/* Expandable Content */}
      {isOpen && (
        <div className="flex flex-col gap-800 px-1600 pb-800 text-primary body-l">
          {faqs.map((faq, index) => (
            <div key={index} className="flex flex-col gap-600">
              {/* Question with optional icon */}
              <div className="flex items-center gap-250">
                {hasIcon(faq) && (
                  <span className="icon-size-l text-disabled flex-shrink-0 [&>svg]:w-full [&>svg]:h-full">
                    {faq.icon}
                  </span>
                )}
                <span className={questionClassName}>{faq.question}</span>
              </div>
              
              {/* Answer - can be string or React component */}
              <div className={answerClassName}>
                {typeof faq.answer === 'string' ? (
                  <span>{faq.answer}</span>
                ) : (
                  faq.answer
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};