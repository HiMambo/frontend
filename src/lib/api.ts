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
  created_at: string;
  updated_at: string;
}

export async function fetchExperiences(): Promise<Experience[]> {
  console.log("API URL for fetching experiences:");
  console.log(`${API_BASE_URL}/experiences/`); // Added trailing slash
  const res = await fetch(`${API_BASE_URL}/experiences/`, { // Added trailing slash
    next: { revalidate: 60 }, // Optional: caching for SSR
  });
  
  if (!res.ok) {
    throw new Error("Failed to fetch experiences");
  }
  
  return res.json();
}

export async function fetchExperienceById(id: number): Promise<Experience> {
  console.log(`${API_BASE_URL}/experiences/${id}/`); // Added trailing slash
  const res = await fetch(`${API_BASE_URL}/experiences/${id}/`, { // Added trailing slash
    next: { revalidate: 60 }, // Optional: caching for SSR
  });
  
  if (!res.ok) {
    throw new Error(`Failed to fetch experience with ID: ${id}`);
  }
  
  return res.json();
}

// Define the type for booking data
export interface BookingData {
  experience_id: number;
  booking_date: string;
  client_id: number;
  duration_days: number;
  number_of_people: number;
  total_price: number;
  created_at: string;
  updated_at: string;
  discount: number;
  currency: string;
  experience_date: string;
  payment_type: string;
  confirmation_code: string;
  status: string;
}

export async function createBooking(bookingData: BookingData) {
  console.log(`${API_BASE_URL}/bookings/new/`); // Added trailing slash
  const response = await fetch(`${API_BASE_URL}/bookings/new/`, { // Added trailing slash
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


// Define the partner finance info
export interface PartnerFinanceInfo {
  experience_id:  number;
  total_payments_USDC: number;
  total_payments_SOL: number;
}

export async function fetchTotalPaymentPartnerById(id: number): Promise<PartnerFinanceInfo> {
  const URL_CALL = `${API_BASE_URL}/partners/${id}/get_total_payments`
  console.log(URL_CALL);

  const res = await fetch(URL_CALL, {
    next: { revalidate: 60 }, // Optional: caching for SSR
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch experience with ID: ${id}`);
  }

  return res.json();
}
