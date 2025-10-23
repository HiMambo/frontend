"use client";

import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { useSteps } from "@/context/StepContext";
import { BrandInputForm } from "../brand/BrandInputForm";
import { BrandCheckbox } from "../brand/BrandCheckBox";
import { ArrowRight, Mail, Phone, User } from "lucide-react";
import { BrandDropdownMenu } from "../brand/BrandDropdownMenu";
import { BrandDropdownFlags } from "../brand/BrandDropdownFlags";

export default function CreateAccountForm() {
  const { markStepComplete, routeToStep } = useSteps();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    languages: [] as string[],
    role: "",
    password: "",
    confirmPassword: "",
    acceptedTerms1: false,
    acceptedTerms2: false,
    acceptedTerms3: false,
  });

  function updateFormData<K extends keyof typeof formData>(key: K, value: (typeof formData)[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  // Compute initials
  const initials = useMemo(() => {
    const parts = formData.fullName.trim().split(/\s+/);
    return (
      parts
        .slice(0, 2)
        .map((p) => p[0]?.toUpperCase() ?? "")
        .join("") || "HM"
    );
  }, [formData.fullName]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Submitting form:", formData);
    markStepComplete(1);
    routeToStep(2);
  }

  return (
    <main className="flex flex-col gap-600">
      <header className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-300 text-primary">
          <span className="body-xxl-label">Create Free Account</span>
          <span className="body-l">
            Please provide your contact details below & start your registration
          </span>
        </div>

        {/* User Badge */}
        <div
          className="badge-size-l rounded-full grid text-center items-center heading-h3 transition-colors duration-300 bg-teal-500/15 text-teal-500">
          {initials}
        </div>
      </header>

      <form onSubmit={submit} className="flex flex-col gap-600">
        <section className="grid grid-cols-2 gap-800 relative">
          <BrandInputForm
            width="w-full"
            formLabel="Full Name *"
            formLabelClassName="body-s text-tertiary"
            value={formData.fullName}
            onChange={(e) => updateFormData("fullName", e)}
            icon={<User/>}
          />
          <BrandInputForm
            width="w-full"
            formLabel="Phone Number *"
            formLabelClassName="body-s text-tertiary"
            value={formData.phone}
            onChange={(e) => updateFormData("phone", e)}
            icon={<Phone/>}
          />
          <BrandInputForm
            width="w-full"
            formLabel="Email *"
            formLabelClassName="body-s text-tertiary"
            value={formData.email}
            onChange={(e) => updateFormData("email", e)}
            icon={<Mail/>}
          />
          <BrandDropdownMenu
            items={["Owner", "Employee", "Other"]}
            formLabel="What is your role? *"
            formLabelClassName="body-s text-tertiary"
            value={formData.role}
            onChange={(e) => updateFormData("role", e as string)}
          />
          <BrandInputForm
            contentHidden
            width="w-full"
            formLabel="Password *"
            formLabelClassName="body-s text-tertiary"
            value={formData.password}
            onChange={(e) => updateFormData("password", e)}
          />
          <BrandInputForm
            contentHidden
            width="w-full"
            formLabel="Confirm Password *"
            formLabelClassName="body-s text-tertiary"
            value={formData.confirmPassword}
            onChange={(e) => updateFormData("confirmPassword", e)}
          />
          <BrandDropdownFlags
            items={["Spanish", "English", "German", "French"]}
            formLabel="Languages"
            formLabelClassName="body-s text-tertiary"
            value={formData.languages}
            onChange={(val) => updateFormData("languages", val as string[])}
            multiSelect
          />
        </section>

        <div className="flex flex-col gap-300">
          <BrandCheckbox
            value={formData.acceptedTerms1}
            onChange={(val) => updateFormData("acceptedTerms1", val)}
          >
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

          <BrandCheckbox
            value={formData.acceptedTerms2}
            onChange={(val) => updateFormData("acceptedTerms2", val)}
          >
            I have read and understood HiMambo’s{" "}
            <a href="#" className="underline hover:text-[var(--text-primary)] transition-colors">
              Privacy Policy
            </a>
            , and I consent to the processing of my personal data as described
            therein. *
          </BrandCheckbox>

          <BrandCheckbox
            value={formData.acceptedTerms3}
            onChange={(val) => updateFormData("acceptedTerms3", val)}
          >
            I agree to receive occasional news, updates, and marketing
            communications from HiMambo by email, including information about
            sustainable travel experiences, Partner offers, and company news.
          </BrandCheckbox>
        </div>

        <Button type="submit" className="w-[var(--width-authforms)]">
          Sign Up
          <ArrowRight className="icon-size-s" />
        </Button>
      </form>
    </main>
  );
}
