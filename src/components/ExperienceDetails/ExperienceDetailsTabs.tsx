"use client";

import React, { useState } from "react";
import type { Experience } from "@/lib/api";

import { DescriptionTab } from "./DescriptionTab";
import { ItineraryTab } from "./ItineraryTab";
import { GalleryTab } from "./GalleryTab";
import { AboutPartnerTab } from "./AboutPartnerTab";

export interface ExperienceDetailsTabsProps {
  experience: Experience;
}

type TabType = "description" | "itinerary" | "gallery" | "about";

const ExperienceDetailsTabs: React.FC<ExperienceDetailsTabsProps> = ({
  experience,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("description");

  const tabs = [
    { id: "description" as const, label: "Description" },
    { id: "itinerary" as const, label: "Itinerary" },
    { id: "gallery" as const, label: "Gallery" },
    { id: "about" as const, label: "About the partner" },
  ];

  return (
    <div className="flex flex-col gap-[var(--spacing-2400)] px-[var(--spacing-1200)]">
      {/* Tab Navigation Bar */}
      <div className="flex gap-[var(--spacing-2400)]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              body-xl
              transition-colors
              relative
              ${
                activeTab === tab.id
                  ? "underline text-[var(--terracotta-600)] decoration-2 underline-offset-10"
                  : "text-primary hover:underline hover:decoration-2 hover:underline-offset-10 cursor-pointer"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="w-full">
        {activeTab === "description" && <DescriptionTab experience={experience} />}
        {activeTab === "itinerary" && <ItineraryTab experience={experience} />}
        {activeTab === "gallery" && <GalleryTab experience={experience} />}
        {activeTab === "about" && <AboutPartnerTab experience={experience} />}
      </div>
    </div>
  );
};

export default ExperienceDetailsTabs;