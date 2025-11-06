"use client";

import { Button } from "@/components/ui/button";
import { useMemo, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BrandInputForm } from "../brand/BrandInputForm";
import { BrandCheckbox } from "../brand/BrandCheckBox";
import { ArrowRight, Mail, Phone, User } from "lucide-react";
import { BrandDropdownMenu } from "../brand/BrandDropdownMenu";
import { BrandDropdownFlags } from "../brand/BrandDropdownFlags";
import { StepComponentProps } from "@/app/register-experience/[step]/page";
import { defaultCreateAccountData, useOnboardingData } from "@/context/PartnerOnboardingContext";
import { createAccountSchema, CreateAccountFormData } from "@/lib/validation/onboarding";

export default function CreateAccountForm({ onComplete }: StepComponentProps) {
  const { formData, updateStep1 } = useOnboardingData();

  // Initialize react-hook-form with context data
  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountSchema),
    mode: "onTouched",
    defaultValues: formData.step1 || defaultCreateAccountData,
  });

  // Hydrate from context if changed (e.g., backend sync)
  useEffect(() => {
    if (formData.step1) {
      Object.entries(formData.step1).forEach(([key, val]) => {
        control._formValues[key as keyof CreateAccountFormData] = val;
      });
    }
  }, [formData.step1, control]);

  const onSubmit = async (data: CreateAccountFormData) => {
    // Save to context
    updateStep1(data);
    // Future: post to backend
    console.log("Submitting form:", data);
    // Proceed to next step
    onComplete();
  };

  // Compute initials dynamically
  const fullName = watch("fullName");
  const initials = useMemo(() => {
    const parts = (fullName || "").trim().split(/\s+/);
    return parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "").join("") || "HM";
  }, [fullName]);

  return (
    <main className="flex flex-col gap-600">
      <header className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-300 text-primary">
          <span className="body-xxl-label">Create Free Account</span>
          <span className="body-l">
            Please provide your contact details below & start your registration
          </span>
        </div>

        <div className="badge-size-l rounded-full grid text-center items-center heading-h3 bg-teal-500/15 text-teal-500">
          {initials}
        </div>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-600">
        <section className="grid grid-cols-2 gap-800 relative">
          {/* Full Name */}
          <Controller
            name="fullName"
            control={control}
            render={({ field, fieldState }) => (
              <BrandInputForm
                formLabel="Full Name *"
                icon={User}
                {...field}
                error={fieldState.error?.message}
              />
            )}
          />

          {/* Phone */}
          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <BrandInputForm
                formLabel="Phone Number *"
                icon={Phone}
                {...field}
                error={fieldState.error?.message}
              />
            )}
          />

          {/* Email */}
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <BrandInputForm
                formLabel="Email *"
                icon={Mail}
                {...field}
                error={fieldState.error?.message}
              />
            )}
          />

          {/* Role */}
          <Controller
            name="role"
            control={control}
            render={({ field, fieldState }) => (
              <BrandDropdownMenu
                formLabel="What is your role? *"
                items={["Owner", "Employee", "Other"]}
                {...field}
                error={fieldState.error?.message}
              />
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <BrandInputForm
                formLabel="Password *"
                contentHidden
                {...field}
                error={fieldState.error?.message}
              />
            )}
          />

          {/* Confirm Password */}
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field, fieldState }) => (
              <BrandInputForm
                formLabel="Confirm Password *"
                contentHidden
                {...field}
                error={fieldState.error?.message}
              />
            )}
          />

          {/* Languages */}
          <Controller
            name="languages"
            control={control}
            render={({ field, fieldState }) => (
              <BrandDropdownFlags
                formLabel="Languages"
                items={[
                  "Spanish",
                  "English",
                  "Portuguese (Brazil)",
                  "Portuguese (Portugal)",
                  "German",
                  "French",
                ]}
                multiSelect
                {...field}
                error={fieldState.error?.message}
              />
            )}
          />
        </section>

        {/* Terms checkboxes */}
        <Controller
          name="acceptedTerms1"
          control={control}
          render={({ field, fieldState }) => (
            <BrandCheckbox {...field} error={fieldState.error?.message}>
              I have read & accept the{" "}
              <a href="#" className="underline hover:text-[var(--text-primary)] transition-colors">
                Terms of Service
              </a>{" "}
              and the{" "}
              <a href="#" className="underline hover:text-[var(--text-primary)] transition-colors">
                Privacy Policy
              </a>
              . *
            </BrandCheckbox>
          )}
        />

        <Controller
          name="acceptedTerms2"
          control={control}
          render={({ field, fieldState }) => (
            <BrandCheckbox {...field} error={fieldState.error?.message}>
              I have read and understood HiMambo’s{" "}
              <a href="#" className="underline hover:text-[var(--text-primary)] transition-colors">
                Privacy Policy
              </a>
              , and I consent to the processing of my personal data as described therein. *
            </BrandCheckbox>
          )}
        />

        <Controller
          name="acceptedTerms3"
          control={control}
          render={({ field }) => (
            <BrandCheckbox {...field}>
              I agree to receive occasional news, updates, and marketing communications from HiMambo by email.
            communications from HiMambo by email, including information about
            sustainable travel experiences, Partner offers, and company news.
            </BrandCheckbox>
          )}
        />

        <Button 
          type="submit" 
          className="w-[var(--width-authforms)]"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Sign Up"}
          <ArrowRight className="icon-size-s" />
        </Button>
      </form>
    </main>
  );
}