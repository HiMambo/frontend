import { fetchOnboardingProgress } from "@/lib/api";
import { useEffect, useState, useCallback } from "react";

export function useOnboardingProgress() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialCompletedSteps, setInitialCompletedSteps] = useState<number[]>([])

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log("Fetching completed steps from backend...")
      const data = await fetchOnboardingProgress();
      setInitialCompletedSteps(data);
      console.log("Fetched completed steps from backend:", initialCompletedSteps)
    } catch (err) {
      console.error("Error fetching onboarding progress:", err);
      setError("Failed to load onboarding progress. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { loading, error, initialCompletedSteps, refetch: fetchData };
}