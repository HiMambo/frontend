"use client";

import { Button } from "@/components/ui/button";
import { useSteps } from "@/context/StepContext";
import { ArrowRight, BadgeCheckIcon } from "lucide-react";
import { useState } from "react";
import { BrandMultiLineInput } from "../brand/BrandMultiLineInput";
import { BrandUploadForm } from "../brand/BrandUploadForm";
import { StepComponentProps } from "@/app/register-experience/[step]/page";

export interface SustainabilityVerificationFormData {
  people: string,
  planet: string,
  partnerships: string,
  peace: string,
  prosperity: string,
}

export default function SustainabilityVerificationForm({ onComplete }: StepComponentProps) {
  const { markStepComplete } = useSteps();

  const [formData, setFormData] = useState({
    people: "",
    planet: "",
    partnerships: "",
    peace: "",
    prosperity: "",
  });

  const [files, setFiles] = useState<File[]>([]);

  function updateFormData<K extends keyof typeof formData>(key: K, value: (typeof formData)[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    // Validation placeholder
    console.log("Submitting form:", formData);
    onComplete();
    markStepComplete(6);
  }

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

      <form onSubmit={submit} className="flex flex-col pt-600 gap-600">
        <section className="flex flex-col gap-600 relative">
          <BrandMultiLineInput 
            formLabel="1. People: How does your experience contribute to people’s wellbeing and inclusion *"
            formLabelClassName="body-l text-primary"
            description="Describe how your activity supports local communities, creates fair job opportunities, preserves cultural identity, or promotes diversity and inclusion."
            descriptionClassName="body-s text-tertiary"
            value={formData.people}
            onChange={val => updateFormData("people", val as string)}
            lines={4}
            placeholder={"e.g. hiring local guides, supporting artisans, offering inclusive tours, etc."}

          />
          <BrandMultiLineInput 
            formLabel="2. Planet: How does your experience protect the nature or respect the environment?*"
            formLabelClassName="body-l text-primary"
            description="Explain what actions you take to protect the nature, the wildlife, or reduce your environmental impact — such as conserving resources, reducing waste, protecting nature, or educating travelers about sustainability."
            descriptionClassName="body-s text-tertiary"
            value={formData.planet}
            onChange={val => updateFormData("planet", val as string)}
            lines={4}
            placeholder={"e.g. using renewable energy, reducing plastic use, reforesting, or promoting low-impact travel."}
          />
          <BrandMultiLineInput 
            formLabel="3. Partnerships: What partnerships or collaborations strengthen your sustainable impact? *"
            formLabelClassName="body-l text-primary"
            description="Tell us about the organizations, local communities, NGOs, or businesses you collaborate with to make your experience more sustainable or socially responsible."
            descriptionClassName="body-s text-tertiary"
            value={formData.partnerships}
            onChange={val => updateFormData("partnerships", val as string)}
            lines={4}
            placeholder={"e.g. working with community associations, sustainability networks, or local cooperatives."}
          />
          <BrandMultiLineInput 
            formLabel="4. Peace: How does your experience promote peace, education, respect, and cultural understanding?*"
            formLabelClassName="body-l text-primary"
            description="Describe how your experience fosters harmony, mutual respect, and connection between visitors and local communities."
            descriptionClassName="body-s text-tertiary"
            value={formData.peace}
            onChange={val => updateFormData("peace", val as string)}
            lines={4}
            placeholder={"e.g. intercultural exchanges, conflict-free zones, education for tolerance, or gender equality initiatives."}
          />
          <BrandMultiLineInput 
            formLabel="5. Prosperity: How does your experience generate prosperity in a sustainable and fair way?*"
            formLabelClassName="body-l text-primary"
            description="Explain how your activity creates economic value for you, your team, and your community — while ensuring that growth remains fair, inclusive, and environmentally responsible."
            descriptionClassName="body-s text-tertiary"
            value={formData.prosperity}
            onChange={val => updateFormData("prosperity", val as string)}
            lines={4}
            placeholder={"e.g. fair pricing for locals, reinvesting profits in the community, supporting local suppliers, etc."}
          />
        </section>
        <div className="grid grid-cols-2 relative">
          <BrandUploadForm
            label="Support documents (max 5 documents, total size 10 MB max)"
            value={files}
            onChange={setFiles}
          />
        </div>

        <Button type="submit" className="w-[var(--width-authforms)]">
          Save and Continue
          <ArrowRight className="icon-size-s" />
        </Button>
      </form>
    </main>
  );
}
