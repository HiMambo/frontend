"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BrandInputForm } from "../brand/BrandInputForm";
import { ArrowRight, CalendarCheck2, Globe, MapPin, Store } from "lucide-react";
import { BrandMultiLineInput } from "../brand/BrandMultiLineInput";
import { BrandDropdownFlags } from "../brand/BrandDropdownFlags";
import { ALL_COUNTRIES } from "@/lib/countries";
import { BrandDropdownMenu } from "../brand/BrandDropdownMenu";
import { StepComponentProps } from "@/app/register-experience/[step]/page";

export interface BusinessDetailsFormData {
  businessName: string,
  website: string,
  country: string,
  address: string,
  yearFounded: string,
  category: string,
  description: string
}

export default function BusinessDetailsForm({ onComplete }: StepComponentProps) {
  const [formData, setFormData] = useState<BusinessDetailsFormData>({
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

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validation placeholder
    console.log("Submitting form:", formData);

    // Let parent handle completion
    onComplete();
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

      <form onSubmit={onSubmit} className="flex flex-col gap-600">
        <section className="grid grid-cols-2 gap-800 relative">
          <BrandInputForm
            width="w-full"
            formLabel="Business Name *"
            formLabelClassName="body-s text-tertiary"
            value={formData.businessName}
            onChange={(e) => updateFormData("businessName", e)}
            icon={<Store/>}
          />
          <BrandInputForm
            width="w-full"
            formLabel="Business Website or Social Media link *"
            formLabelClassName="body-s text-tertiary"
            value={formData.website}
            onChange={(e) => updateFormData("website", e)}
            icon={<Globe/>}
          />
          <BrandInputForm
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
          <BrandInputForm
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
