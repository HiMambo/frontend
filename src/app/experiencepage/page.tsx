"use client";
import { useExperiences } from "@/hooks/useExperiences";
import type { Experience } from "@/lib/api";
import { useState } from "react";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header/Header";
import SearchBox from "@/components/HomePage/SearchBox";
import { SearchControls } from "@/components/ExperiencesPage/SearchControls";
import FilterToggleWrapper from "@/components/ExperiencesPage/FilterToggleWrapper";
import ExperienceList from "@/components/ExperiencesPage/ExperienceList";
import FilterSidebar from "@/components/ExperiencesPage/FilterSidebar";
import { FilterProvider, useFilter } from "@/context/FilterContext";
import { useSearch } from "@/context/SearchContext";

function MainContent({
  view,
  sortBy,
  experiences,
  loading,
  error,
}: {
  view: "list" | "grid";
  sortBy: string;
  experiences: Experience[];
  loading: boolean;
  error: string | null;
}) {
  const { filteredExperiences } = useFilter();
  
  const noSearchResults = !loading && experiences.length === 0;
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
        return 0;
    }
  });

  return (
    <>
      {/* Mobile / toggleable filters */}
      <FilterToggleWrapper>
        <FilterSidebar />
      </FilterToggleWrapper>

      {/* Desktop layout */}
      <div
        className={`hidden lg:flex ${
          view === "list"
            ? "gap-[var(--spacing-2400)]"
            : "gap-[var(--spacing-4000)]"
        }`}
      >
        {/* Sidebar */}
        <aside className="flex-shrink-0 w-[var(--width-filtersidebar)]">
          <FilterSidebar />
        </aside>

        {/* Experience List */}
        <section className="flex-grow">
          <ExperienceList
            view={view}
            experiences={sortedExperiences}
            loading={loading}
            error={error}
            noResultsForGivenFilters={noResultsForGivenFilters}
            noSearchResults={noSearchResults}
          />
        </section>
      </div>
    </>
  );
}

export default function ExperiencePage() {
  const [view, setView] = useState<"list" | "grid">("list");
  const [sortBy, setSortBy] = useState("Best Match");

  const { searchParams } = useSearch();
  const { experiences, loading, error } = useExperiences(searchParams);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main content wrapper */}
      <div className="flex-grow bg-surface">
        <FilterProvider experiences={experiences}>
          {/* spacing-4000 gap */}
          <div className="pt-[var(--spacing-4000)]">
            {/* Heading */}
            <h2 className="heading-h2 text-secondary text-center">
              Start your sustainable adventure!
            </h2>
          </div>

          {/* spacing-1600 gap */}
          <div className="pt-[var(--spacing-1600)]">
            {/* Search Box */}
            <SearchBox />
          </div>

          {/* spacing-1600 gap */}
          <div className="pt-[var(--spacing-1600)] px-[var(--spacing-2400)] pb-[var(--spacing-1200)]">
            {/* Search Controls - aligned right */}
            <div className="flex justify-end">
              <SearchControls
                view={view}
                setView={setView}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            </div>
          </div>

          {/* spacing-1200 gap */}
          <div className="pt-[var(--spacing-1200)] py-[var(--spacing-2400)] px-[var(--spacing-2400)]">
            {/* Filter and Experience Cards Section */}
            <MainContent
              view={view}
              sortBy={sortBy}
              experiences={experiences}
              loading={loading}
              error={error}
            />
          </div>
        </FilterProvider>
      </div>

      <div className="pt-[var(--spacing-4000)] bg-surface">
        <Footer />
      </div>
    </div>
  );
}