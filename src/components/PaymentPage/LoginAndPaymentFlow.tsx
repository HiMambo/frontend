'use client'

import { AccordionStep } from './AccordionStep';
import { AuthForm } from './AuthForm';
import { PaymentForm } from './PaymentForm';
import GuestForm from './GuestForm';
import { SlotSelector } from './SlotSelector';
import { StepWrapper } from './StepWrapper';
import { useBooking } from '@/context/Cart';
import { useBookingSteps, STEP_DEFINITIONS } from '@/context/BookingStepsContext';

// Component map to dynamically render the correct form
const componentMap: Record<string, React.ComponentType> = {
  AuthForm,
  GuestForm,
  SlotSelector,
  PaymentForm,
};

export default function LoginAndPaymentFlow() {
  const { bookingState } = useBooking();
  const { getStepStatus, currentStep } = useBookingSteps();

  return (
    <div className="mx-auto space-y-4 max-w-xl min-h-[500px] transition-all duration-500">
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
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-medium text-green-800">Booking Confirmed!</h3>
          <p className="text-green-700">Thank you for your booking.</p>
        </div>
      )}
    </div>
  );
}