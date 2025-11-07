"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, BadgeCheckIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BrandMultiLineInput } from "../../brand/BrandMultiLineInput";
import { BrandUploadForm } from "../../brand/BrandUploadForm";
import { StepComponentProps } from "@/app/register-experience/[step]/page";
import { sustainabilityVerificationSchema, SustainabilityVerificationFormData } from "@/lib/validation/onboarding";
import { defaultSustainabilityData, useOnboardingData } from "@/context/PartnerOnboardingContext";

export default function SustainabilityVerificationForm({ onComplete }: StepComponentProps) {
  const { formData, updateStep5 } = useOnboardingData();

  // Initialize react-hook-form with context data
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SustainabilityVerificationFormData>({
    resolver: zodResolver(sustainabilityVerificationSchema),
    mode: "onTouched",
    defaultValues: formData.step5 || defaultSustainabilityData,
  });

  // Hydrate from context if changed (e.g., backend sync)
  useEffect(() => {
    if (formData.step5) {
      Object.entries(formData.step5).forEach(([key, val]) => {
        control._formValues[key as keyof SustainabilityVerificationFormData] = val;
      });
    }
  }, [formData.step5, control]);

  const onSubmit = async (data: SustainabilityVerificationFormData) => {
    // Save to context
    updateStep5(data);
    // Future: post to backend
    console.log("Submitting form:", data);
    // Proceed to next step
    onComplete();
  };

  return (
    <main className="flex flex-col gap-600">
      <header className="flex flex-col gap-300 text-primary">
        <div className="flex flex-row gap-300 justify-center">
          <BadgeCheckIcon className="icon-size-l text-[var(--surface-accent-2)]"/>
          <span className="body-xxl-label">Sustainability Verification</span>
        </div>
        <span className="body-l">
          Here you will provide detailed information about the sustainability of your experience.
        </span>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col pt-600 gap-600">
        <section className="flex flex-col gap-600 relative">
          {/* People */}
          <Controller
            name="people"
            control={control}
            render={({ field, fieldState }) => (
              <BrandMultiLineInput 
                formLabel="1. People: How does your experience contribute to people's wellbeing and inclusion *"
                formLabelClassName="body-l text-primary"
                description="Describe how your activity supports local communities, creates fair job opportunities, preserves cultural identity, or promotes diversity and inclusion."
                descriptionClassName="body-s text-tertiary"
                {...field}
                lines={4}
                placeholder="e.g. hiring local guides, supporting artisans, offering inclusive tours, etc."
                error={fieldState.error?.message}
              />
            )}
          />

          {/* Planet */}
          <Controller
            name="planet"
            control={control}
            render={({ field, fieldState }) => (
              <BrandMultiLineInput 
                formLabel="2. Planet: How does your experience protect the nature or respect the environment?*"
                formLabelClassName="body-l text-primary"
                description="Explain what actions you take to protect the nature, the wildlife, or reduce your environmental impact — such as conserving resources, reducing waste, protecting nature, or educating travelers about sustainability."
                descriptionClassName="body-s text-tertiary"
                {...field}
                lines={4}
                placeholder="e.g. using renewable energy, reducing plastic use, reforesting, or promoting low-impact travel."
                error={fieldState.error?.message}
              />
            )}
          />

          {/* Partnerships */}
          <Controller
            name="partnerships"
            control={control}
            render={({ field, fieldState }) => (
              <BrandMultiLineInput 
                formLabel="3. Partnerships: What partnerships or collaborations strengthen your sustainable impact? *"
                formLabelClassName="body-l text-primary"
                description="Tell us about the organizations, local communities, NGOs, or businesses you collaborate with to make your experience more sustainable or socially responsible."
                descriptionClassName="body-s text-tertiary"
                {...field}
                lines={4}
                placeholder="e.g. working with community associations, sustainability networks, or local cooperatives."
                error={fieldState.error?.message}
              />
            )}
          />

          {/* Peace */}
          <Controller
            name="peace"
            control={control}
            render={({ field, fieldState }) => (
              <BrandMultiLineInput 
                formLabel="4. Peace: How does your experience promote peace, education, respect, and cultural understanding?*"
                formLabelClassName="body-l text-primary"
                description="Describe how your experience fosters harmony, mutual respect, and connection between visitors and local communities."
                descriptionClassName="body-s text-tertiary"
                {...field}
                lines={4}
                placeholder="e.g. intercultural exchanges, conflict-free zones, education for tolerance, or gender equality initiatives."
                error={fieldState.error?.message}
              />
            )}
          />

          {/* Prosperity */}
          <Controller
            name="prosperity"
            control={control}
            render={({ field, fieldState }) => (
              <BrandMultiLineInput 
                formLabel="5. Prosperity: How does your experience generate prosperity in a sustainable and fair way?*"
                formLabelClassName="body-l text-primary"
                description="Explain how your activity creates economic value for you, your team, and your community — while ensuring that growth remains fair, inclusive, and environmentally responsible."
                descriptionClassName="body-s text-tertiary"
                {...field}
                lines={4}
                placeholder="e.g. fair pricing for locals, reinvesting profits in the community, supporting local suppliers, etc."
                error={fieldState.error?.message}
              />
            )}
          />
        </section>

        {/* Files */}
        <div className="grid grid-cols-2 relative">
          <Controller
            name="files"
            control={control}
            render={({ field, fieldState }) => (
              <BrandUploadForm
                label="Support documents (max 5 documents, total size 10 MB max)"
                {...field}
                error={fieldState.error?.message}
              />
            )}
          />
        </div>

        <Button 
          type="submit" 
          className="w-[var(--width-authforms)]"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Save and Continue"}
          <ArrowRight className="icon-size-s" />
        </Button>
      </form>
    </main>
  );
}