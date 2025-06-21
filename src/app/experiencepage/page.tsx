"use client";

import { useExperiences } from "@/hooks/useExperiences";
import type { Experience } from "@/lib/api";
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

function MainContent({
  view,
  sortBy,
  experiences,
  loading,
  error,
}: {
  view: "list" | "grid";
  sortBy: string;
  experiences: Experience[]
  loading: boolean;
  error: string | null;
}) {
  const { filteredExperiences } = useFilter();

  const noResultsForGivenFilters =
    !loading && experiences.length > 0 && filteredExperiences.length === 0;

  const sortedExperiences = [...filteredExperiences].sort((a, b) => {
    switch (sortBy) {
      case "Newest":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case "Price: Low to High":
        return Number(a.experience_price) - Number(b.experience_price);
      case "Price: High to Low":
        return Number(b.experience_price) - Number(a.experience_price);
      default:
        return 0; // "Best Match" or unknown – no sorting
    }
  });

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
            <FilterSidebar />
          </div>
        </div>

        {/* Experience list */}
        <div className="lg:col-span-3 flex flex-col gap-8">
          <ExperienceList
            view={view}
            experiences={sortedExperiences}
            loading={loading}
            error={error}
            noResultsForGivenFilters={noResultsForGivenFilters}
          />
        </div>
      </div>
    </main>
  );
}

export default function Home() {
  const [view, setView] = useState<"list" | "grid">("list");
  const [sortBy, setSortBy] = useState("Best Match");

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
        <SearchControls
          view={view}
          setView={setView}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <MainContent
          view={view}
          sortBy={sortBy}
          experiences={experiences}
          loading={loading}
          error={error}
        />
      </FilterProvider>
      <Footer />
    </>
  );
}
