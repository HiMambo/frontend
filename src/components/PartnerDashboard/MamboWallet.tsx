// @ts-nocheck
import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from 'react-chartjs-2';
import { 
  FaCcMastercard, 
  FaCcPaypal, 
  FaCcVisa, 
  FaGooglePay, 
  FaApplePay,
  FaEuroSign,
  FaDollarSign,
  FaPoundSign,
  FaBitcoin,
  FaCreditCard,
  FaUniversity,
  FaMoneyBillWave
} from 'react-icons/fa';
import { SiSololearn } from 'react-icons/si';
import { X as XIcon } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type TimeView = "This Month" | "This Year" | "Forever View";
type PaymentData = {
  totalValue: number;
  totalExperiences: number;
  average: number;
};

type GraphOptions = {
  responsive: boolean;
  plugins: {
    legend: {
      position: 'top' | 'bottom' | 'left' | 'right';
    };
    title: {
      display: boolean;
      text: string;
    };
  };
};

// Experience colors type definition
type ExperienceType = 'Sustainable Safari' | 'Eco Hiking Tour' | 'Green City Tour';

const experienceColors: Record<ExperienceType, string> = {
  'Sustainable Safari': 'bg-green-100 text-green-800',
  'Eco Hiking Tour': 'bg-blue-100 text-blue-800',
  'Green City Tour': 'bg-purple-100 text-purple-800'
} as const;

const currencies = [
  { code: "EUR", flag: "🇪🇺", icon: FaEuroSign },
  { code: "USD", flag: "🇺🇸", icon: FaDollarSign },
  { code: "GBP", flag: "🇬🇧", icon: FaPoundSign },
  { code: "SOL", flag: "◎", icon: SiSololearn },
  { code: "BTC", flag: "₿", icon: FaBitcoin },
];

// Currency dropdown component for reusability
const CurrencyDropdown = ({ 
  selectedCurrency, 
  showDropdown, 
  onSelect, 
  onToggle 
}: { 
  selectedCurrency: { code: string; flag: string }; 
  showDropdown: boolean; 
  onSelect: (currency: typeof currencies[0]) => void; 
  onToggle: () => void; 
}) => (
  <div className="relative">
    <button 
      type="button"
      className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-lg hover:bg-gray-50 border border-gray-200"
      onClick={(e) => {
        e.preventDefault();
        onToggle();
      }}
    >
      {React.createElement(
        currencies.find(c => c.code === selectedCurrency.code)?.icon || FaDollarSign,
        { className: "w-5 h-5 mr-1" }
      )}
      <span className="mr-1">{selectedCurrency.flag}</span>
      <span>{selectedCurrency.code}</span>
      <XIcon className="w-4 h-4 ml-1" />
    </button>
    
    {showDropdown && (
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
        <div className="py-1">
          {currencies.map((currency) => (
            <button 
              key={currency.code}
              className="w-full flex items-center px-4 py-2 hover:bg-gray-50 transition-colors"
              onClick={() => {
                onSelect(currency);
                onToggle();
              }}
            >
              {React.createElement(currency.icon, { className: "w-5 h-5 mr-2" })}
              <span className="mr-2">{currency.flag}</span>
              <span>{currency.code}</span>
            </button>
          ))}
        </div>
      </div>
    )}
  </div>
);

