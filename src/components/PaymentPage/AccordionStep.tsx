'use client';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  // Determine which step is expanded
  const isExpanded = status === 'active' || status === 'revisited';
  
  // Determine which steps should show the check icon
  const showCheckIcon = status === 'completed' || status === 'revisited';
  
  // Determine which title to show
  const displayTitle = showCheckIcon ? completedTitle : title;

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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border rounded-md overflow-hidden"
    >
      <motion.div
        className={cn(
          'w-full text-left px-6 py-4 flex justify-between items-center',
          getHeaderStyles(status)
        )}
        layout
        transition={{ duration: 0.3 }}
      >
        <span className="font-semibold">
          {displayTitle}
        </span>
        <AnimatePresence>
          {showCheckIcon && (
            <motion.span
              className="text-green-600"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <Check className="w-5 h-5" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { height: 'auto', opacity: 1 },
              collapsed: { height: 0, opacity: 0 },
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
