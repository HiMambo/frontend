import { useEffect, useState, useCallback } from "react";
import { fetchExperiences } from "@/lib/api";

export interface Experience {
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

export function useExperiences() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchExperiences();
      setExperiences(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching experiences:", err);
      setError("Failed to load experiences. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { experiences, loading, error, refetch: fetchData };
}
