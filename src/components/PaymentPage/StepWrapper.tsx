"use client";

import React, { ReactNode, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useBooking } from '@/context/Cart';
import { type BookingStep, useBookingSteps } from '@/context/BookingStepsContext';
import CenteredCard from './CenteredCard';
import { AlertCircle } from 'lucide-react';

interface StepWrapperProps {
  children: ReactNode;
  stepNumber: BookingStep;
  showBackButton?: boolean;
  showNextButton?: boolean;
  nextButtonText?: string;
  backButtonText?: string;
}

export const StepWrapper = ({
  children,
  stepNumber,
  showBackButton = true,
  showNextButton = true,
  nextButtonText = "Continue",
  backButtonText = "Back",
}: StepWrapperProps) => {
  const { bookingState } = useBooking();
  const { markStepComplete, goToNextStep, goToPreviousStep, validationError, isValid } = useBookingSteps();

  const [hasAttemptedNext, setHasAttemptedNext] = useState(false);

  const handleNext = () => {
    setHasAttemptedNext(true);

    if (isValid) {
      markStepComplete(stepNumber);
      setHasAttemptedNext(false);
      goToNextStep();
    }
  };

  const handleBack = () => {
    setHasAttemptedNext(false);
    goToPreviousStep();
  };

  return (
    <div className="flex justify-center">
      <CenteredCard>
        <div>
          {children}
        </div>

        {hasAttemptedNext && validationError && (
          <p className="text-red-500 text-sm flex items-center gap-3">
            <AlertCircle />
            {validationError}
          </p>
        )}

        <div className="space-y-4">
          {showBackButton && (
            <Button
              onClick={handleBack}
              variant="outline"
              className="w-full"
              disabled={bookingState.isBookingInProgress}
            >
              {backButtonText}
            </Button>
          )}

          {showNextButton && (
            <Button
              onClick={handleNext}
              className="w-full"
              disabled={bookingState.isBookingInProgress}
            >
              {nextButtonText}
            </Button>
          )}
        </div>
      </CenteredCard>
    </div>
  );
};
