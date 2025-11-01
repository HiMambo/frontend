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

  const openPicker = () => {
    // In single mode, don't allow new uploads if file exists
    if (!multiple && value.length > 0) return;
    inputRef.current?.click();
  };

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

    if (!multiple) {
      // In single mode, only take the first file
      onChange(newFiles.slice(0, 1));
    } else {
      onChange([...value, ...newFiles]);
    }

    if (inputRef.current) inputRef.current.value = "";
  };

  const removeFile = (index: number) => {
    const updated = value.filter((_, i) => i !== index);
    onChange(updated);
  };

  // In single mode with a file, show the file inline
  const showFileInline = !multiple && value.length > 0;

  return (
    <div className="flex flex-col gap-[var(--spacing-300)] w-full">
      {label && <label className={labelClassName}>{label}</label>}

      {/* Upload area - shows file inline in single mode */}
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
        {showFileInline ? (
          <>
            <span className="truncate flex-1 text-tertiary">
              {value[0].name}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeFile(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.stopPropagation();
                  removeFile(0);
                }
              }}
              className="cursor-pointer hover:text-[var(--terracotta-700)] transition-colors"
            >
              <Trash2 className="icon-size-s text-tertiary hover:text-destructive" />
            </button>
          </>
        ) : (
          <>
            <span className="truncate flex-1 text-disabled">
              Click to upload or drag and drop
            </span>
            <Upload className="icon-size-s text-disabled shrink-0" />
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={onPick}
        />
      </div>

      {/* Uploaded files list - only shown when not in single mode */}
      {multiple && (
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
      )}
    </div>
  );
}