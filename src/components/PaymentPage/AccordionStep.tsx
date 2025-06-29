"use client";

import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface AccordionStepProps {
  title: string;
  status: 'pending' | 'active' | 'completed';
  children: React.ReactNode;
}

export function AccordionStep({
  title,
  status,
  children,
}: AccordionStepProps) {
  const isActive = status === 'active';
  const isCompleted = status === 'completed';

  return (
    <div className="border rounded-md overflow-hidden">
      <div
        className={cn(
          'w-full text-left px-6 py-4 transition flex justify-between items-center',
          {
            'bg-muted': status === 'pending', 
            'bg-muted/80': isActive || isCompleted
          }
        )}
      >
        <span className='font-semibold'>
          {title}
        </span>

        {isCompleted && 
          <span className="text-green-600">
            <Check className="w-5 h-5" />
          </span>
        }
      </div>
      
      {isActive && (
        <div className="p-6 transition-all duration-500 ease-in-out">
          {children}
        </div>
      )}
    </div>
  );
}
