"use client";

import { ExperienceData } from "@/components/PartnerOnboarding/FormComponents/ExperienceData";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StepComponentProps } from "@/app/register-experience/[step]/page";
import { AccordionDisplay } from "../AccordionDisplay";
import { ConfirmDeleteModal } from "../ConfirmDeleteModal";
import { experiencesArraySchema } from "@/lib/validation/onboarding";
import { defaultExperienceData, useOnboardingData } from "@/context/PartnerOnboardingContext";
import { cn } from "@/lib/utils";

export default function ExperienceInfoForm({ onComplete }: StepComponentProps) {
  const { formData, updateStep4 } = useOnboardingData();
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [openIndex, setOpenIndex] = useState(0);

  const experienceLabels = ["A", "B", "C"];

  // Single form instance for all experiences
  const { handleSubmit, control, watch, getValues, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(experiencesArraySchema),
    mode: "onTouched",
    defaultValues: {
      experiences: formData.step4.length > 0 
        ? formData.step4 
        : [defaultExperienceData]
    },
  });

  const experiences = watch("experiences");

  const handleAddExperience = () => {
    const current = getValues("experiences");
    if (current.length < 3) {
      setValue("experiences", [...current, defaultExperienceData]);
      setOpenIndex(current.length); // open the newly added one
    }
  };

  const handleDeleteExperience = (index: number) => {
    const current = getValues("experiences");
    if (current.length <= 1) return;
    setDeleteIndex(index);
  };

  const confirmDelete = () => {
    if (deleteIndex === null) return;

    const current = getValues("experiences");
    const newExperiences = current.filter((_, i) => i !== deleteIndex);
    setValue("experiences", newExperiences);

    updateStep4(newExperiences);

    if (openIndex === deleteIndex) setOpenIndex(0);
    else if (openIndex > deleteIndex) setOpenIndex(openIndex - 1);

    setDeleteIndex(null);
  };

  // "Save and Continue" - validates everything
  const onSubmit = handleSubmit((data) => {
    updateStep4(data.experiences);
    onComplete();
  }, (errors) => {
    // Validation failed
    console.log("Validation errors:", errors);
  });

  return (
    <main className="flex flex-col gap-800">
      {/* Header */}
      <header className="flex flex-col gap-300 text-primary">
        <span className="body-xxl-label">Experience Registration</span>
        <span className="body-l">
          Please provide details about the tourism experiences or services your
          business offers. This information helps us showcase your offerings
          accurately on the Himambo platform and connect you with the right
          customers.
        </span>
      </header>

      {/* Subheader */}
      <section className="flex flex-col gap-400">
        <span className="body-xl text-secondary">
          Do you want to get HiMambo Certified?
        </span>
        <span className="body-m text-primary">
          Add up to three experiences and you will be automatically verified if
          all of them meet our internal sustainability Standards. Our HiMambo
          Certification is free of charge.
        </span>
      </section>

      <form onSubmit={onSubmit} className="flex flex-col gap-800">
        {/* Add experience button */}
        <div className="flex justify-end">
          <Button
            variant="outlineYellow"
            size="custom"
            className="px-600 py-400 gap-200"
            type="button"
            onClick={handleAddExperience}
            disabled={experiences.length >= 3}
          >
            Add experience
            <PlusIcon className="icon-size-s" />
          </Button>
        </div>

        {/* Accordions */}
        <div className="flex flex-col gap-800 rounded-600">
          {experiences.map((_, i) => {
            const hasErrors = errors.experiences?.[i] !== undefined;

            return (
              <AccordionDisplay
                key={i}
                title={`Experience ${experienceLabels[i]}`}
                open={openIndex === i}
                onToggle={() => setOpenIndex((prev) => (prev === i ? -1 : i))}
                className={cn(
                  "p-800 rounded-600 transition-all bg-[var(--surface)]/50",
                  hasErrors ? "border border-[3px] border-destructive" : ""
                )}
              >
                <ExperienceData
                  control={control}
                  index={i}
                  onDelete={() => handleDeleteExperience(i)}
                  canDelete={experiences.length > 1}
                />
              </AccordionDisplay>
            );
          })}
        </div>

        {/* Submit button */}
        <Button type="submit">
          Save and Continue
          <ArrowRight className="icon-size-s" />
        </Button>
      </form>

      <ConfirmDeleteModal
        open={deleteIndex !== null}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteIndex(null)}
      />
    </main>
  );
}