// src/lib/api.ts
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

export async function fetchExperiences(): Promise<Experience[]> {
  const res = await fetch(
    "https://backend-production-97ab.up.railway.app/experiences",
    {
      next: { revalidate: 60 }, // Optional: caching for SSR
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch experiences");
  }

  return res.json();
}
