"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight, Sparkles } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BrandCheckbox } from "../brand/BrandCheckBox";
import { StepComponentProps } from "@/app/register-experience/[step]/page";
import { useOnboardingData } from "@/context/PartnerOnboardingContext";
import { submitSchema, SubmitFormData } from "@/lib/validation/onboarding";
import { ONBOARDING_STEP_DEFINITIONS, ONBOARDING_STEP_ICONS } from "@/lib/onboardingSteps"
import { useRouter } from "next/navigation";

export default function SubmitForm({ onComplete }: StepComponentProps) {
  const { formData } = useOnboardingData();
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<SubmitFormData>({
    resolver: zodResolver(submitSchema),
    defaultValues: {
      termsAccepted: false,
    },
  });

  // Get review sections (exclude current submit step)
  const reviewSections = ONBOARDING_STEP_DEFINITIONS.slice(0, 5).map((step, index) => ({
    ...step,
    icon: ONBOARDING_STEP_ICONS[index].completed,
  }));

  const handleReviewClick = (route: string) => {
    router.push(route);
  };

  const onSubmit = async (data: SubmitFormData) => {
    // Future: post complete registration to backend
    console.log("Submitting complete registration:", { ...formData, ...data });
    
    // Proceed to confirmation/success page
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-1200 py-800 gap-1200 flex flex-col">
      <header className="flex flex-col gap-600">
        <span className="flex flex-row gap-300 body-xxl-label text-secondary justify-center">
          <Sparkles className="icon-size-l"/>
          Submit your Experience
        </span>
        <span className="body-l text-primary">
          Please review your experience details carefully before submitting. Confirm that all
          information is accurate and complete.
        </span>
      </header>

      <main className="flex flex-col gap-600">
        {reviewSections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.step}
              type="button"
              onClick={() => handleReviewClick(section.route)}
              className="p-800 hover:shadow-elevation-1 rounded-600 transition-shadow cursor-pointer"
            >
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-600 items-center">
                  <Icon className="icon-size-l text-tertiary" />
                  <span className="body-xl-bold text-tertiary">{section.label}</span>
                </div>
                <ChevronRight className="icon-size-l text-disabled" />
              </div>
            </button>
          );
        })}
      </main>

      <Controller
        name="termsAccepted"
        control={control}
        render={({ field, fieldState }) => (
          <BrandCheckbox
            value={field.value}
            onChange={field.onChange}
            error={fieldState.error?.message}
          >
            I have read and agree to the HiMambo’s Partner Program {" "}
            <a href="#" className="underline hover:text-[var(--text-primary)] transition-colors">
              Terms & Conditions
            </a>{" "}
            .*
          </BrandCheckbox>
        )}
      />

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Finish Registration"}
      </Button>
    </form>
  );
}