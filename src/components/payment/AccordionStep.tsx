'use client';

import { cn } from '@/lib/utils';

interface AccordionStepProps {
  show: boolean;
  onClick?: () => void;
  title: string;
  completed?: boolean;
  children: React.ReactNode;
}

export function AccordionStep({
  show,
  onClick,
  title,
  completed = false,
  children,
}: AccordionStepProps) {
  return (
    <div className="border rounded-md overflow-hidden">
      <button
        onClick={onClick}
        className={cn(
          'w-full text-left px-6 py-4 bg-muted hover:bg-muted/80 transition flex justify-between items-center',
          { 'cursor-pointer': !!onClick }
        )}
      >
        <span className="font-semibold">{title}</span>
        {completed && <span className="text-xs text-muted-foreground">✓ Completed</span>}
      </button>

      {show && <div className="p-6">{children}</div>}
    </div>
  );
}
