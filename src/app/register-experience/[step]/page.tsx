"use client";

import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { ONBOARDING_STEP_DEFINITIONS } from "@/lib/onboardingSteps";
import { useSteps } from "@/context/StepContext";

export interface StepComponentProps {
  onComplete: () => void;
}

// Dynamically import all step components
const componentMap = {
  CreateAccountForm: dynamic<StepComponentProps>(
    () => import("@/components/PartnerOnboarding/CreateAccountForm")
  ),
  BusinessDetailsForm: dynamic<StepComponentProps>(
    () => import("@/components/PartnerOnboarding/BusinessDetailsForm")
  ),
  DocumentsForm: dynamic<StepComponentProps>(
    () => import("@/components/PartnerOnboarding/DocumentsForm")
  ),
  ExperienceInfoForm: dynamic<StepComponentProps>(
    () => import("@/components/PartnerOnboarding/ExperienceInfoForm")
  ),
  SustainabilityVerificationForm: dynamic<StepComponentProps>(
    () => import("@/components/PartnerOnboarding/SustainabilityVerificationForm")
  ),
  RegistrationSuccess: dynamic<StepComponentProps>(
    () => import("@/components/PartnerOnboarding/RegistrationSuccess")
  ),
} as const;

export default function StepPage() {
  const { step } = useParams();
  const { markStepComplete, routeToStep } = useSteps();

  // Find the step definition by matching the current route slug
  const stepDefinition = ONBOARDING_STEP_DEFINITIONS.find(
    (def) => def.route.endsWith(`/${step}`)
  );

  if (!stepDefinition) {
    // This should never happen because useRouteValidation already guards it
    return (
      <div className="text-center text-destructive">
        Invalid step: {step}
      </div>
    );
  }

  const StepComponent = componentMap[stepDefinition.component as keyof typeof componentMap];
  if (!StepComponent) {
    console.error(`No component found for step ${stepDefinition.component}`);
    return <div>Component not found for this step.</div>;
  }

  const handleComplete = () => {
    console.log("Step completed:", stepDefinition.step);
    markStepComplete(stepDefinition.step);

    // Navigate to next step (Future: delegate to context)
    const nextStep = stepDefinition.step + 1;
    const nextDef = ONBOARDING_STEP_DEFINITIONS.find((d) => d.step === nextStep);
    
    if (nextDef) {
      routeToStep(nextStep);
    } else {
      //Route to success
      console.log("Onboarding complete!");
    }
  };

  return <StepComponent onComplete={handleComplete} />;
}