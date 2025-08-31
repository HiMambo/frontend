"use client";

import MainViewRenderer from "@/components/PartnerDashboard/MainViewRenderer";
import Sidebar from "@/components/PartnerDashboard/Sidebar";
import TopNav from "@/components/PartnerDashboard/TopNav";
import { useState } from "react";

export default function Home() {
  const [selectedSection, setSelectedSection] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
      {/* Sidebar */}
      <Sidebar
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
      />

      {/* Main Content Wrapper */}
      <div className="ml-64 relative">
        {/* Top Navigation Bar */}
        <TopNav />

        {/* Main Section Content */}
        <div className="p-8">
          <MainViewRenderer selectedSection={selectedSection} />
        </div>
      </div>
    </div>
  );
}
