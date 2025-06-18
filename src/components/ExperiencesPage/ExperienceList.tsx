import ExperienceCard from "@/components/ExperienceCard/ExperienceCard";
import { Experience } from "@/types/experience";
import { SkeletonCard } from "../shared/SkeletonCard";
import { AlertCircle } from "lucide-react";

interface ExperienceListProps {
  experiences: Experience[];
  loading: boolean;
  error: string | null;
  view: "grid" | "list";
}

export default function ExperienceList({ experiences, loading, error, view }: ExperienceListProps) {
  const layoutClass =
    view === "grid"
      ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
      : "flex flex-col gap-6";

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
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <h2 className="text-lg font-semibold text-gray-800">{error}</h2>
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
