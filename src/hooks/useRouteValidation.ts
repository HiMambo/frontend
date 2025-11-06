"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { flowCompleteSentinel, useSteps } from "@/context/StepContext";
import { FLOW_COMPLETE_ROUTE } from "@/lib/onboardingSteps";

export function useRouteValidation() {
  const pathname = usePathname();
  const router = useRouter();
  const { 
    steps, 
    currentStep, 
    getStepStatus, 
    goToStep, 
    getStepDefinition,
    allStepsComplete
  } = useSteps();

  useEffect(() => {
    // Case 1: Flow is complete - redirect to status page
    if (currentStep === flowCompleteSentinel) {
      if (pathname !== FLOW_COMPLETE_ROUTE) {
        console.log("Flow complete - redirecting to status page");
        router.replace(FLOW_COMPLETE_ROUTE);
      }
      return;
    }

    // Case 2: User trying to access status page but flow isn't complete
    if (pathname === FLOW_COMPLETE_ROUTE && !allStepsComplete) {
      console.warn("Status page accessed but flow incomplete - redirecting to first open step");
      const firstOpenStep = steps.find(
        s => ["open", "active"].includes(getStepStatus(s.step))
      );
      if (firstOpenStep) {
        router.replace(firstOpenStep.route);
      }
      return;
    }

    // Case 3: Status page is correctly loaded
    if (pathname === FLOW_COMPLETE_ROUTE && allStepsComplete) {
      return;
    }

    const currentStepDef = getStepDefinition(currentStep);
    
    // Case 4: Route matches context, nothing to do
    if (currentStepDef?.route === pathname) return;

    // Case 5: Handle normal step navigation
    const requestedStepDef = steps.find(step => step.route === pathname);

    const redirectToFirstOpen = () => {
      const firstOpenStep = steps.find(
        s => ["open", "active"].includes(getStepStatus(s.step))
      );
      if (firstOpenStep) {
        router.replace(firstOpenStep.route);
      }
    };

    // Invalid route - redirect
    if (!requestedStepDef) {
      console.warn("Invalid route — redirecting to first open step");
      redirectToFirstOpen();
      return;
    }

    const status = getStepStatus(requestedStepDef.step);

    // Pending step - redirect
    if (status === "pending") {
      console.warn("Pending step requested — redirecting to first open step");
      redirectToFirstOpen();
      return;
    }

    // Valid and allowed - update current step if different
    if (requestedStepDef.step !== currentStep) {
      goToStep(requestedStepDef.step);
    }
  }, [pathname, steps, getStepStatus, goToStep, getStepDefinition, router, currentStep, allStepsComplete]);
}