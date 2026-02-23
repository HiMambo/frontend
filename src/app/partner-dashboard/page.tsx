"use client";
import MainViewRenderer from "@/components/PartnerDashboard/MainViewRenderer";
import Sidebar from "@/components/PartnerDashboard/Sidebar";
import HeaderRight from "@/components/shared/Header/HeaderRight";
import { useState } from "react";

export default function Home() {
  const [selectedSection, setSelectedSection] = useState("business-page");
  return (
    <div className="min-h-screen flex flex-row bg-[var(--neutral-100)]">
      <Sidebar
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
      />
      <div className="flex-1 relative">
        <div className="flex justify-end px-[var(--spacing-2400)] py-[var(--spacing-600)]">
          <HeaderRight variant="partner-dashboard" />
        </div>
        <div className="p-8">
          <MainViewRenderer selectedSection={selectedSection} />
        </div>
      </div>
    </div>
  );
}