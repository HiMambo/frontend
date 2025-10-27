"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSteps } from "@/context/StepContext";

export function useRouteValidation() {
  const pathname = usePathname();
  const router = useRouter();
  const { 
    steps, 
    currentStep, 
    getStepStatus, 
    goToStep, 
    getStepDefinition 
  } = useSteps();

  useEffect(() => {
    const currentStepDef = getStepDefinition(currentStep);

    // Route matches context, nothing to do
    if (currentStepDef?.route === pathname) {
      return;
    }

    // Route doesn't match context - validate the requested route
    const requestedStepDef = steps.find(step => step.route === pathname);

    // Helper function to redirect to first open step
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
      console.log("Step requested is invalid. Redirecting to first open step");
      redirectToFirstOpen();
      return;
    }

    const status = getStepStatus(requestedStepDef.step);

    // Pending step - redirect
    if (status === "pending") {
      console.log("Step requested is not allowed. Redirecting to first open step");
      redirectToFirstOpen();
      return;
    }

    // Valid and allowed - update current step if different
    if (requestedStepDef.step !== currentStep) {
      console.log("Step requested is allowed. Going to step:", requestedStepDef.step);
      goToStep(requestedStepDef.step);
    }
  }, [pathname, steps, getStepStatus, goToStep, getStepDefinition, router]);
}