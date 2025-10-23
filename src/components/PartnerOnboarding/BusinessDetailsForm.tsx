"use client";

import { Button } from "@/components/ui/button";
import { useSteps } from "@/context/StepContext";
import { useState } from "react";
import { InputForm } from "../AuthFlow/AuthTabs/InputForm";
import { ArrowRight, CalendarCheck2, Globe, MapPin, Store } from "lucide-react";
import { BrandMultiLineInput } from "../brand/BrandMultiLineInput";
import { BrandDropdownFlags } from "../brand/BrandDropdownFlags";
import { ALL_COUNTRIES } from "@/lib/countries";
import { BrandDropdownMenu } from "../brand/BrandDropdownMenu";

export default function BusinessDetailsForm() {
  const { markStepComplete, routeToStep } = useSteps();

  const [formData, setFormData] = useState({
    businessName: "",
    website: "",
    country: "",
    address: "",
    yearFounded: "",
    category: "",
    description: ""
  });

  function updateFormData<K extends keyof typeof formData>(key: K, value: (typeof formData)[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Submitting form:", formData);
    markStepComplete(2);
    routeToStep(3);
  }

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

      <form onSubmit={submit} className="flex flex-col gap-600">
        <section className="grid grid-cols-2 gap-800 relative">
          <InputForm
            width="w-full"
            formLabel="Business Name *"
            formLabelClassName="body-s text-tertiary"
            value={formData.businessName}
            onChange={(e) => updateFormData("businessName", e)}
            icon={<Store/>}
          />
          <InputForm
            width="w-full"
            formLabel="Business Website or Social Media link *"
            formLabelClassName="body-s text-tertiary"
            value={formData.website}
            onChange={(e) => updateFormData("website", e)}
            icon={<Globe/>}
          />
          <InputForm
            width="w-full"
            formLabel="Business Address *"
            formLabelClassName="body-s text-tertiary"
            value={formData.address}
            onChange={(e) => updateFormData("address", e)}
            icon={<MapPin/>}
          />
          <BrandDropdownFlags
            items={ALL_COUNTRIES}
            formLabel="Main country of operation *"
            formLabelClassName="body-s text-tertiary"
            value={formData.country}
            onChange={(e) => updateFormData("country", e as string)}
          />
          <InputForm
            width="w-full"
            formLabel="Year Founded *"
            formLabelClassName="body-s text-tertiary"
            value={formData.yearFounded}
            onChange={(e) => updateFormData("yearFounded", e)}
            icon={<CalendarCheck2/>}
          />
          <BrandDropdownMenu
            items={[
              "Nature & Wildlife",
              "Cultural Immersion",
              "Adventure & Outdoor",
              "Wellness & Retreats",
              "Social Impact",
              "Food & Gastronomy",
            ]}
            formLabel="Select Category *"
            formLabelClassName="body-s text-tertiary"
            value={formData.category}
            onChange={(e) => updateFormData("category", e as string)}
          />
        </section>

        <BrandMultiLineInput
          lines={3}
          formLabel="Description (250 characters max) *"
          formLabelClassName="body-s text-tertiary"
          value={formData.description}
          onChange={(e) => updateFormData("description", e)}
        />

        <Button type="submit" className="w-[var(--width-authforms)]">
          Save and Continue
          <ArrowRight className="icon-size-s" />
        </Button>
      </form>
    </main>
  );
}
