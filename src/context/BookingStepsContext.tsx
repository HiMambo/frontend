"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// Centralized step definitions
export const STEP_DEFINITIONS = [
  {
    step: 1,
    label: 'Login',
    title: 'Step 1: Log In',
    completedTitle: 'Logged In',
    component: 'AuthForm',
    showBackButton: false,
    showNextButton: false,
  },
  {
    step: 2,
    label: 'Guests',
    title: 'Step 2: Guest Details',
    completedTitle: 'Guest Details Confirmed',
    component: 'GuestForm',
    showBackButton: false,
    showNextButton: true,
    nextButtonText: 'Continue to Time Slot Selection',
  },
  {
    step: 3,
    label: 'Slots',
    title: 'Step 3: Select Time Slot',
    completedTitle: 'Time Slot Selected',
    component: 'SlotSelector',
    showBackButton: true,
    showNextButton: true,
    backButtonText: 'Back to Guest Details',
    nextButtonText: 'Continue to Payment Details',
  },
  {
    step: 4,
    label: 'Payment',
    title: 'Step 4: Payment',
    completedTitle: 'Payment Successful',
    component: 'PaymentForm',
    showBackButton: false,
    showNextButton: false,
  },
];

// Extract step numbers and append all steps complete sentinel value (-1)
export type BookingStep = typeof STEP_DEFINITIONS[number]['step'] | -1;
export type StepStatus = 'completed' | 'active' | 'open' | 'revisited' | 'pending';

export interface StepDefinition {
  step: BookingStep;
  label: string;
  title: string;
  completedTitle: string;
  component: string;
  showBackButton?: boolean;
  showNextButton?: boolean;
  backButtonText?: string;
  nextButtonText?: string;
}

interface StepState {
  currentStep: BookingStep;
  completedSteps: Set<BookingStep>;
  isValid: boolean;
  validationError: string | null;
}

interface BookingStepsContextType {
  currentStep: BookingStep;
  completedSteps: Set<BookingStep>;
  isValid: boolean;
  validationError: string | null;

  steps: readonly StepDefinition[];
  getStepDefinition: (step: BookingStep) => StepDefinition | undefined;

  canGoToStep: (step: BookingStep) => boolean;
  goToStep: (step: BookingStep) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  markStepComplete: (step: BookingStep) => void;
  getStepStatus: (stepNumber: BookingStep) => StepStatus;
  setIsValid: (isValid: boolean) => void;
  setValidationError: (error: string | null) => void;
}

const BookingStepsContext = createContext<BookingStepsContextType | undefined>(undefined);

export function BookingStepsProvider({ 
  children, 
  initialStep = STEP_DEFINITIONS[0].step,
}: { 
  children: ReactNode;
  initialStep?: BookingStep;
}) {
  const [stepState, setStepState] = useState<StepState>({
    currentStep: initialStep,
    completedSteps: new Set(),
    isValid: true,
    validationError: null,
  });

  const getStepDefinition = useCallback((step: BookingStep) => {
    return STEP_DEFINITIONS.find(def => def.step === step);
  }, []);

  const getNextAvailableStep = useCallback((): BookingStep => {
    // Find the first step that isn't completed
      for (const stepDef of STEP_DEFINITIONS) {
        if (!stepState.completedSteps.has(stepDef.step)) {
          return stepDef.step;
        }
      }
      // If all steps are completed, return the flow finished sentinel
      return -1;
  }, [stepState.completedSteps]);

  const getStepStatus = useCallback((stepNumber: BookingStep): StepStatus => {
    const isCompleted = stepState.completedSteps.has(stepNumber);
    const isActive = stepState.currentStep === stepNumber;
    const isFlowFinished = stepState.currentStep === -1;

    // If flow is finished, all defined steps are completed
    if (isFlowFinished && stepNumber !== -1) return 'completed';
    
    // If currently revisiting a completed step
    if (isCompleted && isActive) return 'revisited';

    // If this is the current active step
    if (isActive) return 'active';

    // If step is already completed
    if (isCompleted) return 'completed';

    // If this is the next available step (open for access)
    const nextAvailableStep = getNextAvailableStep();
    if (stepNumber === nextAvailableStep) return 'open';

    // Otherwise it's pending
    return 'pending';
  }, [stepState.currentStep, stepState.completedSteps, getNextAvailableStep]);

  const canGoToStep = useCallback((step: BookingStep) => {

    // Block step navigation when flow is finished
    if (stepState.currentStep === -1 ) return false;

    // Block navigating back to login step
    if (step === 1) return false;

    // Allow navigation to open or completed steps
    const status = getStepStatus(step);
    return status === 'completed' || status === 'open';
  }, [getStepStatus, stepState.currentStep]);

  const goToStep = useCallback((step: BookingStep) => {
    setStepState(prev => {
      // Allow going to first step or any step that's completed or open
      if (canGoToStep(step)) {
        return { ...prev, currentStep: step };
      }
      return prev;
    });
  }, [canGoToStep]);

  const goToNextStep = useCallback(() => {
    setStepState(prev => {
      const currentIndex = STEP_DEFINITIONS.findIndex(def => def.step === prev.currentStep);
      
      // Check if current step is actually completed before advancing
      const isCurrentStepCompleted = prev.completedSteps.has(prev.currentStep);
      if (!isCurrentStepCompleted) {
        console.warn("Attempting to advance from incomplete step:", prev.currentStep);
        return prev;
      }

      const nextStep = STEP_DEFINITIONS[currentIndex + 1]?.step ?? -1; // Sentinel value when no next step exists
      console.log("Advanced from step:", prev.currentStep, "to step:", nextStep);
      return { ...prev, currentStep: nextStep };
    });
  }, []);

  const goToPreviousStep = useCallback(() => {
    setStepState(prev => {
      if (prev.currentStep === -1) {
        const lastStep = STEP_DEFINITIONS[STEP_DEFINITIONS.length - 1].step;
        return { ...prev, currentStep: lastStep };
      }
      const prevStep = Math.max(prev.currentStep - 1, STEP_DEFINITIONS[0].step) as BookingStep;
      console.log("Went back from step:", prev.currentStep, "to step:", prevStep);
      return { ...prev, currentStep: prevStep };
    });
  }, []);

  const markStepComplete = useCallback((step: BookingStep) => {
    if (step === -1) return; // Don't mark sentinel step as completed
    setStepState(prev => {
      const newCompleted = new Set(prev.completedSteps);
      newCompleted.add(step);
      console.log(`Step: ${step} completed`);
      return { ...prev, completedSteps: newCompleted };
    });
  }, []);

  const setIsValid = useCallback((isValid: boolean) => {
    setStepState(prev => ({ ...prev, isValid }));
  }, []);

  const setValidationError = useCallback((error: string | null) => {
    setStepState(prev => ({ ...prev, validationError: error }));
  }, []);

  const value: BookingStepsContextType = {
    currentStep: stepState.currentStep,
    completedSteps: stepState.completedSteps,
    isValid: stepState.isValid,
    validationError: stepState.validationError,

    steps: STEP_DEFINITIONS,
    getStepDefinition,

    canGoToStep,
    goToStep,
    goToNextStep,
    goToPreviousStep,
    markStepComplete,
    getStepStatus,
    setIsValid,
    setValidationError,
  };

  return (
    <BookingStepsContext.Provider value={value}>
      {children}
    </BookingStepsContext.Provider>
  );
}

export const useBookingSteps = () => {
  const context = useContext(BookingStepsContext);
  if (!context) {
    throw new Error('useBookingSteps must be used within a BookingStepsProvider');
  }
  return context;
};
