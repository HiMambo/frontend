"use client";

import BrandDropdown from "@/components/brand/BrandDropdown";
import Image from "next/image";

export default function BusinessDetails() {
  return (
    <div className="w-full bg-[#f8f4ef] rounded-2xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-[#4A2C2A] mb-2">Business Details</h2>
      <p className="text-sm text-neutral-600 mb-6">
        Add, edit, or remove Business Details you want to showcase on the Partner site.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-sm font-medium text-[#4A2C2A]">Business Name *</label>
          <div className="flex items-center mt-1 px-3 py-2 bg-white rounded-lg border">
            <Image src="/assets/store.svg" alt="Business Icon" width={16} height={16} className="mr-2" />
            <input type="text" defaultValue="HiMambo"
              className="flex-1 text-sm text-[#C2BDAF] font-bold focus:outline-none" />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-[#4A2C2A]">Business Website *</label>
          <div className="flex items-center mt-1 px-3 py-2 bg-white rounded-lg border">
            <Image src="/assets/website.svg" alt="Website Icon" width={16} height={16} className="mr-2" />
            <input type="text" defaultValue="www.himambo.com"
              className="flex-1 text-sm text-[#C2BDAF] font-bold focus:outline-none" />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-[#4A2C2A]">Business Address *</label>
          <div className="flex items-center mt-1 px-3 py-2 bg-white rounded-lg border">
            <Image src="/assets/location.svg" alt="Map Icon" width={16} height={16} className="mr-2" />
            <input type="text" defaultValue="Somewhere 33"
              className="flex-1 text-sm text-[#C2BDAF] font-bold focus:outline-none" />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-[#4A2C2A]">Main country of operation *</label>
          <div className="flex items-center mt-1 px-3 py-2 bg-white rounded-lg border">
            <input type="text" defaultValue="Germany"
              className="flex-1 text-sm text-[#C2BDAF] focus:outline-none" />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-[#4A2C2A]">Year Founded *</label>
          <div className="flex items-center mt-1 px-3 py-2 bg-white rounded-lg border">
            <Image src="/assets/calendar.svg" alt="Calendar Icon" width={16} height={16} className="mr-2" />
            <input type="text" defaultValue="2024"
              className="flex-1 text-sm text-[#C2BDAF] focus:outline-none" />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-[#4A2C2A]">Select Category *</label>
          <BrandDropdown
            placeholder="Category"
            className="mt-1"
            label=""
            items={[
              { value: "nature", label: "Adventure & Outdoor" },
              { value: "culture", label: "Cultural Immersion" },
              { value: "adventure", label: "Adventure & Outdoor" },
            ]}
          />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-[#4A2C2A] mb-2">Want more visibility?</h3>
      <p className="text-sm text-neutral-600 mb-4">
        Add your social media links here to showcase your brand, connect with customers, and grow your audience.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {["Instagram", "Facebook", "Twitter", "Tiktok"].map((platform) => (
          <div key={platform} className="flex items-center px-3 py-2 bg-white rounded-lg border">
            <Image src={`/assets/${platform.toLowerCase()}.svg`} alt={platform} width={16} height={16} className="mr-2" />
            <input type="text" placeholder={`@${platform.toLowerCase()}`}
              className="flex-1 text-sm text-neutral-700 focus:outline-none" />
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-xl transition">
          <Image src="/assets/refresh.svg" alt="Update Icon" width={18} height={18} />
          Update Information
        </button>
      </div>
    </div>
  );
}
