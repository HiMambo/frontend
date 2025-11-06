"use client";

import { Button } from "@/components/ui/button";
import { Save, Trash2, AlertCircle, CheckSquare, FileCheck2 } from "lucide-react";
import { Controller, Control, useWatch } from "react-hook-form";
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
import { ExperienceFormData } from "@/lib/validation/onboarding";
import { useOnboardingData } from "@/context/PartnerOnboardingContext";
import { useState } from "react";

interface ExperienceDataProps {
  control: Control<{ experiences: ExperienceFormData[] }>;
  index: number;
  onDelete: () => void;
  canDelete: boolean;
}

export function ExperienceData({
  control,
  index,
  onDelete,
  canDelete,
}: ExperienceDataProps) {
  const { updateSingleExperience } = useOnboardingData();
  const [isSaved, setIsSaved] = useState(false);
  
  // Use useWatch to get current values from the control prop
  const currentExperience = useWatch({
    control,
    name: `experiences.${index}`,
  });

  const handleSaveChanges = () => {
    // Save current state without validation
    if (currentExperience) {
      updateSingleExperience(index, currentExperience);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 1000); // revert after 1s
    }
  };

  return (
    <div className="flex flex-col gap-800">
      <div className="flex flex-row py-250 gap-800">
        {/* LEFT COLUMN */}
        <div className="flex flex-col px-600 py-800 gap-600 flex-1">
          <span className="flex flex-row items-center gap-200 text-primary">
            <AlertCircle className="icon-size-s" />
            <span className="body-l">Basic Information</span>
          </span>

          <Controller
            name={`experiences.${index}.category`}
            control={control}
            render={({ field, fieldState }) => (
              <BrandDropdownMenu
                {...field}
                formLabel="Experience Category"
                formLabelClassName="body-s text-tertiary"
                items={EXPERIENCE_CATEGORIES}
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name={`experiences.${index}.country`}
            control={control}
            render={({ field, fieldState }) => (
              <BrandDropdownFlags
                {...field}
                formLabel="Country"
                items={OPERATING_COUNTRIES}
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name={`experiences.${index}.location`}
            control={control}
            render={({ field, fieldState }) => (
              <BrandInputForm
                {...field}
                width="w-full"
                formLabel="Location"
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name={`experiences.${index}.pricePerPerson`}
            control={control}
            render={({ field, formState }) => {
              const priceError =
                formState.errors.experiences?.[index]?.pricePerPerson;
              const minError = priceError?.min?.message;
              const maxError = priceError?.max?.message;
              const currencyError = priceError?.currency?.message;

              return (
                <BrandRangeInput
                  formLabel="Price range per person"
                  value={{
                    min: field.value.min,
                    max: field.value.max,
                    unit: field.value.currency,
                  }}
                  onChange={(val) =>
                    field.onChange({
                      min: val.min,
                      max: val.max,
                      currency: val.unit,
                    })
                  }
                  items={SUPPORTED_CURRENCIES}
                  errorMin={minError}
                  errorMax={maxError}
                  errorUnit={currencyError}
                />
              );
            }}
          />

          <Controller
            name={`experiences.${index}.duration`}
            control={control}
            render={({ field, formState }) => {
              const durationError =
                formState.errors.experiences?.[index]?.duration;
              const numberError = durationError?.number?.message;
              const unitsError = durationError?.units?.message;

              return (
                <BrandDurationInput
                  formLabel="Duration"
                  value={field.value}
                  onChange={field.onChange}
                  items={["Hours", "Days", "Weeks"]}
                  errorNumber={numberError}
                  errorUnits={unitsError}
                />
              );
            }}
          />

          <Controller
            name={`experiences.${index}.specialFeatures`}
            control={control}
            render={({ field, fieldState }) => (
              <BrandDropdownMenu
                {...field}
                formLabel="Special Features"
                formLabelClassName="body-s text-tertiary"
                items={EXPERIENCE_SPECIAL_FEATURES}
                multiSelect
                error={fieldState.error?.message}
              />
            )}
          />

          {/* Additional info section */}
          <span className="flex flex-row items-center gap-200 text-primary">
            <CheckSquare className="icon-size-s" />
            <span className="body-l">Additional Information</span>
          </span>

          <Controller
            name={`experiences.${index}.highlights.0`}
            control={control}
            render={({ field, formState }) => {
              const highlightsError = 
                formState.errors.experiences?.[index]?.highlights?.[0]
              const symbolError = highlightsError?.symbolId?.message;
              const inputError = highlightsError?.input?.message;

              return (
                <BrandSymbolInput
                  symbols={STANDARD_SYMBOLS}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={"Highlight 1"}
                  errorSymbol={symbolError}
                  errorInput={inputError}
                />
              );
            }}
          />

          <Controller
            name={`experiences.${index}.highlights.1`}
            control={control}
            render={({ field, formState }) => {
              const symbolError = formState.errors.experiences?.[index]?.highlights?.[1]?.symbolId?.message;
              const inputError = formState.errors.experiences?.[index]?.highlights?.[1]?.input?.message;

              return (
                <BrandSymbolInput
                  symbols={STANDARD_SYMBOLS}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={"Highlight 2"}
                  errorSymbol={symbolError}
                  errorInput={inputError}
                />
              );
            }}
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
            <Controller
              name={`experiences.${index}.sdgs`}
              control={control}
              render={({ field, fieldState }) => (
                <SDGDropdown
                  {...field}
                  error={fieldState.error?.message}
                />
              )}
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
          <Controller
            name={`experiences.${index}.title`}
            control={control}
            render={({ field, fieldState }) => (
              <BrandInputForm
                {...field}
                width="w-full"
                formLabel="Heading (max 50 characters)"
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name={`experiences.${index}.longDescription`}
            control={control}
            render={({ field, fieldState }) => (
              <BrandMultiLineInput
                {...field}
                lines={7}
                formLabel="Long description (max 400 characters)"
                formLabelClassName="body-s text-tertiary"
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name={`experiences.${index}.maxGuests`}
            control={control}
            render={({ field, fieldState }) => (
              <BrandNumberInput
                formLabel="Max # of Guests"
                min={1}
                max={12}
                numberOfDigits={2}
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name={`experiences.${index}.refundable`}
            control={control}
            render={({ field, fieldState }) => (
              <BrandDropdownMenu
                {...field}
                formLabel="Refundable?"
                items={["Yes", "No"]}
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name={`experiences.${index}.heroImage`}
            control={control}
            render={({ field, fieldState }) => (
              <BrandUploadForm
                label="Hero image (4:3 ratio / 1280 x 960 px)"
                value={field.value ? [field.value] : []}
                onChange={(files) => field.onChange(files[0] || null)}
                multiple={false}
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name={`experiences.${index}.galleryImages`}
            control={control}
            render={({ field, fieldState }) => (
              <BrandUploadForm
                label="Gallery (max 10 images)"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name={`experiences.${index}.videoLink`}
            control={control}
            render={({ field, fieldState }) => (
              <BrandInputForm
                {...field}
                width="w-full"
                formLabel="Video Link"
                placeholder="Enter YouTube or Google Drive link here"
                error={fieldState.error?.message}
              />
            )}
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
          disabled={isSaved}
        >
          <span className="px-1600 flex gap-250">
            {isSaved ? "Changes saved!" : "Save changes"}
            <Save className="icon-size-s" />
          </span>
        </Button>
      </div>
    </div>
  );
}