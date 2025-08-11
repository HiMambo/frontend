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
import { useEffect, useRef, useState } from "react";

const NEXT_STEP = "/register-experience/experience-info";
const DOC_TYPES = [
  "Tax ID / VAT Number",
  "Tourism License",
  "Utility Bill or Invoice",
  "Business Registration",
  "Insurance Certificate",
];

export default function DocumentsForm() {
  const router = useRouter();

  // left (upload)
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  // right (types)
  const [types, setTypes] = useState<string[]>(["Tax ID / VAT Number"]);
  const [typesOpen, setTypesOpen] = useState(false);

  function openPicker() {
    inputRef.current?.click();
  }
  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setProgress(0);
  }
  function removeFile() {
    setFile(null);
    setProgress(0);
    if (inputRef.current) inputRef.current.value = "";
  }
  function toggleType(label: string, checked: boolean) {
    setTypes((prev) =>
      checked ? [...new Set([...prev, label])] : prev.filter((t) => t !== label)
    );
  }

  // simulate upload
  function onUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !types.length || uploading) return;
    setUploading(true);
    setProgress(0);
    const id = setInterval(() => {
      setProgress((p) => {
        const n = Math.min(p + 12, 100);
        if (n === 100) {
          clearInterval(id);
          setUploading(false);
        }
        return n;
      });
    }, 100);
  }

  useEffect(() => {
    if (!file) setProgress(0);
  }, [file]);

  const canUpload = !!file && types.length > 0 && !uploading;
  const canContinue = progress === 100;

  return (
    <>
      {/* grid wrapper */}
      <div className="grid md:grid-cols-2 gap-400 items-start">
        {/* LEFT — add min-w-0 so contents can shrink */}
        <div className="min-w-0 space-y-200">
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
            className="bg-neutral-50 border border-neutral-200 rounded-300 px-250 py-200"
          >
            <div className="flex items-center gap-200">
              <Paperclip className="w-4 h-4 text-neutral-500 shrink-0" />
              <span
                className={`flex-1 text-sm truncate ${
                  file ? "text-neutral-700" : "text-neutral-400"
                }`}
                title={file?.name}
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
                  className="p-100 rounded-200 hover:bg-neutral-100 text-neutral-500"
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

            {file && (
              <div className="mt-150">
                <div className="h-2 rounded-full bg-neutral-200 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-[width] duration-150 ease-out bg-[#b26fff]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="mt-050 text-right text-[12px] text-neutral-600">
                  {progress}%
                </div>
              </div>
            )}
          </div>

          <Button
            type="button"
            onClick={onUpload}
            disabled={!canUpload}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-white rounded-300 h-800"
          >
            Upload Documents
          </Button>
        </div>

        {/* RIGHT — add min-w-0 so dropdown trigger doesn’t force overflow */}
        <div className="min-w-0 space-y-200">
          <label className="text-sm font-semibold text-neutral-700">
            Choose one or more from drop down menu*
          </label>

          <Popover open={typesOpen} onOpenChange={setTypesOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="w-full bg-white border border-neutral-200 rounded-300 px-250 py-200 text-left text-sm hover:bg-neutral-50 inline-flex items-center justify-between"
              >
                <span className="truncate">
                  {types.length ? types.join(", ") : "Document type"}
                </span>
                <ChevronDown className="w-4 h-4 text-neutral-500 shrink-0" />
              </button>
            </PopoverTrigger>
            {/* keep menu at sane width */}
            <PopoverContent align="start" className="w-[22rem] p-0">
              <ul className="max-h-72 overflow-auto py-100">
                {DOC_TYPES.map((label) => {
                  const checked = types.includes(label);
                  return (
                    <li key={label}>
                      <button
                        type="button"
                        onClick={() => toggleType(label, !checked)}
                        className="w-full px-200 py-150 text-sm text-left hover:bg-neutral-50 flex items-center gap-200"
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

      <div className="mt-400" />

      <div className="flex flex-col sm:flex-row gap-300">
        <Button
          type="button"
          onClick={() => router.push(NEXT_STEP)}
          disabled={!canContinue}
          className="flex-1 bg-home-button hover:brightness-110 text-white rounded-300 h-800"
        >
          Next step
        </Button>
      </div>
    </>
  );
}
