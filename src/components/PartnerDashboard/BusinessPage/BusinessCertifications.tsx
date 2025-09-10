"use client";

import FileUploadField from "./FileUploadField";
import Image from "next/image";

export default function BusinessCertifications() {
  return (
    <div className="bg-[#f8f4ef] rounded-2xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-[#4A2C2A] mb-2">
        Business Certifications
      </h2>
      <p className="text-sm text-neutral-600 mb-6">
        Here, you will provide detailed information about your
        sustainable tourism business.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-sm font-medium text-[#4A2C2A]">
            Local Community Inclusion *
          </label>
          <input
            type="text"
            defaultValue="Explain community engagement and benefits."
            className="p-3 rounded-lg border text-sm text-[#C2BDAF] font-bold focus:outline-none mt-2 bg-white w-full"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-[#4A2C2A]">
            Staff Employment Breakdown *
          </label>
          <input
            type="text"
            defaultValue="% of local staff, diversity and inclusion measures."
            className="p-3 rounded-lg border text-sm text-[#C2BDAF] font-bold focus:outline-none mt-2 bg-white w-full"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-[#4A2C2A]">
            Accessibility Efforts *
          </label>
          <textarea
            rows={3}
            defaultValue="Describe accessibility features and inclusive practices."
            className="p-3 rounded-lg border text-sm text-[#C2BDAF] font-bold focus:outline-none mt-2 bg-white w-full"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-[#4A2C2A]">
            Additional Information
          </label>
          <textarea
            rows={3}
            defaultValue="Add more sustainability-related notes."
            className="p-3 rounded-lg border text-sm text-[#C2BDAF] font-bold focus:outline-none mt-2 bg-white w-full"
          />
        </div>

        <FileUploadField label="Partnership or NGOs Letters" />
        <FileUploadField label="Certifications or Awards" />
      </div>

      <button className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-xl transition">
        <Image src="/assets/refresh.svg" alt="Update Icon" width={18} height={18} />
        Update Information
      </button>
    </div>
  );
}
