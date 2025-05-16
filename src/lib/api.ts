// src/lib/api.ts
// Define the base URL for the API
// const API_BASE_URL = "https://backend-production-97ab.up.railway.app"; // For Trung deployment
const API_BASE_URL = "https://backend-production-f498.up.railway.app"; // For HiMambo deployment

// const API_BASE_URL = "http://0.0.0.0:8000";

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
  const res = await fetch(`${API_BASE_URL}/experiences`, {
    next: { revalidate: 60 }, // Optional: caching for SSR
  });

  if (!res.ok) {
    throw new Error("Failed to fetch experiences");
  }

  return res.json();
}

export async function fetchExperienceById(id: number): Promise<Experience> {
  console.log(`${API_BASE_URL}/experiences/${id}`);

  const res = await fetch(`${API_BASE_URL}/experiences/${id}`, {
    next: { revalidate: 60 }, // Optional: caching for SSR
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch experience with ID: ${id}`);
  }

  return res.json();
}


export async function createBooking(bookingData: any) {

  console.log(`${API_BASE_URL}/bookings/new`);
  const response = await fetch(`${API_BASE_URL}/bookings/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Booking creation failed')
  }

  return response.json()
}