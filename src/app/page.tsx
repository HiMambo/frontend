"use client";

import { useExperiences } from "@/hooks/useExperiences";
import { useEffect, useState } from "react";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import Search from "@/components/ExperiencesPage/Search";
import { SearchControls } from "@/components/ExperiencesPage/SearchControls";
import { useCart } from "@/context/Cart";

import FilterToggleWrapper from "@/components/ExperiencesPage/FilterToggleWrapper";
import ExperienceList from "@/components/ExperiencesPage/ExperienceList";
import FilterSidebar from "@/components/ExperiencesPage/FilterSidebar";
import { FilterProvider, useFilter } from "@/context/FilterContext";

function MainContent({ view }: { view: "list" | "grid" }) {
  const { filteredExperiences } = useFilter();
  const { loading, error } = useExperiences();

  return (
    <main className="bg-white min-h-screen p-4 sm:p-6 md:p-8 xl:p-12">
      {/* Mobile / toggleable filters */}
      <FilterToggleWrapper>
        <FilterSidebar />
      </FilterToggleWrapper>

      <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-8 gap-4">
        {/* Sidebar for large screens */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="bg-white p-6 text-gray-600 rounded-lg shadow-md w-full">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Filters</h2>
            <FilterSidebar />
          </div>
        </div>

        {/* Experience list */}
        <div className="lg:col-span-3 flex flex-col gap-8">
          <ExperienceList
            experiences={filteredExperiences}
            loading={loading}
            error={error}
            view={view}
          />
        </div>
      </div>
    </main>
  );
}

export default function Home() {
  const [view, setView] = useState<"list" | "grid">("list");
  const { setPax, setBookingDate } = useCart();
  const { experiences, loading, error } = useExperiences();

  useEffect(() => {
    setPax(2);
    const hardcodedDate = new Date("2025-06-13T09:30:00Z");
    setBookingDate(hardcodedDate);
  }, [setPax, setBookingDate]);

  return (
    <>
      <Header />
      <FilterProvider experiences={experiences}>
        <Search />
        <SearchControls view={view} setView={setView} />
        <MainContent view={view} />
      </FilterProvider>
      <Footer />
    </>
  );
}
