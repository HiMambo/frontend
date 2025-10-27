"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { BrandDropdownMenu } from "../brand/BrandDropdownMenu";
import { BrandUploadForm } from "../brand/BrandUploadForm";
import { StepComponentProps } from "@/app/register-experience/[step]/page";

const DOC_TYPES = [
  "Tax ID / VAT Number",
  "Tourism License",
  "Utility Bill or Invoice",
  "Business Registration",
  "Insurance Certificate",
];

export default function DocumentsForm({ onComplete }: StepComponentProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation placeholder
    console.log("Submitting documents...")
    onComplete();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-600">
      <header className="flex flex-col gap-300 text-primary pr-6000">
        <span className="body-xxl-label">Business Legal Documents</span>
        <span className="body-l">
          These documents help us verify your business legitimacy to ensure eligibility for the Himambo Partner Program.
        </span>
      </header>

      <div className="grid grid-cols-2 gap-600">
        {/* Left column: Upload input + uploaded files */}
        <BrandUploadForm
          label="Upload documents (max 1 MB)"
          labelClassName="body-s text-tertiary"
          value={files}
          onChange={setFiles}
        />

        {/* Right column: Document types dropdown */}
        <BrandDropdownMenu
          items={DOC_TYPES}
          formLabel="Choose one or more from the dropdown menu *"
          formLabelClassName="body-s text-tertiary"
          value={selectedTypes}
          onChange={(val) => setSelectedTypes(val as string[])}
        />
      </div>

      <Button type="submit" className="w-[var(--width-authforms)]">
        Save and Continue
        <ArrowRight className="icon-size-s" />
      </Button>
    </form>
  );
}
