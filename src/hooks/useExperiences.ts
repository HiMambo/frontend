import { useEffect, useState, useCallback } from "react";
import { type Experience, fetchExperiences, fetchFilteredExperiences } from "@/lib/api";
import { SearchParams } from "@/context/SearchContext";
import { convertSearchParamsToAPI } from "@/lib/utils";

export function useExperiences(searchParams?: SearchParams) {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      let data: Experience[];
      
      // Only use filtered search if searchParams are passed
      if (searchParams) {
        // Convert SearchParams to API format
        const apiParams = convertSearchParamsToAPI(searchParams);
        console.log("Fetching filtered experiences. apiParams:", apiParams)
        data = await fetchFilteredExperiences(apiParams);
      } else {
        // Fetch all experiences
        console.log("Fetching all experiences.")
        data = await fetchExperiences();
      }
      
      setExperiences(data);
    } catch (err) {
      console.error("Error fetching experiences:", err);
      setError("Failed to load experiences. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { experiences, loading, error, refetch: fetchData };
}