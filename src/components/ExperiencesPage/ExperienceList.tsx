import { Loader2 } from "lucide-react";
import ExperienceCard from "@/components/ExperienceCard";

interface Experience {
  id: number;
  name: string;
  experience_description: string;
  experience_price: string;
  experience_promo_image: string;
  experience_city: string;
  experience_country: string;
  rating_avg: number;
  sustainability_goal: string[];
}

interface ExperienceListProps {
  experiences: Experience[];
  loading: boolean;
  error: string | null;
  view: "grid" | "list";
}

export default function ExperienceList({ experiences, loading, error, view }: ExperienceListProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center text-gray-500 py-8 gap-2">
        <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
        <span>Loading experiences...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div
      className={
        view === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
          : "flex flex-col gap-6"
      }
    >
      {experiences.map((exp) => (
        <ExperienceCard
          key={exp.id}
          id={exp.id}
          title={exp.name}
          price={parseFloat(exp.experience_price)}
          location={`${exp.experience_city}, ${exp.experience_country}`}
          image={exp.experience_promo_image}
          description={exp.experience_description}
          discount={null}
          rating={exp.rating_avg}
          sustainabilityGoal={exp.sustainability_goal}
          view={view}
        />
      ))}
    </div>
  );
}
