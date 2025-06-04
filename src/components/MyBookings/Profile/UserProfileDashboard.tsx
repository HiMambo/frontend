import React, { useState } from "react";

import ProfileCard from "./ProfileCard";
import FavoritesCard from "./FavoritesCard";
import BookingsSummary from "./BookingsSummary";
import TransactionHistory from "./TransactionHistory";

type PaymentMethod = 'credit-card' | 'paypal' | 'crypto';

type PaymentDetailsForm = {
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  paypalEmail?: string;
  cryptoAddress?: string;
};

type PastExperience = {
  name: string;
  date: string;
  amount: number;
  location: string;
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

export default function UserProfileDashboard() {
  const [profile, setProfile] = useState({
    name: "Enrique Maldonado",
    email: "enrique@ghimambo.com",
    password: "",
    profilePic: "/profile.jpg",
  });
  const [editing, setEditing] = useState(false);

  const [showPaymentMenu, setShowPaymentMenu] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetailsForm>({});

  const [showPastExperiences, setShowPastExperiences] = useState(false);
  const [showUpcomingExperiences, setShowUpcomingExperiences] = useState(false);

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const [showFavoritePartners, setShowFavoritePartners] = useState(false);
  const [showFavoriteExperiences, setShowFavoriteExperiences] = useState(false);

  const [showAllTransactions, setShowAllTransactions] = useState(false);

  const [upcomingExperiencesList] = useState([
    { name: "Eco Mountain Trek", date: "2025-06-15" },
    { name: "Sustainable Urban Tour", date: "2025-07-01" },
  ]);

  const [pastExperiencesList] = useState<PastExperience[]>([
    { name: "Green City Tour", date: "2025-04-15", amount: 150, location: "Barcelona" },
    { name: "Eco Hiking Tour", date: "2025-03-20", amount: 200, location: "Alps" },
    { name: "Sustainable Safari", date: "2025-02-10", amount: 300, location: "Kenya" },
  ]);

  const [allTransactions] = useState([
    { name: "John Doe", experience: "Sustainable Safari", amount: 200, experienceDate: "2025-06-15", paymentDate: "2025-05-01", status: "upcoming" },
    { name: "Jane Smith", experience: "Eco Hiking Tour", amount: 150, experienceDate: "2025-05-02", paymentDate: "2025-05-02" },
    { name: "Alice Johnson", experience: "Green City Tour", amount: 300, experienceDate: "2025-05-03", paymentDate: "2025-05-03" },
    { name: "Bob Wilson", experience: "Mountain Trek", amount: 250, experienceDate: "2025-05-04", paymentDate: "2025-05-04" },
    { name: "Carol Davis", experience: "Urban Tour", amount: 175, experienceDate: "2025-05-05", paymentDate: "2025-05-05" },
  ]);

  const [favoritePartners] = useState<FavoritePartner[]>([
    { name: "EcoVentures Ltd", location: "Barcelona", rating: 4.8, profilePic: "/partner1.jpg" },
    { name: "Green Tours Co", location: "Alps", rating: 4.9, profilePic: "/partner2.jpg" },
    { name: "Sustainable Safaris", location: "Kenya", rating: 5.0, profilePic: "/partner3.jpg" },
  ]);

  const [favoriteExperiences] = useState<FavoriteExperience[]>([
    { name: "Mountain Eco Trek", location: "Swiss Alps", price: 299, image: "/exp1.jpg" },
    { name: "Urban Green Tour", location: "Barcelona", price: 149, image: "/exp2.jpg" },
    { name: "Wildlife Safari", location: "Kenya", price: 399, image: "/exp3.jpg" },
  ]);

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
                <span className="text-base font-semibold text-white">My Bookings</span>
              </div>
            </div>
          </div>

          <BookingsSummary
            pastExperiencesList={pastExperiencesList}
            upcomingExperiencesList={upcomingExperiencesList}
            showPastExperiences={showPastExperiences}
            setShowPastExperiences={setShowPastExperiences}
            showUpcomingExperiences={showUpcomingExperiences}
            setShowUpcomingExperiences={setShowUpcomingExperiences}
            selectedPayment={selectedPayment}
            setSelectedPayment={setSelectedPayment}
            showPaymentMenu={showPaymentMenu}
            setShowPaymentMenu={setShowPaymentMenu}
            showPaymentDetails={showPaymentDetails}
            setShowPaymentDetails={setShowPaymentDetails}
          />

          <TransactionHistory
            allTransactions={allTransactions}
            showAllTransactions={showAllTransactions}
            setShowAllTransactions={setShowAllTransactions}
          />
        </div>
      </div>
    </div>
  );
}
