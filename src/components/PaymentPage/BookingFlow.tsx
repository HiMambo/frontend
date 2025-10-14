'use client'
import { useEffect } from 'react';
import { AuthFlow } from '../AuthFlow/AuthFlow';
import { PaymentForm } from './PaymentForm';
import { SlotSelector } from './SlotSelector';
import { StepWrapper } from './StepWrapper';
import { useBooking } from '@/context/BookingContext';
import { useBookingSteps, STEP_DEFINITIONS } from '@/context/BookingStepsContext';
import { Success } from './Success';

export default function BookingFlow() {
  const { bookingState, cartExperience, setSelectedSlot } = useBooking();
  const { getStepStatus, currentStep, resetSteps, markStepComplete, goToNextStep, goToPreviousStep } = useBookingSteps();

  const handleNext = (stepNumber: number) => {
    markStepComplete(stepNumber);
    goToNextStep();
  };

  const handleBack = () => {
    goToPreviousStep();
  };
  // Component map to dynamically render the correct form
  const componentMap: Record<string, React.ComponentType> = {
    SlotSelector,
    PaymentForm,
  };

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
          <StepWrapper
            key={steps.step}
            status={getStepStatus(steps.step)}
            showBackButton={steps.showBackButton}
            showNextButton={steps.showNextButton}
            backButtonText={steps.backButtonText}
            nextButtonText={steps.nextButtonText}
            onNext={() => handleNext(steps.step)}
            onBack={handleBack}     
          >
            {steps.component === "AuthFlow" ? (
              <AuthFlow onComplete={() => handleNext(steps.step)} />
            ) : (
              <StepComponent />
            )}
          </StepWrapper>
        );
      })}

      {/* Confirmation */}
      {currentStep === -1 && !bookingState.isBookingInProgress && (
        <Success />
      )}
    </div>
  );
}