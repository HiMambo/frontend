/*
Future considerations:
-Add a dependencies field to StepDefinition to specify which steps must be completed before a step becomes open.
-Make validation step-specific by storing isValid and validationError per step in the StepState.
*/
"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useMemo } from 'react';

const flowCompleteSentinel = -1;
// Generic types
export type StepNumber = number;
export type StepStatus = 'completed' | 'active' | 'open' | 'revisited' | 'pending';

export interface StepDefinition {
  step: StepNumber;
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
  currentStep: StepNumber;
  completedSteps: Set<StepNumber>;
  isValid: boolean;
  validationError: string | null;
}

interface StepContextType {
  currentStep: StepNumber;
  completedSteps: Set<StepNumber>;
  isValid: boolean;
  validationError: string | null;

  steps: readonly StepDefinition[];
  flowCompleteSentinel: StepNumber
  getStepDefinition: (step: StepNumber) => StepDefinition | undefined;

  canGoToStep: (step: StepNumber) => boolean;
  goToStep: (step: StepNumber) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  markStepComplete: (step: StepNumber) => void;
  getStepStatus: (stepNumber: StepNumber) => StepStatus;
  setIsValid: (isValid: boolean) => void;
  setValidationError: (error: string | null) => void;

  resetSteps: () => void;
}

const StepContext = createContext<StepContextType | undefined>(undefined);

interface StepProviderProps {
  children: ReactNode;
  stepDefinitions: readonly StepDefinition[];
}

export function StepProvider({ 
  children, 
  stepDefinitions,
}: StepProviderProps) {
  const initialStep = stepDefinitions[0].step;

  const [stepState, setStepState] = useState<StepState>({
    currentStep: initialStep,
    completedSteps: new Set(),
    isValid: true,
    validationError: null,
  });

  const getStepDefinition = useCallback((step: StepNumber) => {
    return stepDefinitions.find(def => def.step === step);
  }, [stepDefinitions]);

  const getNextAvailableStep = useCallback((): StepNumber => {
    // Find the first step that isn't completed
    for (const stepDef of stepDefinitions) {
      if (!stepState.completedSteps.has(stepDef.step)) {
        return stepDef.step;
      }
    }
    // If all steps are completed, return the flow finished sentinel
    return flowCompleteSentinel;
  }, [stepState.completedSteps, stepDefinitions]);

  const getStepStatus = useCallback((stepNumber: StepNumber): StepStatus => {
    const isCompleted = stepState.completedSteps.has(stepNumber);
    const isActive = stepState.currentStep === stepNumber;
    const isFlowFinished = stepState.currentStep === flowCompleteSentinel;

    // If flow is finished, all defined steps are completed
    if (isFlowFinished && stepNumber !== flowCompleteSentinel) return 'completed';
    
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

  const canGoToStep = useCallback((step: StepNumber) => {
    // Block step navigation when flow is finished
    if (stepState.currentStep === flowCompleteSentinel) return false;

    // Block navigating back to login step
    if (step === 1) return false;

    // Allow navigation to open or completed steps
    const status = getStepStatus(step);
    return status === 'completed' || status === 'open';
  }, [getStepStatus, stepState.currentStep]);

  const goToStep = useCallback((step: StepNumber) => {
    setStepState(prev => {
      if (canGoToStep(step)) {
        return { ...prev, currentStep: step };
      }
      return prev;
    });
  }, [canGoToStep]);

  const goToNextStep = useCallback(() => {
    setStepState(prev => {
      const currentIndex = stepDefinitions.findIndex(def => def.step === prev.currentStep);
      
      // Check if current step is actually completed before advancing
      const isCurrentStepCompleted = prev.completedSteps.has(prev.currentStep);
      if (!isCurrentStepCompleted) {
        console.warn("Attempting to advance from incomplete step:", prev.currentStep);
        return prev;
      }

      const nextStep = stepDefinitions[currentIndex + 1]?.step ?? flowCompleteSentinel; // Sentinel value when no next step exists
      console.log("Advanced from step:", prev.currentStep, "to step:", nextStep);
      return { ...prev, currentStep: nextStep };
    });
  }, [stepDefinitions]);

  const goToPreviousStep = useCallback(() => {
    setStepState(prev => {
      if (prev.currentStep === flowCompleteSentinel) {
        const lastStep = stepDefinitions[stepDefinitions.length - 1].step;
        return { ...prev, currentStep: lastStep };
      }
      const prevStep = Math.max(prev.currentStep - 1, stepDefinitions[0].step) as StepNumber;
      console.log("Went back from step:", prev.currentStep, "to step:", prevStep);
      return { ...prev, currentStep: prevStep };
    });
  }, [stepDefinitions]);

  const markStepComplete = useCallback((step: StepNumber) => {
    if (step === flowCompleteSentinel) return; // Don't mark sentinel step as completed

    const stepExists = stepDefinitions.some(def => def.step === step); // Don't mark invalid step as complete
    if (!stepExists) {
      console.error(`Attempted to complete invalid step: ${step}`);
      return;
    }

    setStepState(prev => {
      const newCompleted = new Set(prev.completedSteps);
      newCompleted.add(step);
      console.log(`Step: ${step} completed`);
      return { ...prev, completedSteps: newCompleted };
    });
  }, [stepDefinitions]);

  const setIsValid = useCallback((isValid: boolean) => {
    setStepState(prev => ({ ...prev, isValid }));
  }, []);

  const setValidationError = useCallback((error: string | null) => {
    setStepState(prev => ({ ...prev, validationError: error }));
  }, []);

  const resetSteps = useCallback(() => {
    setStepState({
      currentStep: initialStep,
      completedSteps: new Set(),
      isValid: true,
      validationError: null,
    });
    console.log("Steps reset to initial state");
  }, [initialStep]);

  const value: StepContextType = useMemo(() => ({
    currentStep: stepState.currentStep,
    completedSteps: stepState.completedSteps,
    isValid: stepState.isValid,
    validationError: stepState.validationError,

    steps: stepDefinitions,
    flowCompleteSentinel,
    getStepDefinition,

    canGoToStep,
    goToStep,
    goToNextStep,
    goToPreviousStep,
    markStepComplete,
    getStepStatus,
    setIsValid,
    setValidationError,

    resetSteps,
  }), [
    stepState,
    stepDefinitions,
    getStepDefinition,
    canGoToStep,
    goToStep,
    goToNextStep,
    goToPreviousStep,
    markStepComplete,
    getStepStatus,
    setIsValid,
    setValidationError,
    resetSteps,
  ]);

  return (
    <StepContext.Provider value={value}>
      {children}
    </StepContext.Provider>
  );
}

export const useSteps = () => {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error('useSteps must be used within a StepProvider');
  }
  return context;
};