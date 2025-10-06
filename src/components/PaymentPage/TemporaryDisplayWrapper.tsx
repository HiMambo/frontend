'use client';
import { type StepStatus } from '@/context/BookingStepsContext';

interface AccordionStepProps {
  title: string;
  completedTitle: string;
  status: StepStatus;
  children: React.ReactNode;
}

export function AccordionStep({
  status,
  children,
}: AccordionStepProps) {
  // Determine which step is expanded
  const isExpanded = status === 'active' || status === 'revisited';

  if (!isExpanded) {
    return null;
  }

  return (
    <div>
      {children}
    </div>
  );
}