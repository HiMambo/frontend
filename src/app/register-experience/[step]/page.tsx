"use client";

import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { ONBOARDING_STEP_DEFINITIONS, FLOW_COMPLETE_ROUTE } from "@/lib/onboardingSteps";
import { useSteps } from "@/context/StepContext";

export interface StepComponentProps {
  onComplete: () => void;
}

// Dynamically import all step components
const componentMap = {
  CreateAccountForm: dynamic<StepComponentProps>(
    () => import("@/components/PartnerOnboarding/FormComponents/CreateAccountForm")
  ),
  BusinessDetailsForm: dynamic<StepComponentProps>(
    () => import("@/components/PartnerOnboarding/FormComponents/BusinessDetailsForm")
  ),
  DocumentsForm: dynamic<StepComponentProps>(
    () => import("@/components/PartnerOnboarding/FormComponents/DocumentsForm")
  ),
  ExperienceInfoForm: dynamic<StepComponentProps>(
    () => import("@/components/PartnerOnboarding/FormComponents/ExperienceInfoForm")
  ),
  SustainabilityVerificationForm: dynamic<StepComponentProps>(
    () => import("@/components/PartnerOnboarding/FormComponents/SustainabilityVerificationForm")
  ),
  SubmitForm: dynamic<StepComponentProps>(
    () => import("@/components/PartnerOnboarding/FormComponents/SubmitForm")
  ),
  StatusForm: dynamic(
    () => import("@/components/PartnerOnboarding/FormComponents/StatusForm")
  ),
} as const;

export default function StepPage() {
  const { step } = useParams();
  const { markStepComplete, routeToStep } = useSteps();

  // Handle flow complete page
  if (`/register-experience/${step}` === FLOW_COMPLETE_ROUTE) {
    const StatusComponent = componentMap.StatusForm;
    return <StatusComponent/>;
  }

  // Find the step definition by matching the current route slug
  const stepDefinition = ONBOARDING_STEP_DEFINITIONS.find(
    (def) => (def.route === `/register-experience/${step}`)
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
    markStepComplete(stepDefinition.step);
    // Navigate to next step (Future: delegate to context)
    const nextStep = stepDefinition.step + 1;
    const nextDef = ONBOARDING_STEP_DEFINITIONS.find((d) => d.step === nextStep);
    if (nextDef) {
      routeToStep(nextStep);
    } else {
      // Flow is complete - context will auto-advance to flowCompleteSentinel
      // and useRouteValidation will redirect to FLOW_COMPLETE_ROUTE
      console.log("Last step completed - flow finishing");
    }
  };

  return <StepComponent onComplete={handleComplete} />;
}