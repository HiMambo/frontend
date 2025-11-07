"use client";

import Header from "@/components/shared/Header/Header";
import Footer from "@/components/shared/Footer";
import ProgressBar from "@/components/shared/ProgressBar";
import { flowCompleteSentinel, useSteps } from "@/context/StepContext";
import { useRouteValidation } from "@/hooks/useRouteValidation";
import { ONBOARDING_STEP_ICONS } from "@/lib/onboardingSteps";
import { cn } from "@/lib/utils";
import LoadingMessage from "../shared/LoadingMessage";

interface PartnerOnboardingFlowProps {
  children: React.ReactNode;
}

export function PartnerOnboardingFlow({ children }: PartnerOnboardingFlowProps) {
  const { isValidating } = useRouteValidation(); // Validates route → updates context

  const { completedSteps, currentStep, getStepDefinition } = useSteps();
  const isFlowComplete = currentStep === flowCompleteSentinel;
  const isExperienceInfoStep =
    getStepDefinition(currentStep)?.component === "ExperienceInfoForm";

  // Show loading during validation
  if (isValidating) {
    return <LoadingMessage message="Loading your progress..." />;
  }

  // Flow complete
  if (isFlowComplete) {
    return (
      <>
        <Header variant="partner" />
        <main className="bg-[var(--neutral-100)] p-4000 flex flex-col gap-2400 items-center">
          <div className="w-[var(--onboarding-step-card-width)]">
            {children}
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Ongoing flow
  return (
    <>
      <Header variant="partner" />
      <main className="bg-[var(--neutral-100)] p-4000 flex flex-col gap-2400 items-center">
        {!completedSteps.has(1) && (
          <header className="self-start text-start flex flex-col gap-400">
            <span className="heading-h4 text-secondary">
              Create a HiMambo Partner Profile
            </span>
            <span className="heading-h5-light text-primary">
              We&apos;d love to welcome you into our growing network of HiMambo Partners.
            </span>
          </header>
        )}

        <ProgressBar icons={ONBOARDING_STEP_ICONS} />

        <div
          className={cn(
            "bg-[var(--surface)]/50 rounded-600 px-1200 py-800",
            isExperienceInfoStep
              ? "w-[var(--onboarding-experienceinfo-step-card-width)]"
              : "w-[var(--onboarding-step-card-width)]"
          )}
        >
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
