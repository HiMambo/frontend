"use client";

import { useRef } from "react";
import { Upload, Trash2 } from "lucide-react";

interface BrandUploadFormProps {
  label?: string;
  labelClassName?: string;
  value: File[];
  onChange: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSizeMB?: number;
}

export function BrandUploadForm({
  label = "Upload files",
  labelClassName = "body-s text-tertiary",
  value,
  onChange,
  accept = ".pdf,.jpg,.jpeg,.png,.webp,.heic,.doc,.docx",
  multiple = true,
  maxSizeMB = 1,
}: BrandUploadFormProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const openPicker = () => inputRef.current?.click();

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files).filter((file) => {
      if (file.size > maxSizeMB * 1024 * 1024) {
        alert(`"${file.name}" exceeds ${maxSizeMB} MB limit`);
        return false;
      }
      return true;
    });

    onChange([...value, ...newFiles]);

    if (inputRef.current) inputRef.current.value = "";
  };

  const removeFile = (index: number) => {
    const updated = value.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="flex flex-col gap-[var(--spacing-300)] w-full">
      {label && <label className={labelClassName}>{label}</label>}

      {/* Upload area */}
      <div
        role="button"
        tabIndex={0}
        onClick={openPicker}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openPicker()}
        className={`
          w-full bg-white body-m text-tertiary
          rounded-300 px-[var(--spacing-600)] py-[var(--spacing-400)]
          cursor-pointer flex items-center gap-300
          min-h-[calc(var(--spacing-400)*3)]
        `}
      >
        <span className="truncate flex-1 text-disabled">
          Click to upload or drag and drop
        </span>
        <Upload className="icon-size-s text-disabled shrink-0" />
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={onPick}
        />
      </div>

      {/* Uploaded files list */}
      <div
        className={`
          flex flex-col gap-200 mt-200
          min-h-[calc(var(--spacing-400)*3)]
          bg-white rounded-300 px-600 py-400
        `}
      >
        {value.length === 0 ? (
          <span className="body-s text-tertiary opacity-50">
            No files uploaded
          </span>
        ) : (
          value.map((file, index) => (
            <div
              key={index}
              className="w-full flex items-center justify-between body-s text-tertiary"
            >
              <span className="truncate">{file.name}</span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="cursor-pointer hover:text-[var(--terracotta-700)] transition-colors"
              >
                <Trash2 className="icon-size-s" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
