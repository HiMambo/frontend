'use client'
import { useEffect } from 'react';
import { AuthFlow } from '../AuthFlow/AuthFlow';
import { PaymentForm } from './PaymentForm';
import { SlotSelector } from './SlotSelector';
import { StepWrapper } from './StepWrapper';
import { useBooking } from '@/context/BookingContext';
import { useSteps } from '@/context/StepContext';
import { Success } from './Success';
import { AuthProvider } from '@/context/AuthContext';

export default function BookingFlow() {
  const { bookingState, cartExperience, setSelectedSlot } = useBooking();
  const { steps, flowCompleteSentinel, getStepStatus, currentStep, resetSteps, markStepComplete, goToNextStep, goToPreviousStep } = useSteps();

  const handleNext = (stepNumber: number) => {
    markStepComplete(stepNumber);
    goToNextStep();
  };

  const handleBack = () => {
    goToPreviousStep();
  };
  // Component map to dynamically render the correct form
  const componentMap: Record<string, React.ComponentType> = {
    AuthFlow,
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
    <AuthProvider
      onComplete={() => handleNext(1)}
      initialView="signup"
    >
      <div className="transition-all duration-500">
        {steps.map((steps) => {
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
              <StepComponent />
            </StepWrapper>
          );
        })}

        {/* Confirmation */}
        {currentStep === flowCompleteSentinel && !bookingState.isBookingInProgress && (
          <Success />
        )}
      </div>
    </AuthProvider>
  );
}