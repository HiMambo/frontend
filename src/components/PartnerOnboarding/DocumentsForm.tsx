"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronDown, Paperclip, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const NEXT_STEP = "/register-experience/experience-info";
const PREV_STEP = "/register-experience/business-details";
const DOC_TYPES = [
  "Tax ID / VAT Number",
  "Tourism License",
  "Utility Bill or Invoice",
  "Business Registration",
  "Insurance Certificate",
];

export default function DocumentsForm() {
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [types, setTypes] = useState<string[]>([]);
  const [typesOpen, setTypesOpen] = useState(false);

  function openPicker() {
    inputRef.current?.click();
  }

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
  }

  function removeFile() {
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  function toggleType(label: string, checked: boolean) {
    setTypes((prev) =>
      checked ? [...new Set([...prev, label])] : prev.filter((t) => t !== label)
    );
  }

  function onUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !types.length) return;
    // no progress bar → just accept upload
    alert("File uploaded successfully ✅");
  }

  const canUpload = !!file && types.length > 0;
  const canContinue = !!file && types.length > 0;

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6 items-start">
        {/* LEFT: Upload */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-neutral-700">
            Upload documents
          </label>

          <div
            role="button"
            tabIndex={0}
            onClick={openPicker}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && openPicker()
            }
            className="bg-neutral-50 border border-neutral-200 rounded-md py-2 px-3 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Paperclip className="w-4 h-4 text-neutral-500 shrink-0" />
              <span
                className={`flex-1 text-sm truncate ${
                  file ? "text-neutral-700" : "text-neutral-400"
                }`}
              >
                {file ? file.name : "Choose a PDF, image, or document"}
              </span>

              {file && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile();
                  }}
                  className="p-1 rounded-md hover:bg-neutral-100 text-neutral-500"
                  aria-label="Remove file"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <input
                ref={inputRef}
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png,.webp,.heic,.doc,.docx"
                onChange={onPick}
              />
            </div>
          </div>

          <Button
            type="button"
            onClick={onUpload}
            disabled={!canUpload}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-white rounded-md h-10"
          >
            Upload Documents
          </Button>
        </div>

        {/* RIGHT: Dropdown */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-neutral-700">
            Choose one or more from drop down menu*
          </label>

          <Popover open={typesOpen} onOpenChange={setTypesOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="w-full bg-white border border-neutral-200 rounded-md py-2 px-3 text-left text-sm hover:bg-neutral-50 inline-flex items-center justify-between"
              >
                <span className="truncate">
                  {types.length ? types.join(", ") : "Document type"}
                </span>
                <ChevronDown className="w-4 h-4 text-neutral-500 shrink-0" />
              </button>
            </PopoverTrigger>

            <PopoverContent align="start" className="w-[22rem] p-0">
              <ul className="max-h-72 overflow-auto py-1">
                {DOC_TYPES.map((label) => {
                  const checked = types.includes(label);
                  return (
                    <li key={label}>
                      <button
                        type="button"
                        onClick={() => toggleType(label, !checked)}
                        className="w-full px-2 py-1.5 text-sm text-left hover:bg-neutral-50 flex items-center gap-2"
                      >
                        <Checkbox
                          checked={checked}
                          onCheckedChange={() => {}}
                          className="pointer-events-none"
                        />
                        <span className="flex-1">{label}</span>
                        {checked && (
                          <Check className="w-4 h-4 text-neutral-500" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Button
          type="button"
          onClick={() => router.push(PREV_STEP)}
          variant="outline"
          className="flex-1 rounded-md h-10"
        >
          Go Back
        </Button>
        <Button
          type="button"
          onClick={() => router.push(NEXT_STEP)}
          disabled={!canContinue}
          className={`flex-1 rounded-md h-10 ${
            canContinue
              ? "bg-green-600 hover:bg-green-500 text-white"
              : "bg-neutral-300 text-neutral-500 cursor-not-allowed"
          }`}
        >
          Next step
        </Button>
      </div>
    </>
  );
}
