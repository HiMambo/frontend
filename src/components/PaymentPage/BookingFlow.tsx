'use client'

import { useEffect } from 'react';
import { AccordionStep } from './TemporaryDisplayWrapper';
import { AuthForm } from './AuthForm';
import { PaymentForm } from './PaymentForm';
import { SlotSelector } from './SlotSelector';
import { StepWrapper } from './StepWrapper';
import { useBooking } from '@/context/BookingContext';
import { useBookingSteps, STEP_DEFINITIONS } from '@/context/BookingStepsContext';
import { Success } from './Success';

// Component map to dynamically render the correct form
const componentMap: Record<string, React.ComponentType> = {
  AuthForm,
  SlotSelector,
  PaymentForm,
};

export default function BookingFlow() {
  const { bookingState, cartExperience, setSelectedSlot } = useBooking();
  const { getStepStatus, currentStep, resetSteps } = useBookingSteps();

  // Reset booking flow when cart experience changes.
  useEffect(() => {
    if (!cartExperience) return;

    // Clear booking state and reset steps
    setSelectedSlot(null);
    resetSteps();
    
  }, [cartExperience, resetSteps, setSelectedSlot]);

  return (
    <div className="transition-all duration-500">
      {STEP_DEFINITIONS.map((steps) => {
        const StepComponent = componentMap[steps.component];

        return (
          <AccordionStep
            key={steps.step}
            title={steps.title}
            completedTitle={steps.completedTitle}
            status={getStepStatus(steps.step)}
          >
            <StepWrapper
              stepNumber={steps.step}
              showBackButton={steps.showBackButton}
              showNextButton={steps.showNextButton}
              backButtonText={steps.backButtonText}
              nextButtonText={steps.nextButtonText}
            >
              <StepComponent />
            </StepWrapper>
          </AccordionStep>
        );
      })}

      {/* Confirmation */}
      {currentStep === -1 && !bookingState.isBookingInProgress && (
        <Success/>
      )}
    </div>
  );
}