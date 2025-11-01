"use client";

import { Button } from "@/components/ui/button";
import { Save, Trash2, AlertCircle, CheckSquare, FileCheck2 } from "lucide-react";
import { ExperienceFormData } from "./ExperienceInfoForm";
import { BrandInputForm } from "../brand/BrandInputForm";
import { BrandDropdownMenu } from "../brand/BrandDropdownMenu";
import { EXPERIENCE_CATEGORIES, EXPERIENCE_SPECIAL_FEATURES, OPERATING_COUNTRIES, STANDARD_SYMBOLS, SUPPORTED_CURRENCIES } from "@/lib/brandStandardizedDefinitions";
import { BrandDropdownFlags } from "../brand/BrandDropdownFlags";
import { SDGFilterIcon } from "../shared/IconComponents";
import { BrandMultiLineInput } from "../brand/BrandMultiLineInput";
import { BrandUploadForm } from "../brand/BrandUploadForm";
import { BrandNumberInput } from "../brand/BrandNumberInput";
import { SDGDropdown } from "../shared/SDGDropdown";
import { BrandSymbolInput } from "../brand/BrandSymbolInput";
import { BrandRangeInput } from "../brand/BrandRangeInput";
import { BrandDurationInput } from "../brand/BrandDurationInput";

interface ExperienceDataProps {
  data: ExperienceFormData;
  onChange: (data: ExperienceFormData) => void;
  onDelete: () => void;
  canDelete: boolean;
}

export function ExperienceData({
  data,
  onChange,
  onDelete,
  canDelete,
}: ExperienceDataProps) {
  const handleFieldChange = <K extends keyof ExperienceFormData>(
    field: K,
    value: ExperienceFormData[K]
  ) => {
    onChange({ ...data, [field]: value });
  };

  const handleSaveChanges = () => {
    // Placeholder - to be defined with Enrique
    console.log("Save changes clicked", data);
  };

  return (
    <form className="flex flex-col gap-800">
      <div className="flex flex-row py-250 gap-800">
        {/* LEFT COLUMN */}
        <div className="flex flex-col px-600 py-800 gap-600 flex-1">
          <span className="flex flex-row items-center gap-200 text-primary">
            <AlertCircle className="icon-size-s" />
            <span className="body-l">Basic Information</span>
          </span>
          <BrandDropdownMenu
            formLabel="Experience Category"
            formLabelClassName="body-s text-tertiary"
            value={data.category}   
            onChange={(val) => handleFieldChange("category", val as string)}
            items={EXPERIENCE_CATEGORIES}
          />
          <BrandDropdownFlags
            formLabel="Country"
            value={data.country}   
            onChange={(val) => handleFieldChange("country", val as string)}
            items={OPERATING_COUNTRIES}
          />
          <BrandInputForm
            width="w-full"
            formLabel="Location"
            value={data.location}
            onChange={(val) => handleFieldChange("location", val as string)}
          />
          <BrandRangeInput
            formLabel="Price range per person"
            value={data.pricePerPerson}
            onChange={(val) => handleFieldChange("pricePerPerson", val as ExperienceFormData["pricePerPerson"])}
            items={SUPPORTED_CURRENCIES}
          />
          <BrandDurationInput
            formLabel="Duration"
            value={data.duration}
            onChange={(val) => handleFieldChange("duration", val as ExperienceFormData["duration"])}
            items={["Hours", "Days", "Weeks"]}
          />
          <BrandDropdownMenu
            formLabel="Special Features"
            formLabelClassName="body-s text-tertiary"
            value={data.specialFeatures}
            onChange={(val) => handleFieldChange("specialFeatures", val as string)}
            items={EXPERIENCE_SPECIAL_FEATURES}
            multiSelect
          />
          {/* Additional info section */}
          <span className="flex flex-row items-center gap-200 text-primary">
            <CheckSquare className="icon-size-s" />
            <span className="body-l">Additional Information</span>
          </span>
          <BrandSymbolInput
            symbols={STANDARD_SYMBOLS}
            value={data.highlights[0]}
            onChange={(updatedHighlight) => handleFieldChange("highlights", [updatedHighlight, data.highlights[1]])}
            placeholder="Highlight 1"
          />
          <BrandSymbolInput
            symbols={STANDARD_SYMBOLS}
            value={data.highlights[1]}
            onChange={(updatedHighlight) => handleFieldChange("highlights", [data.highlights[0], updatedHighlight])}
            placeholder="Highlight 2"
          />
          <div className="flex flex-col gap-400">
            <span className="flex flex-row items-center gap-200 text-primary">
              <SDGFilterIcon className="icon-size-s" />
              <span className="body-l">SDGs the experience meets</span>
            </span>
            <span className="body-xs text-tertiary">
              If you are not sure of what SDGs your experience meets, please visit the UN SDGs website. <br/>
              <br/>And don&apos;t worry! This is only for an initial screening. HiMambo will help you refine this.
            </span>
            <SDGDropdown
              value={data.sdgs}
              onChange={(val) => handleFieldChange("sdgs", val as string[])}
            />
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col px-600 py-800 gap-600 flex-1">
          {/* Header */}
          <span className="flex flex-row items-center gap-200 text-primary">
            <FileCheck2 className="icon-size-s" />
            <span className="body-l">Description</span>
          </span>

          {/* Description + Details */}
          <BrandInputForm 
            width="w-full"
            formLabel="Heading (max  50 characters)"
            value={data.title}
            onChange={(val) => handleFieldChange("title", val as string)}
          />
          <BrandMultiLineInput
            lines={7}
            formLabel="Long description (max 400 characters)"
            formLabelClassName="body-s text-tertiary"
            value={data.longDescription}
            onChange={(val) => handleFieldChange("longDescription", val as string)}
          />
          <BrandNumberInput
            formLabel="Max # of Guests"
            min={1}
            max={12}
            numberOfDigits={2}
            value={data.maxGuests}
            onChange={(val) => handleFieldChange("maxGuests", val as number)}
          />
          <BrandDropdownMenu
            formLabel="Refundable?"
            items={["Yes", "No"]}
            value={data.refundable}
            onChange={(val) => handleFieldChange("refundable", val as ExperienceFormData["refundable"])}
          />
          <BrandUploadForm
            label="Hero image (4:3 ratio / 1280 x 960 px)"
            value={data.heroImage ? [data.heroImage] : []}
            onChange={(files) => handleFieldChange("heroImage", files[0] || null)}
            multiple={false}
          />
          <BrandUploadForm
            label="Gallery (max 10 images)"
            value={data.galleryImages}
            onChange={(files) => handleFieldChange("galleryImages", files)}
          />
          <BrandInputForm 
            width="w-full"
            formLabel="Video Link"
            value={data.videoLink}
            onChange={(val) => handleFieldChange("videoLink", val as string)}
            placeholder="Enter YouTube or Google Drive link here"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-row justify-between items-center w-full px-800">
        <Button
          variant="outlineDestructive"
          size="custom"
          className="px-600 py-400"
          type="button"
          onClick={onDelete}
          disabled={!canDelete}
        >
          Delete Experience
          <Trash2 className="icon-size-s" />
        </Button>
        <Button
          variant="green"
          size="custom"
          className="px-600 py-400"
          type="button"
          onClick={handleSaveChanges}
        >
          <span className="px-1600 flex gap-250">
            Save changes
            <Save className="icon-size-s" />
          </span>
        </Button>
      </div>
    </form>
  );
}