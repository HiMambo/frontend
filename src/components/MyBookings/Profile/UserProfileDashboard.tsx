"use client";

import { useEffect, useState } from "react";
import FavoritesCard from "./FavoritesCard";
import ProfileCard from "./ProfileCard";
import TransactionHistory from "./TransactionHistory";

// type PaymentMethod = "credit-card" | "paypal" | "crypto";

// type PaymentDetailsForm = {
//   cardNumber?: string;
//   expiryDate?: string;
//   cvv?: string;
//   paypalEmail?: string;
//   cryptoAddress?: string;
// };

// type PastExperience = {
//   name: string;
//   date: string;
//   amount: number;
//   location: string;
// };
type TransactionApiResponse = {
  partner_name: string;
  experience_name: string;
  total_price: number;
  experience_date: string;
  booking_date: string;
  status?: string;
};
type FavoritePartner = {
  name: string;
  location: string;
  rating: number;
  profilePic: string;
};

type FavoriteExperience = {
  name: string;
  location: string;
  price: number;
  image: string;
};

type Transaction = {
  name: string;
  experience: string;
  amount: number;
  experienceDate: string;
  paymentDate: string;
  status?: string;
};

export default function UserProfileDashboard() {
  const [profile, setProfile] = useState({
    name: "Enrique Maldonado",
    email: "enrique@ghimambo.com",
    password: "",
    profilePic: "/profile.jpg",
  });
  const [editing, setEditing] = useState(false);

  // const [showPaymentMenu, setShowPaymentMenu] = useState(false);
  // const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(
  //   null
  // );
  // const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  // const [paymentDetails, setPaymentDetails] = useState<PaymentDetailsForm>({});

  // const [showPastExperiences, setShowPastExperiences] = useState(false);
  // const [showUpcomingExperiences, setShowUpcomingExperiences] = useState(false);

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  // const [resetEmail, setResetEmail] = useState("");

  const [showFavoritePartners, setShowFavoritePartners] = useState(false);
  const [showFavoriteExperiences, setShowFavoriteExperiences] = useState(false);

  const [showAllTransactions, setShowAllTransactions] = useState(false);

  const [loading, setLoading] = useState(true); 
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([]);
  console.log(
    showForgotPassword,
    showFavoritePartners,
    showFavoriteExperiences
  );

  // const [upcomingExperiencesList] = useState([
  //   { name: "Eco Mountain Trek", date: "2025-06-15" },
  //   { name: "Sustainable Urban Tour", date: "2025-07-01" },
  // ]);

  // const [pastExperiencesList] = useState<PastExperience[]>([
  //   {
  //     name: "Green City Tour",
  //     date: "2025-04-15",
  //     amount: 150,
  //     location: "Barcelona",
  //   },
  //   {
  //     name: "Eco Hiking Tour",
  //     date: "2025-03-20",
  //     amount: 200,
  //     location: "Alps",
  //   },
  //   {
  //     name: "Sustainable Safari",
  //     date: "2025-02-10",
  //     amount: 300,
  //     location: "Kenya",
  //   },
  // ]);

  const [favoritePartners] = useState<FavoritePartner[]>([
    {
      name: "EcoVentures Ltd",
      location: "Barcelona",
      rating: 4.8,
      profilePic: "/partner1.jpg",
    },
    {
      name: "Green Tours Co",
      location: "Alps",
      rating: 4.9,
      profilePic: "/partner2.jpg",
    },
    {
      name: "Sustainable Safaris",
      location: "Kenya",
      rating: 5.0,
      profilePic: "/partner3.jpg",
    },
  ]);

  const [favoriteExperiences] = useState<FavoriteExperience[]>([
    {
      name: "Mountain Eco Trek",
      location: "Swiss Alps",
      price: 299,
      image: "/exp1.jpg",
    },
    {
      name: "Urban Green Tour",
      location: "Barcelona",
      price: 149,
      image: "/exp2.jpg",
    },
    {
      name: "Wildlife Safari",
      location: "Kenya",
      price: 399,
      image: "/exp3.jpg",
    },
  ]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          "https://backend-production-f498.up.railway.app/clients/5/bookings"
        );
        const data = await response.json();
        const mappedData = data.map((item: TransactionApiResponse) => ({
          name: item.partner_name,
          experience: item.experience_name,
          amount: item.total_price,
          experienceDate: item.experience_date,
          paymentDate: item.booking_date,
          status: item.status,
        }));
        setAllTransactions(mappedData);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="ml-16 p-8 bg-[#f7f7f7] min-h-screen">
      <header className="mb-8">
        <h2 className="text-3xl font-bold">Profile</h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ProfileCard
          profile={profile}
          editing={editing}
          setProfile={setProfile}
          setEditing={setEditing}
          onForgotPasswordClick={() => setShowForgotPassword(true)}
        />

        <div className="col-span-2 flex flex-col h-full">
          <FavoritesCard
            favoritePartners={favoritePartners}
            favoriteExperiences={favoriteExperiences}
            onShowFavoritePartners={() => setShowFavoritePartners(true)}
            onShowFavoriteExperiences={() => setShowFavoriteExperiences(true)}
          />

          <div className="w-full flex flex-col items-center mb-4">
            <div className="w-full h-px bg-gray-200" />
            <div className="h-2" />
            <div className="w-full flex justify-center">
              <div className="w-full max-w-3xl mx-auto px-4 py-2 bg-yellow-400 border border-yellow-400 rounded-lg shadow-sm flex justify-center">
                <span className="text-base font-semibold text-white">
                  My Bookings
                </span>
              </div>
            </div>
          </div>

          {/* 👇 NEW LOADING SPINNER BEFORE TransactionHistory */}
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <svg
                className="animate-spin h-8 w-8 text-purple-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            </div>
          ) : (
            <TransactionHistory
              allTransactions={allTransactions}
              showAllTransactions={showAllTransactions}
              setShowAllTransactions={setShowAllTransactions}
            />
          )}
        </div>
      </div>
    </div>
  );
}
