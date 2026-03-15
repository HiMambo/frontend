"use client";

import { useState } from "react";
import Image from "next/image";

export default function FileUploadField({ label }: { label: string }) {
  const [file, setFile] = useState<File | null>(null);
  const inputId = label.replace(/\s+/g, "-").toLowerCase();

  return (
    <div>
      <label className="text-sm font-medium text-[#4A2C2A]">{label}</label>
      {!file ? (
        <div className="mt-2">
          <input
            id={inputId}
            type="file"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
            }}
          />
          <label
            htmlFor={inputId}
            className="block w-full cursor-pointer p-3 rounded-lg border border-dashed border-neutral-300 text-sm text-neutral-500 bg-white hover:bg-neutral-50 text-center"
          >
            + Upload File
          </label>
        </div>
      ) : (
        <div className="mt-2 flex items-center justify-between bg-[#f5f3ef] border rounded-lg px-3 py-2">
          <span className="text-sm text-neutral-700 font-medium truncate max-w-[150px]">
            {file.name}
          </span>
          <div className="flex items-center gap-3">
            <button onClick={() => setFile(null)} className="text-neutral-500 hover:text-red-600">
              <Image src="/assets/trash.svg" alt="Delete" width={20} height={20} />
            </button>
            <a
              href={URL.createObjectURL(file)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              Click to view →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
