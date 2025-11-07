"use client";

import { StepProvider } from "@/context/StepContext";
import { OnboardingProvider } from "@/context/PartnerOnboardingContext";
import { ONBOARDING_STEP_DEFINITIONS } from "@/lib/onboardingSteps";
import { useOnboardingProgress } from "@/hooks/useOnboardingProgress";
import { PartnerOnboardingFlow } from "@/components/PartnerOnboarding/PartnerOnboardingFlow";
import ErrorMessage from "@/components/shared/ErrorMessage";
import LoadingMessage from "@/components/shared/LoadingMessage";

export default function PartnerOnboardingLayout({ children }: { children: React.ReactNode }) {
  const { error, loading, initialCompletedSteps } = useOnboardingProgress();

  if (error) {
    return <ErrorMessage message={error} />;
  } else if (loading) {
    return <LoadingMessage message="Loading your progress..." />;
  } else {
    return (
      <OnboardingProvider>
        <StepProvider
          stepDefinitions={ONBOARDING_STEP_DEFINITIONS}
          initialCompletedSteps={new Set(initialCompletedSteps)}
        >
          <PartnerOnboardingFlow>{children}</PartnerOnboardingFlow>
        </StepProvider>
      </OnboardingProvider>
    );
  }
}