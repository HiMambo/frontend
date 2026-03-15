"use client";
import { useState } from "react";
import Sidebar from "@/components/MyBookings/Sidebar";
import DashboardContent from "@/components/MyBookings/DashboardContent";
import UserMenu from "@/components/MyBookings/UserMenu";

export default function DashboardLayout() {
  const [selectedSection, setSelectedSection] = useState<string>("user-profile");

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800 flex">
      <Sidebar selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
      <div className="ml-64 flex-1 flex flex-col">
        <UserMenu />
        <main className="flex-1 p-8">
          <DashboardContent selectedSection={selectedSection} />
        </main>
      </div>
    </div>
  );
}
