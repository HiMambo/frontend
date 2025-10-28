import React from "react";
import { FaBitcoin, FaCreditCard, FaEllipsisV, FaPaypal } from "react-icons/fa";

type PaymentMethod = "credit-card" | "paypal" | "crypto";

type PastExperience = {
  name: string;
  date: string;
  amount: number;
  location: string;
};

type UpcomingExperience = {
  name: string;
  date: string;
};

type BookingsSummaryProps = {
  pastExperiencesList: PastExperience[];
  upcomingExperiencesList: UpcomingExperience[];
  showPastExperiences: boolean;
  setShowPastExperiences: React.Dispatch<React.SetStateAction<boolean>>;
  showUpcomingExperiences: boolean;
  setShowUpcomingExperiences: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPayment: PaymentMethod | null;
  setSelectedPayment: React.Dispatch<
    React.SetStateAction<PaymentMethod | null>
  >;
  showPaymentMenu: boolean;
  setShowPaymentMenu: React.Dispatch<React.SetStateAction<boolean>>;
  showPaymentDetails: boolean;
  setShowPaymentDetails: React.Dispatch<React.SetStateAction<boolean>>;
};

const InfoTooltip = ({ text }: { text: string }) => (
  <div className="relative group">
    <button
      className="w-5 h-5 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors text-xs"
      type="button"
    >
      ?
    </button>
    <div className="absolute right-0 top-full mt-2 bg-gray-100 p-4 rounded-lg shadow-md text-sm text-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 w-48">
      {text}
    </div>
  </div>
);

export default function BookingsSummary({
  pastExperiencesList,
  upcomingExperiencesList,

  setShowPastExperiences,

  setShowUpcomingExperiences,
  selectedPayment,
  setSelectedPayment,
  showPaymentMenu,
  setShowPaymentMenu,

  setShowPaymentDetails,
}: BookingsSummaryProps) {
  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Past Experiences */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="w-full flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold">Past Experiences</h3>
            <InfoTooltip text="View all your completed sustainable experiences and their details." />
          </div>
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => setShowPastExperiences(true)}
          >
            <button
              onClick={() => setShowPastExperiences(true)}
              className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors mb-2"
            >
              {pastExperiencesList.length}
            </button>
            <div className="text-center">
              <div className="text-xs font-medium text-gray-600">
                Completed Experiences
              </div>
              <div className="text-xs text-blue-600">Click to view all</div>
            </div>
          </div>
        </div>

        {/* Upcoming Experiences */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="w-full flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold">Upcoming Experiences</h3>
            <InfoTooltip text="Check your scheduled experiences that are coming up soon." />
          </div>
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => setShowUpcomingExperiences(true)}
          >
            <button
              onClick={() => setShowUpcomingExperiences(true)}
              className="text-2xl font-bold text-green-600 hover:text-green-700 transition-colors mb-2"
            >
              {upcomingExperiencesList.length}
            </button>
            <div className="text-center">
              <div className="text-xs font-medium text-gray-600">
                Scheduled Experiences
              </div>
              <div className="text-xs text-green-600">Click to view all</div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-1">
            <h3 className="text-sm font-semibold">Payment Methods</h3>
            <InfoTooltip text="Manage your payment options including credit card, PayPal, and crypto payments." />
          </div>
          <div className="relative w-full">
            <button
              onClick={() => setShowPaymentMenu(!showPaymentMenu)}
              className="w-full flex items-center justify-between px-3 py-1.5 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                {selectedPayment ? (
                  <>
                    {selectedPayment === "credit-card" && (
                      <FaCreditCard className="text-blue-600 w-4 h-4" />
                    )}
                    {selectedPayment === "paypal" && (
                      <FaPaypal className="text-blue-600 w-4 h-4" />
                    )}
                    {selectedPayment === "crypto" && (
                      <FaBitcoin className="text-orange-500 w-4 h-4" />
                    )}
                    <span className="capitalize text-sm">
                      {selectedPayment.replace("-", " ")}
                    </span>
                  </>
                ) : (
                  <span className="text-sm text-purple-600 font-medium">
                    Select Payment Method
                  </span>
                )}
              </div>
              <FaEllipsisV className="text-gray-400 w-3 h-3" />
            </button>

            {showPaymentMenu && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setSelectedPayment("credit-card");
                      setShowPaymentMenu(false);
                      setShowPaymentDetails(true);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <FaCreditCard className="text-blue-600" />
                    Credit Card
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPayment("paypal");
                      setShowPaymentMenu(false);
                      setShowPaymentDetails(true);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <FaPaypal className="text-blue-600" />
                    PayPal
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPayment("crypto");
                      setShowPaymentMenu(false);
                      setShowPaymentDetails(true);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <FaBitcoin className="text-orange-500" />
                    Crypto
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="mt-4 text-xs text-gray-500">
            Click to change payment method
          </div>
        </div>
      </div>
    </>
  );
}
