import { useState, useEffect } from "react";

export function usePersistentState<T>(key: string, initialValue: T, expiryMs?: number): [T, React.Dispatch<React.SetStateAction<T>>, boolean] {
  const [state, setState] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (!expiryMs || Date.now() - parsed.savedAt < expiryMs) {
          setState(parsed.value as T);
        } else {
          localStorage.removeItem(key);
        }
      }
    } catch {
      localStorage.removeItem(key);
    } finally {
      setHydrated(true);
    }
  }, [key, expiryMs]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        key,
        JSON.stringify({ value: state, savedAt: Date.now() })
      );
    } catch {
      // Fail silently in SSR or quota exceeded
    }
  }, [key, state, hydrated]);

  return [state, setState, hydrated];
}
