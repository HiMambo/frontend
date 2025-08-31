"use client";

import React, { useState } from "react";
import AccountStepper from "../PartnerOnboarding/AccountStepper";
import Image from "next/image";
import { BrandDropdown } from "../brand";

function FileUploadField({ label }: { label: string }) {
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
              if (e.target.files && e.target.files[0]) {
                setFile(e.target.files[0]);
              }
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
            <button
              onClick={() => setFile(null)}
              className="text-neutral-500 hover:text-red-600"
            >
              <Image src="/assets/trash.svg" alt="Delete" width={38} height={38} />
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


export default function PartnerDashboard() {


  const steps = [
    "Account Verification",
    "Wallet Setup",
    "Calendar Setup",
    "Go Online",
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-6">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">
            Welcome to Your Himambo Partner Dashboard
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            Manage your partnership, update your business information, and
            follow your metrics—all in one place.
          </p>
        </div>

        <div className="mb-8">
          <AccountStepper steps={steps} activeIndex={1} />
        </div>

        <div className="flex items-center justify-between bg-[#f9f6f1] rounded-2xl p-6 mb-8">
          <div>
            <p className="text-lg font-semibold text-[#4A2C2A] mb-4">
              Only 2 steps left before you can list your experiences and start
              reaching new customers.
            </p>
            <div className="flex items-center gap-4">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-xl transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2v-4zm0 0l-3.5 2.5M21 12l-3.5-2.5"
                  />
                </svg>
                Wallet Setup
              </button>
              <button className="text-neutral-400 font-medium">Not now</button>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-teal-600 font-bold text-xl bg-teal-100 border-4 border-neutral-200">
              EM
            </div>
            <svg
              className="absolute w-20 h-20 rotate-[-90deg]"
              viewBox="0 0 36 36"
            >
              <path
                d="M18 2a16 16 0 1 1-0.0001 32A16 16 0 0 1 18 2"
                fill="none"
                stroke="#00BFA6"
                strokeWidth="4"
                strokeDasharray="25 100"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute -bottom-1 -right-1 bg-yellow-300 border-2 border-white p-1 rounded-md shadow">
              <Image src="/assets/camera.svg" alt="Camera" width={20} height={20} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="w-full bg-[#f8f4ef] rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-[#4A2C2A] mb-2">
              Business Details
            </h2>
            <p className="text-sm text-neutral-600 mb-6">
              Add, edit, or remove Business Details you want to showcase on the
              Partner site.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-sm font-medium text-[#4A2C2A]">
                  Business Name *
                </label>
                <div className="flex items-center mt-1 px-3 py-2 bg-white rounded-lg border">
                  <Image
                    src="/assets/store.svg"
                    alt="Business Icon"
                    width={16}
                    height={16}
                    className="mr-2"
                  />
                  <input
                    type="text"
                    defaultValue="HiMambo"
                    className="flex-1 text-sm text-[#C2BDAF] font-bold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#4A2C2A]">
                  Business Website *
                </label>
                <div className="flex items-center mt-1 px-3 py-2 bg-white rounded-lg border">
                  <Image
                    src="/assets/website.svg"
                    alt="Website Icon"
                    width={16}
                    height={16}
                    className="mr-2"
                  />
                  <input
                    type="text"
                    defaultValue="www.himambo.com"
                    className="flex-1 text-sm text-[#C2BDAF] font-bold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#4A2C2A]">
                  Business Address *
                </label>
                <div className="flex items-center mt-1 px-3 py-2 bg-white rounded-lg border">
                  <Image
                    src="/assets/location.svg"
                    alt="Map Icon"
                    width={16}
                    height={16}
                    className="mr-2"
                  />
                  <input
                    type="text"
                    defaultValue="Somewhere 33"
                    className="flex-1 text-sm text-[#C2BDAF] font-bold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#4A2C2A]">
                  Main country of operation *
                </label>
                <div className="flex items-center mt-1 px-3 py-2 bg-white rounded-lg border">
                  <input
                    type="text"
                    defaultValue="Germany"
                    className="flex-1 text-sm text-[#C2BDAF] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#4A2C2A]">
                  Year Founded *
                </label>
                <div className="flex items-center mt-1 px-3 py-2 bg-white rounded-lg border">
                  <Image
                    src="/assets/calendar.svg"
                    alt="Calendar Icon"
                    width={16}
                    height={16}
                    className="mr-2"
                  />
                  <input
                    type="text"
                    defaultValue="2024"
                    className="flex-1 text-sm text-[#C2BDAF] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#4A2C2A]">
                  Select Category *
                </label>
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

            <h3 className="text-lg font-semibold text-[#4A2C2A] mb-2">
              Want more visibility?
            </h3>
            <p className="text-sm text-neutral-600 mb-4">
              Add your social media links here to showcase your brand, connect
              with customers, and grow your audience.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Instagram", icon: "instagram.svg" },
                { label: "Facebook", icon: "facebook.svg" },
                { label: "X (twitter)", icon: "twitter.svg" },
                { label: "Tiktok", icon: "tiktok.svg" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-center px-3 py-2 bg-white rounded-lg border"
                >
                  <Image
                    src={`/assets/${s.icon}`}
                    alt={s.label}
                    width={16}
                    height={16}
                    className="mr-2"
                  />
                  <input
                    type="text"
                    placeholder="@himambo"
                    className="flex-1 text-sm text-neutral-700 focus:outline-none"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-xl transition">
                <Image
                  src="/assets/refresh.svg"
                  alt="Update Icon"
                  width={18}
                  height={18}
                />
                Update Information
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="bg-[#f8f4ef] rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-[#4A2C2A] mb-2">
                Contact Information
              </h2>
              <p className="text-sm text-neutral-600 mb-6">
                If someone new is managing your Himambo account, please update
                the contact person’s name, email, and phone number below.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-sm font-medium text-[#4A2C2A]">
                    Full Name *
                  </label>
                  <div className="flex items-center mt-1 px-3 py-2 bg-white rounded-lg border">
                    <input
                      type="text"
                      defaultValue="Enrique Maldonado"
                      className="flex-1 text-sm text-[#C2BDAF] font-bold focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#4A2C2A]">
                    Phone Number *
                  </label>
                  <div className="flex items-center mt-1 px-3 py-2 bg-white rounded-lg border">
                    <input
                      type="tel"
                      defaultValue="+49 254 338 76 984"
                      className="flex-1 text-sm text-[#C2BDAF] font-bold focus:outline-none"
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-[#4A2C2A]">
                    Email *
                  </label>
                  <div className="flex items-center mt-1 px-3 py-2 bg-white rounded-lg border">
                    <input
                      type="email"
                      defaultValue="enrique@himambo.com"
                      className="flex-1 text-sm text-[#C2BDAF] font-bold focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#4A2C2A]">
                    What is your role *
                  </label>
                  <select className="mt-1 w-full px-3 py-2 bg-white rounded-lg border text-sm text-neutral-700 focus:outline-none">
                    <option>Select Role</option>
                    <option>Owner</option>
                    <option>Manager</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#4A2C2A]">
                    Languages
                  </label>
                  <div className="flex items-center mt-1 px-3 py-2 bg-white rounded-lg border">
                    <input
                      type="text"
                      defaultValue="Spanish"
                      className="flex-1 text-sm text-[#C2BDAF] font-bold focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-xl transition">
                Update Information
              </button>
            </div>

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
                    className="p-3 rounded-lg border text-sm text-[#C2BDAF] font-bold focus:outline-none mt-2 bg-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#4A2C2A]">
                    Staff Employment Breakdown *
                  </label>
                  <input
                    type="text"
                    defaultValue="% of local staff, diversity and inclusion measures."
                    className="p-3 rounded-lg border text-sm text-[#C2BDAF] font-bold focus:outline-none mt-2 bg-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#4A2C2A]">
                    Accessibility Efforts *
                  </label>
                  <textarea
                    rows={3}
                    defaultValue="Describe accessibility features and inclusive practices."
                    className="p-3 rounded-lg border text-sm text-[#C2BDAF] font-bold focus:outline-none mt-2 bg-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#4A2C2A]">
                    Additional Information
                  </label>
                  <textarea
                    rows={3}
                    defaultValue="Add more sustainability-related notes."
                    className="p-3 rounded-lg border text-sm text-[#C2BDAF] font-bold focus:outline-none mt-2 bg-white"
                  />
                </div>

                <FileUploadField label="Partnership or NGOs Letters" />
                <FileUploadField label="Certifications or Awards" />
              </div>

              <button className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-xl transition">
                <Image
                  src="/assets/refresh.svg"
                  alt="Update Icon"
                  width={18}
                  height={18}
                />
                Update Information
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
