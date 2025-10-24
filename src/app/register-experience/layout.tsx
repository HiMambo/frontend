"use client";

import ProgressBar from "@/components/shared/ProgressBar";
import Header from "@/components/shared/Header/Header";
import Footer from "@/components/shared/Footer";

//import { useEffect, useState } from "react";
import { StepProvider, useSteps } from "@/context/StepContext";
import { useRouteValidation } from "@/hooks/useRouteValidation";
import { ONBOARDING_STEP_DEFINITIONS, ONBOARDING_STEP_ICONS } from "@/lib/onboardingSteps";

export default function RegisterExperienceLayout({ children }: { children: React.ReactNode }) {
  return (
    <StepProvider 
      stepDefinitions={ONBOARDING_STEP_DEFINITIONS}
      //initialCompletedSteps={initialCompletedSteps}
    >
      <OnboardingCoordinator>{children}</OnboardingCoordinator>
    </StepProvider>
  );
}

function OnboardingCoordinator({ children }: { children: React.ReactNode }) {
  useRouteValidation();  // Validates route → updates context
  
  const { currentStep, completedSteps } = useSteps();

  return (
    <>
      <Header variant="partner"/>
      <main className="bg-[var(--neutral-100)] p-4000 flex flex-col gap-2400 items-center">

        {(currentStep === 1) && (!completedSteps.has(1)) &&
          <header className="self-start text-start flex flex-col gap-400">
            <span className="heading-h4 text-secondary">
              Create a HiMambo Partner Profile
            </span>
            <span className="heading-h5-light text-primary">
              We’d love to welcome you into our growing network of HiMambo Partners.
            </span>
          </header>
        }

          <ProgressBar icons={ONBOARDING_STEP_ICONS}/>

          {/* Card */}
          <div className="bg-[var(--surface)]/50 rounded-600 px-1200 py-800 w-[var(--onboarding-step-card-width)]">
            {children}
          </div>
      </main>
      <Footer />
    </>
  );
}
