"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BrandDropdownMenu } from "../brand/BrandDropdownMenu";
import { BrandUploadForm } from "../brand/BrandUploadForm";
import { StepComponentProps } from "@/app/register-experience/[step]/page";
import { useOnboardingData, defaultDocumentsData } from "@/context/PartnerOnboardingContext";
import { documentsSchema, DocumentsFormData } from "@/lib/validation/onboarding";
import { useEffect } from "react";

const DOC_TYPES = [
  "Tax ID / VAT Number",
  "Tourism License",
  "Utility Bill or Invoice",
  "Business Registration",
  "Insurance Certificate",
];

export default function DocumentsForm({ onComplete }: StepComponentProps) {
  const { formData, updateStep3 } = useOnboardingData();

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<DocumentsFormData>({
    resolver: zodResolver(documentsSchema),
    mode: "onBlur",
    defaultValues: formData.step3 || defaultDocumentsData,
  });

  // Rehydrate when returning to this step
  useEffect(() => {
    if (formData.step3) reset(formData.step3);
  }, [formData.step3, reset]);

  const onSubmit = async (data: DocumentsFormData) => {
    // Save to context
    updateStep3(data);
    // Future: post to backend
    console.log("Submitting form:", data);
    // Proceed to next step
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-600">
      <header className="flex flex-col gap-300 text-primary pr-6000">
        <span className="body-xxl-label">Business Legal Documents</span>
        <span className="body-l">
          These documents help us verify your business legitimacy to ensure eligibility
          for the HiMambo Partner Program.
        </span>
      </header>

      <div className="grid grid-cols-2 gap-600">
        {/* Upload documents */}
        <Controller
          name="files"
          control={control}
          render={({ field, fieldState }) => (
            <BrandUploadForm
              {...field}
              label="Upload documents (max 1 MB)"
              labelClassName="body-s text-tertiary"
              error={fieldState.error?.message}
            />
          )}
        />

        {/* Document types */}
        <Controller
          name="selectedTypes"
          control={control}
          render={({ field, fieldState }) => (
            <BrandDropdownMenu
              {...field}
              items={DOC_TYPES}
              formLabel="Choose one or more from the dropdown menu *"
              multiSelect
              error={fieldState.error?.message}
            />
          )}
        />
      </div>

      <Button type="submit" className="w-[var(--width-authforms)]" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save and Continue"}
        <ArrowRight className="icon-size-s" />
      </Button>
    </form>
  );
}
