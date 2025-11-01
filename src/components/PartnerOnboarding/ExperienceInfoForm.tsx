"use client";

import { ExperienceData } from "@/components/PartnerOnboarding/ExperienceData";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlusIcon } from "lucide-react";
import { useState } from "react";
import { StepComponentProps } from "@/app/register-experience/[step]/page";
import { AccordionDisplay } from "./AccordionDisplay";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";

export interface ExperienceFormData { //Future: Should eventually be merged with the existing experience interface, as they should be the same
  title: string;
  category: string;
  country: string;
  location: string;
  pricePerPerson: {
    min: number | "";
    max: number | "";
    unit: string;
  };
  duration: {
    number: number | "";
    units: string;
  };
  highlights: { symbolId: string; input: string }[];
  specialFeatures: string;
  sdgs: string[];
  longDescription: string;
  maxGuests: number;
  refundable: "Yes" | "No" | "";
  heroImage: File | null;
  galleryImages: File[];
  videoLink: string;
}

// Initial empty experience data
const createEmptyExperience = (): ExperienceFormData => ({
  title: "",
  category: "",
  country: "",
  location: "",
  pricePerPerson: { min: "", max: "", unit: "" },
  duration: { number: "", units: "" },
  highlights: [
    { symbolId: "", input: "" },
    { symbolId: "", input: "" },
  ],
  specialFeatures: "",
  sdgs: [],
  longDescription: "",
  maxGuests: 1,
  refundable: "",
  heroImage: null,
  galleryImages: [],
  videoLink: "",
});

export default function ExperienceInfoForm({ onComplete }: StepComponentProps) {
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [experiences, setExperiences] = useState<ExperienceFormData[]>([
    createEmptyExperience(),
  ]);
  const [openIndex, setOpenIndex] = useState(0);

  const experienceLabels = ["A", "B", "C"];

  const handleAddExperience = () => {
    if (experiences.length < 3) {
      setExperiences([...experiences, createEmptyExperience()]);
      setOpenIndex(experiences.length); // open the newly added one
    }
  };

  const handleDeleteExperience = (index: number) => {
    if (experiences.length <= 1) return;
    setDeleteIndex(index);
  };

  const confirmDelete = () => {
    if (deleteIndex === null) return;

    const newExperiences = experiences.filter((_, i) => i !== deleteIndex);
    setExperiences(newExperiences);

    if (openIndex === deleteIndex) setOpenIndex(0);
    else if (openIndex > deleteIndex) setOpenIndex(openIndex - 1);

    setDeleteIndex(null);
  };

  const handleExperienceChange = (index: number, data: ExperienceFormData) => {
    const newExperiences = [...experiences];
    newExperiences[index] = data;
    setExperiences(newExperiences);
  };

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validation placeholder
    console.log("Submitting experiences:", experiences);

    onComplete();
  }

  return (
    <main className="flex flex-col gap-800">
      {/* header */}
      <header className="flex flex-col gap-300 text-primary">
        <span className="body-xxl-label">Experience Registration</span>
        <span className="body-l">
          Please provide details about the tourism experiences or services your
          business offers. This information helps us showcase your offerings
          accurately on the Himambo platform and connect you with the right
          customers.
        </span>
      </header>

      {/* intro */}
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

      {/* add experience button */}
      <div className="flex justify-end">
        <Button
          variant="outlineYellow"
          size="custom"
          className="px-600 py-400 gap-200"
          onClick={handleAddExperience}
          disabled={experiences.length >= 3}
        >
          Add experience
          <PlusIcon className="icon-size-s" />
        </Button>
      </div>

      {/* Accordions */}
      <div className="flex flex-col gap-800 rounded-600">
        {experiences.map((experience, i) => (
          <AccordionDisplay
            key={i}
            title={`Experience ${experienceLabels[i]}`}
            open={openIndex === i}
            onToggle={() => setOpenIndex((prev) => (prev === i ? -1 : i))}
            className="bg-[var(--surface)]/50 p-800 rounded-600"
          >
            <ExperienceData
              data={experience}
              onChange={(data) => handleExperienceChange(i, data)}
              onDelete={() => handleDeleteExperience(i)}
              canDelete={experiences.length > 1}
            />
          </AccordionDisplay>
        ))}
      </div>

      {/* submit button */}
      <Button onClick={onSubmit}>
        Save and Continue
        <ArrowRight className="icon-size-s" />
      </Button>

      <ConfirmDeleteModal
        open={deleteIndex !== null}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteIndex(null)}
      />
    </main>
  );
}