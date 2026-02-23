"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BrandInputForm } from "../../brand/BrandInputForm";
import { ArrowRight, CalendarCheck2, Globe, MapPin, Store } from "lucide-react";
import { BrandMultiLineInput } from "../../brand/BrandMultiLineInput";
import { BrandDropdownFlags } from "../../brand/BrandDropdownFlags";
import { BrandDropdownMenu } from "../../brand/BrandDropdownMenu";
import { StepComponentProps } from "@/app/register-experience/[step]/page";
import { OPERATING_COUNTRIES } from "@/lib/brandStandardizedDefinitions";
import { defaultBusinessDetailsData, useOnboardingData } from "@/context/PartnerOnboardingContext";
import { businessDetailsSchema, BusinessDetailsFormData } from "@/lib/validation/onboarding";

export default function BusinessDetailsForm({ onComplete }: StepComponentProps) {
  const { formData, updateStep2 } = useOnboardingData();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm<BusinessDetailsFormData>({
    resolver: zodResolver(businessDetailsSchema),
    mode: "onTouched",
    defaultValues: formData.step2 || defaultBusinessDetailsData,
  });

  // Rehydrate from context if formData changes
  useEffect(() => {
    if (formData.step2) {
      reset(formData.step2);
    }
  }, [formData.step2, reset]);

  const onSubmit = async (data: BusinessDetailsFormData) => {
    // Save to context
    updateStep2(data);
    // Future: Backend save
    console.log("Submitting form:", data);
    // Proceed to next step
    onComplete();
  };

  return (
    <main className="flex flex-col gap-600">
      <header className="flex flex-row justify-start items-center">
        <div className="flex flex-col gap-300 text-primary">
          <span className="body-xxl-label">Business Details</span>
          <span className="body-l">
            Please provide your business details below & start your registration
          </span>
        </div>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-600">
        <section className="grid grid-cols-2 gap-800 relative">
          {/* Business Name */}
          <Controller
            name="businessName"
            control={control}
            render={({ field, fieldState }) => (
              <BrandInputForm
                {...field}
                formLabel="Business Name *"
                icon={Store}
                error={fieldState.error?.message}
              />
            )}
          />

          {/* Website / Social Link */}
          <Controller
            name="website"
            control={control}
            render={({ field, fieldState }) => (
              <BrandInputForm
                {...field}
                formLabel="Business Website or Social Media link *"
                icon={Globe}
                error={fieldState.error?.message}
              />
            )}
          />

          {/* Address */}
          <Controller
            name="address"
            control={control}
            render={({ field, fieldState }) => (
              <BrandInputForm
                {...field}
                formLabel="Business Address *"
                icon={MapPin}
                error={fieldState.error?.message}
                placeholder="Somewhere over the rainbow"
              />
            )}
          />

          {/* Country */}
          <Controller
            name="country"
            control={control}
            render={({ field, fieldState }) => (
              <BrandDropdownFlags
                {...field}
                items={OPERATING_COUNTRIES}
                formLabel="Main country of operation *"
                error={fieldState.error?.message}
              />
            )}
          />

          {/* Year Founded */}
          <Controller
            name="yearFounded"
            control={control}
            render={({ field, fieldState }) => (
              <BrandInputForm
                {...field}
                formLabel="Year Founded *"
                icon={CalendarCheck2}
                error={fieldState.error?.message}
              />
            )}
          />

          {/* Category */}
          <Controller
            name="category"
            control={control}
            render={({ field, fieldState }) => (
              <BrandDropdownMenu
                {...field}
                items={[
                  "Nature & Wildlife",
                  "Cultural Immersion",
                  "Adventure & Outdoor",
                  "Wellness & Retreats",
                  "Social Impact",
                  "Food & Gastronomy",
                ]}
                formLabel="Select Category *"
                error={fieldState.error?.message}
              />
            )}
          />
        </section>

        {/* Description */}
        <Controller
          name="description"
          control={control}
          render={({ field, fieldState }) => (
            <BrandMultiLineInput
              {...field}
              lines={3}
              formLabel="Description (250 characters max) *"
              formLabelClassName="body-s text-tertiary"
              error={fieldState.error?.message}
            />
          )}
        />

        <Button 
          type="submit" 
          className="w-[var(--width-authforms)]"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save and Continue"}
          <ArrowRight className="icon-size-s" />
        </Button>
      </form>
    </main>
  );
}