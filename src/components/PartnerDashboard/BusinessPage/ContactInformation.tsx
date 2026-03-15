"use client";

import Image from "next/image";


export default function ContactInformation() {
  return (
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
          <label className="text-sm font-medium text-[#4A2C2A]">Full Name *</label>
          <div className="flex items-center mt-1 px-3 py-2 bg-white rounded-lg border">
            <input
              type="text"
              defaultValue="Enrique Maldonado"
              className="flex-1 text-sm text-[#C2BDAF] font-bold focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-[#4A2C2A]">Phone Number *</label>
          <div className="flex items-center mt-1 px-3 py-2 bg-white rounded-lg border">
            <input
              type="tel"
              defaultValue="+49 254 338 76 984"
              className="flex-1 text-sm text-[#C2BDAF] font-bold focus:outline-none"
            />
          </div>
        </div>

        <div className="col-span-2">
          <label className="text-sm font-medium text-[#4A2C2A]">Email *</label>
          <div className="flex items-center mt-1 px-3 py-2 bg-white rounded-lg border">
            <input
              type="email"
              defaultValue="enrique@himambo.com"
              className="flex-1 text-sm text-[#C2BDAF] font-bold focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-[#4A2C2A]">What is your role *</label>
          <select className="mt-1 w-full px-3 py-2 bg-white rounded-lg border text-sm text-neutral-700 focus:outline-none">
            <option>Select Role</option>
            <option>Owner</option>
            <option>Manager</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-[#4A2C2A]">Languages</label>
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
          <Image src="/assets/refresh.svg" alt="Update Icon" width={18} height={18} />
          Update Information
        </button>
    </div>
  );
}
