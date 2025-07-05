'use client';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { type StepStatus } from '@/context/BookingStepsContext';

interface AccordionStepProps {
  title: string;
  completedTitle: string;
  status: StepStatus;
  children: React.ReactNode;
}

export function AccordionStep({
  title,
  completedTitle,
  status,
  children,
}: AccordionStepProps) {
  // Determine which steps should show their content (expanded)
  const isExpanded = status === 'active' || status === 'revisited';
  
  // Determine which steps should show the check icon
  const showCheckIcon = status === 'completed' || status === 'revisited';
  
  // Determine which title to show
  const displayTitle = showCheckIcon ? completedTitle : title;

  // Get the appropriate styling for each status
  const getHeaderStyles = (status: StepStatus): string => {
    switch (status) {
      case 'completed':
        return 'bg-muted/80 text-foreground';
      case 'active':
        return 'bg-muted/80 text-foreground';
      case 'revisited':
        return 'bg-muted/80 text-foreground';
      case 'open':
        return 'bg-muted/60 text-foreground border-l-4 border-l-primary';
      case 'pending':
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <div
        className={cn(
          'w-full text-left px-6 py-4 transition flex justify-between items-center',
          getHeaderStyles(status)
        )}
      >
        <span className="font-semibold">
          {displayTitle}
        </span>
        {showCheckIcon && (
          <span className="text-green-600">
            <Check className="w-5 h-5" />
          </span>
        )}
      </div>
      {isExpanded && (
        <div className="p-6 transition-all duration-500 ease-in-out">
          {children}
        </div>
      )}
    </div>
  );
}