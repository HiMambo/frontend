import ExperienceCard from "@/components/ExperienceCard/ExperienceCard";
import { Experience } from "@/lib/api";
import { SkeletonCard } from "../shared/SkeletonCard";
import { useFilter } from "@/context/FilterContext";
import { useSearch } from "@/context/SearchContext";
import { Button } from "../ui/button";
import ErrorMessage from "../shared/ErrorMessage";

interface ExperienceListProps {
  experiences: Experience[];
  loading: boolean;
  error: string | null;
  noResultsForGivenFilters: boolean;
  noSearchResults: boolean;
  view: "grid" | "list";
}

export default function ExperienceList({ 
  experiences,
  loading,
  error,
  noResultsForGivenFilters,
  noSearchResults,
  view 
}: ExperienceListProps) {
  const { resetAllFilters } = useFilter();
  const { resetSearch } = useSearch();

  const layoutClass =
    view === "grid"
      ? "grid grid-cols-2 gap-x-[var(--spacing-1600)] gap-y-[var(--spacing-2400)]"
      : "flex flex-col gap-[var(--spacing-1200)]";

  if (loading) {
    return (
      <div className={layoutClass}>
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} index={index} view={view} />
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (noSearchResults) {
    return (
      <div className="text-center text-muted-foreground mt-8">
        <p className="text-lg font-medium">No experiences found for your search.</p>
        <p className="text-sm mt-1">Try adjusting your search.</p>
        <Button
          onClick={resetSearch}
          className="mt-4 px-4 py-2 font-semibold rounded"
          variant="outline"
        >
          Show everything
        </Button>
      </div>
    );
  }

  if (noResultsForGivenFilters) {
    return (
      <div className="text-center text-muted-foreground mt-8">
        <p className="text-lg font-medium">No experiences match the selected filters.</p>
        <p className="text-sm mt-1">Try adjusting or resetting the filters.</p>
        <Button
          onClick={resetAllFilters}
          className="mt-4 px-4 py-2 font-semibold rounded"
          variant="outline"
        >
          Reset All Filters
        </Button>
      </div>
    );
  }

  return (
    <div className={layoutClass}>
      {experiences.map((experience) => (
        <ExperienceCard key={experience.id} experience={experience} view={view} />
      ))}
    </div>
  );
}
