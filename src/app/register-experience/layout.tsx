"use client";

import { StepProvider } from "@/context/StepContext";
import { ONBOARDING_STEP_DEFINITIONS } from "@/lib/onboardingSteps";
import { useOnboardingProgress } from "@/hooks/useOnboardingProgress";
import { PartnerOnboardingFlow } from "@/components/PartnerOnboarding/PartnerOnboardingFlow";
import ErrorMessage from "@/components/shared/ErrorMessage";

export default function PartnerOnboardingLayout({ children }: { children: React.ReactNode }) {
  const {error, loading, initialCompletedSteps } = useOnboardingProgress();

  if (error) {
    return (
      <ErrorMessage message={error}/>
    );
  } else if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--neutral-100)]">
        <div className="flex flex-col items-center gap-400">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <span className="body-l text-secondary">Loading your progress...</span>
        </div>
      </div>
    );
  } else {
      return (
        <StepProvider 
          stepDefinitions={ONBOARDING_STEP_DEFINITIONS}
          initialCompletedSteps={new Set(initialCompletedSteps)}
        >
          <PartnerOnboardingFlow>{children}</PartnerOnboardingFlow>
        </StepProvider>
      );
    };
  };