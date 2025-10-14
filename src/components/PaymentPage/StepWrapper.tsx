"use client";
import React, { ReactNode, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useBooking } from '@/context/BookingContext';
import { useBookingSteps, type StepStatus } from '@/context/BookingStepsContext';
import { AlertCircle } from 'lucide-react';

interface StepWrapperProps {
  children: ReactNode;
  status: StepStatus;
  showBackButton?: boolean;
  showNextButton?: boolean;
  nextButtonText?: string;
  backButtonText?: string;
  onNext: () => void;
  onBack: () => void;
}

export const StepWrapper = ({
  children,
  status,
  showBackButton = true,
  showNextButton = true,
  nextButtonText = "Continue",
  backButtonText = "Back",
  onNext,
  onBack,
}: StepWrapperProps) => {
  const { bookingState } = useBooking();
  const { validationError, isValid } = useBookingSteps();
  const [hasAttemptedNext, setHasAttemptedNext] = useState(false);

  const handleNext = () => {
    if (!isValid) {
      setHasAttemptedNext(true);
      return;
    }
    setHasAttemptedNext(false);
    onNext();
  };

  const handleBack = () => {
    setHasAttemptedNext(false);
    onBack();
  };

  // Only render if step is active or revisited
  const isExpanded = status === 'active' || status === 'revisited';
  if (!isExpanded) {
    return null;
  }

  return (
    <div className="flex justify-center w-full">
      <div className="w-[var(--width-authscreen)]">
        {children}

        {/* Error message */}
        {hasAttemptedNext && validationError && (
          <div className="flex justify-center mt-[var(--spacing-600)]">
            <p className="text-red-500 text-sm flex items-center gap-3">
              <AlertCircle />
              {validationError}
            </p>
          </div>
        )}

        {/* Buttons */}
        {(showBackButton || showNextButton) && (
          <div className="flex flex-col gap-[var(--spacing-600)] items-center mt-[var(--spacing-800)]">
            {showNextButton && (
              <Button
                onClick={handleNext}
                className="w-[var(--width-authforms)]"
                disabled={bookingState.isBookingInProgress}
              >
                {nextButtonText}
              </Button>
            )}
            {showBackButton && (
              <Button
                onClick={handleBack}
                variant="outline"
                className="w-[var(--width-authforms)]"
                disabled={bookingState.isBookingInProgress}
              >
                {backButtonText}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};