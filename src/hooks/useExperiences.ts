import { useEffect, useState, useCallback } from "react";
import { type Experience, fetchExperiences } from "@/lib/api";

export function useExperiences() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null)
    try {
      const data = await fetchExperiences();
      setExperiences(data);
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