export default function MamboWallet() {
  const [view, setView] = useState<TimeView>("This Month");
  const [isClient, setIsClient] = useState(false); // Track if the component is running on the client
  const [showBankModal, setShowBankModal] = useState(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false); // Add new state for payment method dropdown
  const [showCurrencySelect, setShowCurrencySelect] = useState(false); // Add this line
  const [selectedCurrency, setSelectedCurrency] = useState({ code: "EUR", flag: "🇪🇺" });
  const [amount, setAmount] = useState("300");
  const [showReceiveCurrencySelect, setShowReceiveCurrencySelect] = useState(false);
  const [selectedReceiveCurrency, setSelectedReceiveCurrency] = useState({ code: "BTC", flag: "₿" });
  const [receiveAmount, setReceiveAmount] = useState("0.00303431");
  const [showExpandedTransactions, setShowExpandedTransactions] = useState(false);

  useEffect(() => {
    setIsClient(true); // Set to true once the component is mounted on the client
  }, []);

  useEffect(() => {
    if (showBankModal || showExpandedTransactions) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showBankModal, showExpandedTransactions]);

  const paymentValues: Record<TimeView, PaymentData> = {
    "This Month": { totalValue: 0.11, totalExperiences: 15, average: 21 },
    "This Year": { totalValue: 0.27, totalExperiences: 18, average: 17 },
    "Forever View": { totalValue: 0.53, totalExperiences: 72, average: 16 },
  };

  const cryptoPaymentValues = {
    "This Month": { totalValue: 0.1118, totalExperiences: 120, converted: 10 },
    "This Year": { totalValue: 0.3338, totalExperiences: 250, converted: 33 },
    "Forever View": { totalValue: 0.6565, totalExperiences: 80, converted: 51 },
  };

  const refundValues = {
    "This Month": { totalRefunds: 1, refundRate: 6.67 },
    "This Year": { totalRefunds: 2, refundRate: 6.67 },
    "Forever View": { totalRefunds: 4, refundRate: 6.67 },
  };

  const currentValues = paymentValues[view];
  const currentCryptoValues = cryptoPaymentValues[view];
  const currentRefundValues = refundValues[view];

  const graphData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "All Payments",
        data: Array(12).fill(currentValues.totalValue / 12),
        borderColor: "#FF8C00",
        backgroundColor: "rgba(255, 140, 0, 0.2)",
        tension: 0.4,
      },
      {
        label: "Crypto Payments",
        data: Array(12).fill(currentCryptoValues.totalValue / 12),
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const graphOptions: GraphOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Payments Comparison",
      },
    },
  };

  return (
    <div className={`ml-16 p-8 relative${showBankModal || showExpandedTransactions ? ' overflow-hidden' : ''}`}> {/* Changed from <main> to <div> */}
      {/* Blurred overlay for entire top/profile area when modal is open */}
      {(showBankModal || showExpandedTransactions) && (
        <div className="fixed inset-0 z-30">
          {/* Top/profile blur */}
          <div className="absolute top-0 left-0 w-full h-56 backdrop-blur-sm bg-black/20 transition-all duration-300 ease-in-out pointer-events-none" />
          {/* Main content blur/overlay with click-to-close */}
          <div
            className="absolute inset-0 backdrop-blur-[2px] bg-black/10 transition-all duration-300 ease-in-out cursor-pointer"
            onClick={() => {
              if (showBankModal) setShowBankModal(false);
              if (showExpandedTransactions) setShowExpandedTransactions(false);
            }}
          />
        </div>
      )}
      <header className="mb-8 relative z-40">
        <h2 className="text-3xl font-bold">MamboWallet</h2>
        <div className="flex space-x-4 mt-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              view === "This Month" ? "bg-[#FF8C00] text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setView("This Month")}
          >
            This Month
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              view === "This Year" ? "bg-[#FF8C00] text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setView("This Year")}
          >
            This Year
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              view === "Forever View" ? "bg-[#FF8C00] text-white" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setView("Forever View")}
          >
            Forever View
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* First Row */}
        <div className="bg-white p-6 rounded-lg shadow-md relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">All Payments</h3>
            {/* Info Toggle */}
            <div className="relative group">
              <button
                className="w-6 h-6 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
                type="button"
              >
                ?
              </button>
              <div className="absolute right-0 top-full mt-2 bg-gray-100 p-4 rounded-lg shadow-md text-sm text-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                This card shows the total value of payments, the number of experiences purchased, and the average value per experience.
              </div>
            </div>
          </div>
          <p className="text-4xl font-bold mb-2">
            <span className="text-sm text-blue-600 mr-1">USDC</span>
            {currentValues.totalValue.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">Total Payments Value</p>
          <div className="mt-4 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Total Exp. Purchased:</span>
              <span>{currentValues.totalExperiences.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Average Per Experience:</span>
              <span>
                <span className="text-xs text-blue-600 mr-1">USDC</span>
                {currentValues.average.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Crypto Payments</h3>
            {/* Info Toggle */}
            <div className="relative group">
              <button
                className="w-6 h-6 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
                type="button"
              >
                ?
              </button>
              <div className="absolute right-0 top-full mt-2 bg-gray-100 p-4 rounded-lg shadow-md text-sm text-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                This card shows the total value of crypto payments, the number of experiences purchased, and the total converted to local currency.
              </div>
            </div>
          </div>
          <p className="text-4xl font-bold mb-2">
            <span className="text-sm text-purple-600 mr-1">SOL</span>
            {currentCryptoValues.totalValue.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
          </p>
          <p className="text-sm text-gray-500">Total Payments Value</p>
          <div className="mt-4 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Total Exp. Purchased:</span>
              <span>{currentCryptoValues.totalExperiences.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Converted To Local Currency:</span>
              <span>
                <span className="text-xs text-purple-600 mr-1">SOL</span>
                {currentCryptoValues.converted.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 rounded-xl shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-5"></div>
          <div className="flex justify-between items-center mb-4 relative">
            <h3 className="text-lg font-semibold text-white">Payout</h3>
            <div className="relative group">
              <button
                className="w-6 h-6 flex items-center justify-center bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors"
                type="button"
              >
                ?
              </button>
              <div className="absolute right-0 top-full mt-2 bg-white p-4 rounded-lg shadow-md text-sm text-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                This card allows you to manage payouts to your bank or wallet.
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-4 relative">
            <button 
              className="px-4 py-2.5 bg-white text-green-700 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm font-medium"
              onClick={() => setShowBankModal(true)}
            >
              Send To Bank
            </button>
            
            <div className="flex items-center justify-center gap-2 text-white/90 text-sm">
              <span className="opacity-75">Powered by</span>
              <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-md">
                <span className="font-semibold">Onramper</span>
                <img 
                  src="/onramper.png" 
                  alt="Onramper" 
                  className="h-3.5 w-auto object-contain brightness-0 invert"
                />
              </div>
            </div>
            
            <p className="text-[11px] leading-tight text-white/70 text-center mt-2">
              By clicking 'Send To Bank', you will be able to send your money to your bank or any other preferred destination. You will be also able to select your currency of choice.
            </p>
          </div>
        </div>

        {/* Second Row */}
        <div className="bg-white p-6 rounded-lg shadow-md relative col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Payments Comparison</h3>
            {/* Info Toggle */}
            <div className="relative group">
              <button
                className="w-6 h-6 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
                type="button"
              >
                ?
              </button>
              <div className="absolute right-0 top-full mt-2 bg-gray-100 p-4 rounded-lg shadow-md text-sm text-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                This graph compares your payment trends over time between regular and crypto payments.
              </div>
            </div>
          </div>
          {isClient && <Line data={graphData} options={graphOptions} />}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Payment Methods</h3>
            {/* Info Toggle */}
            <div className="relative group">
              <button
                className="w-6 h-6 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
                type="button"
              >
                ?
              </button>
              <div className="absolute right-0 top-full mt-2 bg-gray-100 p-4 rounded-lg shadow-md text-sm text-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                This card shows the breakdown of payment methods used by customers.
              </div>
            </div>
          </div>
          <div className="mt-4">
            <ul className="space-y-4">
              {/* Add Solana as first item */}
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-white rounded-full shadow-sm">
                    <img 
                      src="/solana.png" 
                      alt="Solana" 
                      className="w-5 h-5"
                      style={{
                        filter: "hue-rotate(220deg) brightness(1.2)",
                        mixBlendMode: "multiply"
                      }}
                    />
                  </div>
                  <span>Solana</span>
                </div>
                <span>45%</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-white rounded-full shadow-sm">
                    <FaCcMastercard className="w-5 h-5 text-[#FF5F00]" />
                  </div>
                  <span>Master Card</span>
                </div>
                <span>20%</span>
              </li>
              {/* Adjust other percentages */}
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-white rounded-full shadow-sm">
                    <FaCcPaypal className="w-5 h-5 text-[#003087]" />
                  </div>
                  <span>PayPal</span>
                </div>
                <span>15%</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-white rounded-full shadow-sm">
                    <FaGooglePay className="w-5 h-5 text-[#5F6368]" />
                  </div>
                  <span>Google Pay</span>
                </div>
                <span>10%</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-white rounded-full shadow-sm">
                    <FaCcVisa className="w-5 h-5 text-[#1A1F71]" />
                  </div>
                  <span>Visa</span>
                </div>
                <span>6%</span>
              </li>
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-white rounded-full shadow-sm">
                    <FaApplePay className="w-5 h-5 text-black" />
                  </div>
                  <span>Apple Pay</span>
                </div>
                <span>4%</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Third Row */}
        <div className="bg-white p-6 rounded-lg shadow-md relative col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Transaction History</h3>
            {/* Info Toggle - Added to match other cards */}
            <div className="relative group">
              <button
                className="w-6 h-6 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
                type="button"
              >
                ?
              </button>
              <div className="absolute right-0 top-full mt-2 bg-gray-100 p-4 rounded-lg shadow-md text-sm text-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                This card shows your recent transactions history and details.
              </div>
            </div>
          </div>

          {/* Grid Container */}
          <div className="pl-0 pr-0"> {/* Remove extra padding for grid alignment */}
            {/* Column Headers */}
            <div className="grid grid-cols-4 gap-0 mb-2 text-xs font-medium text-gray-500">
              <div className="px-4 text-left">Client Name</div>
              <div className="px-4 text-center">Experience Name</div>
              <div className="px-4 text-center">Amount Paid</div>
              <div className="px-4 text-right">Payment Date</div>
            </div>
            {/* Transactions List */}
            <div className="space-y-3">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="grid grid-cols-4 gap-0 items-center py-3 border-b border-gray-100">
                  <div className="flex items-center px-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0 mr-3">
                      <span className="text-lg font-semibold">
                        {index === 0 ? 'JD' : index === 1 ? 'JS' : 'AJ'}
                      </span>
                    </div>
                    <span className="text-xs font-medium">
                      {index === 0 ? 'John Doe' : index === 1 ? 'Jane Smith' : 'Alice Johnson'}
                    </span>
                  </div>
                  <div className="flex justify-center px-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-center ${
                      index === 0
                        ? experienceColors["Sustainable Safari"]
                        : index === 1
                        ? experienceColors["Eco Hiking Tour"]
                        : experienceColors["Green City Tour"]
                    }`}>
                      {index === 0 ? 'Sustainable Safari' : index === 1 ? 'Eco Hiking Tour' : 'Green City Tour'}
                    </span>
                  </div>
                  <div className="text-center font-medium text-green-600 text-xs px-4">
                    €{index === 0 ? '200' : index === 1 ? '150' : '300'}
                  </div>
                  <div className="text-right text-xs text-gray-500 px-4">
                    2025-05-{(index + 1).toString().padStart(2, '0')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* See More Button */}
          <div className="flex justify-end mt-6">
            <button 
              className="px-4 py-2 bg-[#FF8C00] text-white rounded-lg hover:bg-[#e67e00] transition-colors"
              onClick={() => setShowExpandedTransactions(true)}
            >
              See More
            </button>
          </div>
        </div>

        {/* Expanded Transactions Modal */}
        {showExpandedTransactions && (
          <>
            {/* Blurred Overlay */}
            <div 
              className="fixed inset-0 backdrop-blur-sm bg-black/30 z-40 transition-all duration-300 ease-in-out"
              onClick={() => setShowExpandedTransactions(false)}
            />
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl w-full">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Transaction History</h3>
                  <button
                    onClick={() => setShowExpandedTransactions(false)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Grid Container */}
                <div className="pl-0 pr-0">
                  {/* Column Headers */}
                  <div className="grid grid-cols-4 gap-0 mb-2 text-xs font-medium text-gray-500">
                    <div className="px-4 text-left">Client Name</div>
                    <div className="px-4 text-center">Experience Name</div>
                    <div className="px-4 text-center">Amount Paid</div>
                    <div className="px-4 text-right">Payment Date</div>
                  </div>
                  <div className="max-h-[60vh] overflow-y-auto space-y-3">
                    {[...Array(8)].map((_, index) => (
                      <div key={index} className="grid grid-cols-4 gap-0 items-center py-3 border-b border-gray-100">
                        <div className="flex items-center px-4">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0 mr-3">
                            <span className="text-lg font-semibold">
                              {index === 0 ? 'JD' : index === 1 ? 'JS' : 'AJ'}
                            </span>
                          </div>
                          <span className="text-xs font-medium">
                            {index === 0 ? 'John Doe' : index === 1 ? 'Jane Smith' : 'Alice Johnson'}
                          </span>
                        </div>
                        <div className="flex justify-center px-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-center ${
                            index === 0
                              ? experienceColors["Sustainable Safari"]
                              : index === 1
                              ? experienceColors["Eco Hiking Tour"]
                              : experienceColors["Green City Tour"]
                          }`}>
                            {index === 0 ? 'Sustainable Safari' : index === 1 ? 'Eco Hiking Tour' : 'Green City Tour'}
                          </span>
                        </div>
                        <div className="text-center font-medium text-green-600 text-xs px-4">
                          €{index === 0 ? '200' : index === 1 ? '150' : '300'}
                        </div>
                        <div className="text-right text-xs text-gray-500 px-4">
                          2025-05-{(index + 1).toString().padStart(2, '0')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Refunds</h3>
            {/* Info Toggle */}
            <div className="relative group">
              <button
                className="w-6 h-6 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
                type="button"
              >
                ?
              </button>
              <div className="absolute right-0 top-full mt-2 bg-gray-100 p-4 rounded-lg shadow-md text-sm text-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                This card shows the total refunds and the refund rate compared to total experiences booked.
              </div>
            </div>
          </div>
          <p className="text-4xl font-bold mb-2 text-red-600">-€{currentRefundValues.totalRefunds.toLocaleString()}</p>
          <p className="text-sm text-gray-500">Total Refunds Value</p>
          <div className="mt-4 text-sm text-gray-600">
            <div className="flex justify-between mb-2">
              <span>Total Refunds:</span>
              <span className="text-red-600">{currentRefundValues.totalRefunds}</span>
            </div>
            <div className="flex justify-between">
              <span>Refunds Rate / Experiences:</span>
              <span className="text-red-600">{currentRefundValues.refundRate}%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bank Details Modal */}
      {showBankModal && (
        <>
          <div 
            className="fixed inset-0 backdrop-blur-sm bg-black/30 z-40 transition-all duration-300 ease-in-out"
            onClick={() => setShowBankModal(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-[#f7f7f7] rounded-2xl shadow-2xl p-6 max-w-md w-full animate-modalEntry relative my-auto">
              {/* Close Button */}
              <button
                onClick={() => setShowBankModal(false)}
                className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <XIcon className="w-6 h-6" />
              </button>

              <form className="space-y-6" onSubmit={(e) => {
                e.preventDefault();
                // Handle form submission here
              }}>
                {/* Amount Input */}
                <div className="space-y-2">
                  <label className="block text-sm text-gray-600">You send</label>
                  <div className="flex items-center bg-white rounded-xl p-3 border border-gray-200">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full text-xl focus:outline-none"
                      min="0"
                      step="0.01"
                    />
                    <CurrencyDropdown 
                      selectedCurrency={selectedCurrency} 
                      showDropdown={showCurrencySelect} 
                      onSelect={(currency) => setSelectedCurrency(currency)} 
                      onToggle={() => setShowCurrencySelect(!showCurrencySelect)} 
                    />
                  </div>
                </div>

                {/* Received Amount */}
                <div className="space-y-2">
                  <label className="block text-sm text-gray-600">You receive</label>
                  <div className="flex items-center bg-white rounded-xl p-3 border border-gray-200">
                    <input
                      type="number"
                      value={receiveAmount}
                      onChange={(e) => setReceiveAmount(e.target.value)}
                      className="w-full text-xl focus:outline-none"
                      min="0"
                      step="0.00000001"
                    />
                    <CurrencyDropdown 
                      selectedCurrency={selectedReceiveCurrency} 
                      showDropdown={showReceiveCurrencySelect} 
                      onSelect={(currency) => setSelectedReceiveCurrency(currency)} 
                      onToggle={() => setShowReceiveCurrencySelect(!showReceiveCurrencySelect)} 
                    />
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div className="space-y-2 relative">
                  <label className="block text-sm text-gray-600">Destination</label>
                  <button 
                    type="button"
                    className="w-full flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200 hover:border-gray-300"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPaymentMethods(!showPaymentMethods);
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <FaCreditCard className="w-6 h-6 text-gray-700" />
                      <span>Revolut Pay</span>
                      <span className="text-green-500 text-sm">Recommended</span>
                    </div>
                    <XIcon className={`w-4 h-4 transition-transform ${showPaymentMethods ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Payment Methods Dropdown */}
                  {showPaymentMethods && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-80 overflow-y-auto">
                      <div className="p-4 border-b border-gray-100">
                        <h3 className="font-medium">Select payment method</h3>
                      </div>
                      <div className="py-2">
                        <button className="w-full flex items-center px-4 py-3 hover:bg-gray-50">
                          <FaCreditCard className="w-6 h-6 mr-3 text-gray-700" />
                          <span>Revolut Pay</span>
                          <span className="ml-2 text-sm text-green-500">Recommended</span>
                        </button>
                        <button className="w-full flex items-center px-4 py-3 hover:bg-gray-50">
                          <FaApplePay className="w-6 h-6 mr-3 text-black" />
                          <span>Apple Pay</span>
                        </button>
                        <button className="w-full flex items-center px-4 py-3 hover:bg-gray-50">
                          <FaCcMastercard className="w-6 h-6 mr-3 text-[#FF5F00]" />
                          <span>Credit Card</span>
                        </button>
                        <button className="w-full flex items-center px-4 py-3 hover:bg-gray-50">
                          <FaMoneyBillWave className="w-6 h-6 mr-3 text-green-600" />
                          <span>Sofort</span>
                        </button>
                        <button className="w-full flex items-center px-4 py-3 hover:bg-gray-50">
                          <FaUniversity className="w-6 h-6 mr-3 text-blue-600" />
                          <span>Dutch Instant Bank Transfer</span>
                        </button>
                        <button className="w-full flex items-center px-4 py-3 hover:bg-gray-50">
                          <FaCcPaypal className="w-6 h-6 mr-3 text-[#003087]" />
                          <span>PayPal</span>
                        </button>
                        <button className="w-full flex items-center px-4 py-3 hover:bg-gray-50">
                          <FaCcVisa className="w-6 h-6 mr-3 text-[#1A1F71]" />
                          <span>Debit Card</span>
                        </button>
                        <button className="w-full flex items-center px-4 py-3 hover:bg-gray-50">
                          <FaUniversity className="w-6 h-6 mr-3 text-gray-600" />
                          <span>SEPA Bank Transfer</span>
                        </button>
                      </div>
                      <div className="text-center text-sm text-gray-500 py-2">
                        Powered by Onramper
                      </div>
                    </div>
                  )}
                </div>

                <button 
                  type="submit"
                  className="w-full px-4 py-4 bg-black text-white rounded-xl text-lg font-medium hover:bg-gray-800 transition-colors duration-200"
                >
                  Send
                </button>
                <div className="text-center text-sm text-gray-500">
                  Powered by Onramper
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}