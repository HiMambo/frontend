"use client";

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Image from "next/image";
import { X as XIcon } from "lucide-react";
import {
  FaApplePay,
  FaBitcoin,
  FaCcMastercard,
  FaCcPaypal,
  FaCcVisa,
  FaCreditCard,
  FaDollarSign,
  FaEuroSign,
  FaGooglePay,
  FaMoneyBillWave,
  FaPoundSign,
  FaUniversity,
} from "react-icons/fa";
import { SiSololearn } from "react-icons/si";

import { fetchTotalPaymentPartnerById } from "@/lib/api";
import { BrandButton } from "@/components/brand";

import {
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


type TimeView = "This Month" | "This Year" | "Forever View";
type PaymentData = { totalValue: number; totalExperiences: number; average: number };
type PaymentDataCrypto = { totalValue: number; totalExperiences: number; converted: number };
type Transaction = { id: number; partner_name: string; experience_name: string; total_price: number; booking_date: string };


const currencies = [
  { code: "EUR", flag: "🇪🇺", icon: FaEuroSign },
  { code: "USD", flag: "🇺🇸", icon: FaDollarSign },
  { code: "GBP", flag: "🇬🇧", icon: FaPoundSign },
  { code: "SOL", flag: "◎", icon: SiSololearn },
  { code: "BTC", flag: "₿", icon: FaBitcoin },
];

const CurrencyDropdown = ({
  selectedCurrency,
  showDropdown,
  onSelect,
  onToggle,
}: {
  selectedCurrency: { code: string; flag: string };
  showDropdown: boolean;
  onSelect: (currency: (typeof currencies)[0]) => void;
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
        currencies.find((c) => c.code === selectedCurrency.code)?.icon || FaDollarSign,
        { className: "w-5 h-5 mr-1" }
      )}
      <span className="mr-1">{selectedCurrency.flag}</span>
      <span>{selectedCurrency.code}</span>
      <XIcon className="w-4 h-4 ml-1 rotate-45 opacity-60" />
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
  const [isClient, setIsClient] = useState(false);

  const [showBankModal, setShowBankModal] = useState(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [showCurrencySelect, setShowCurrencySelect] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState({ code: "EUR", flag: "🇪🇺" });
  const [amount, setAmount] = useState("300");

  const [showReceiveCurrencySelect, setShowReceiveCurrencySelect] = useState(false);
  const [selectedReceiveCurrency, setSelectedReceiveCurrency] = useState({ code: "BTC", flag: "₿" });
  const [receiveAmount, setReceiveAmount] = useState("0.00303431");

  const [showExpandedTransactions, setShowExpandedTransactions] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [summaryPaymentFiat, setSummaryPaymentFiat] = useState<Record<TimeView, PaymentData>>({
    "This Month": { totalValue: 0.0, totalExperiences: 0, average: 0 },
    "This Year": { totalValue: 0.0, totalExperiences: 0, average: 0 },
    "Forever View": { totalValue: 0.0, totalExperiences: 0, average: 0 },
  });
  const [summaryPaymentCrypto, setSummaryPaymentCrypto] = useState<Record<TimeView, PaymentDataCrypto>>({
    "This Month": { totalValue: 0.0, totalExperiences: 0, converted: 0 },
    "This Year": { totalValue: 0.0, totalExperiences: 0, converted: 0 },
    "Forever View": { totalValue: 0.0, totalExperiences: 0, converted: 0 },
  });

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        setLoading(true);
        const partnerId = 11;
        const data = await fetchTotalPaymentPartnerById(partnerId);

        setSummaryPaymentFiat({
          "This Month": { totalValue: data.total_payments_USDC, totalExperiences: 2, average: 21 },
          "This Year": { totalValue: data.total_payments_USDC, totalExperiences: 18, average: 17 },
          "Forever View": { totalValue: data.total_payments_USDC, totalExperiences: 72, average: 16 },
        });

        setSummaryPaymentCrypto({
          "This Month": { totalValue: data.total_payments_SOL, totalExperiences: 1, converted: 0.35 },
          "This Year": { totalValue: data.total_payments_SOL, totalExperiences: 30, converted: 0.4 },
          "Forever View": { totalValue: data.total_payments_SOL, totalExperiences: 45, converted: 0.2 },
        });

        setError(null);
      } catch {
        setError("Failed to load payment data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const fetchTransactions = async () => {
      try {
        const res = await fetch("https://backend-production-f498.up.railway.app/partners/11/bookings");
        setTransactions(await res.json());
      } catch {}
    };

    fetchPaymentData();
    fetchTransactions();
  }, []);


  const refundValues = {
    "This Month": { totalRefunds: 1, refundRate: 6.67 },
    "This Year": { totalRefunds: 2, refundRate: 6.67 },
    "Forever View": { totalRefunds: 4, refundRate: 6.67 },
  };

  const currentValues = summaryPaymentFiat[view];
  const currentCryptoValues = summaryPaymentCrypto[view];
  const currentRefundValues = refundValues[view];

  const graphData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "All payments",
        data: Array(12).fill(currentValues.totalValue / 12),
        borderColor: "#22c55e",
        backgroundColor: "rgba(34,197,94,0.15)",
        pointRadius: 2,
        tension: 0.35,
      },
      {
        label: "Crypto Payments",
        data: Array(12).fill(currentCryptoValues.totalValue / 12),
        borderColor: "#a855f7",
        backgroundColor: "rgba(168,85,247,0.15)",
        pointRadius: 2,
        tension: 0.35,
      },
    ],
  };

const graphOptions: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: false, text: "" },
  },
  scales: {
    x: {
      grid: { color: "rgba(0,0,0,0.06)" },
      ticks: { color: "#6b7280", font: { size: 10 } },
    },
    y: {
      grid: { color: "rgba(0,0,0,0.06)" },
      ticks: { color: "#6b7280", font: { size: 10 } },
    },
  },
};


  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div
      className={`ml-16 p-8 min-h-screen bg-[#eeefe9] ${
        showBankModal || showExpandedTransactions ? "overflow-hidden" : ""
      }`}
    >
      <header className="mb-6">
        <h2 className="text-3xl font-extrabold text-neutral-800">Mambo Wallet</h2>
        <div className="flex gap-2 mt-4">
          <BrandButton
            onClick={() => setView("This Month")}
            selected={view === 'This Month'}
          >
            Month
          </BrandButton>
          <BrandButton
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              view === "This Year"
                ? "bg-amber-400 text-white"
                : "bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50"
            }`}
            onClick={() => setView("This Year")}
          >
            Year
          </BrandButton>
          <BrandButton
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              view === "Forever View"
                ? "bg-amber-400 text-white"
                : "bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50"
            }`}
            onClick={() => setView("Forever View")}
          >
            Forever view
          </BrandButton>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm relative">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base font-semibold text-neutral-800">All Payments</h3>
            <div className="relative group">
              <button className="w-6 h-6 grid place-items-center bg-neutral-200 text-neutral-700 rounded-full">?</button>
              <div className="absolute right-0 top-full mt-2 bg-white p-3 rounded-xl shadow-xl text-xs text-neutral-700 border border-neutral-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                Total value of payments and average per experience.
              </div>
            </div>
          </div>
          <p className="text-[40px] leading-none font-extrabold tracking-tight mb-1">
            <span className="text-sm text-emerald-700 mr-1">USDC</span>
            {currentValues.totalValue.toLocaleString()}
          </p>
          <p className="text-xs text-neutral-500">Total Payments Value</p>
          <div className="mt-5 text-sm text-neutral-700 flex items-center justify-between">
            <span>Average Per Experience:</span>
            <span>
              <span className="text-[11px] text-emerald-700 mr-1">USDC</span>
              {currentValues.average.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm relative">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base font-semibold text-neutral-800">Crypto Payments</h3>
            <div className="relative group">
              <button className="w-6 h-6 grid place-items-center bg-neutral-200 text-neutral-700 rounded-full">?</button>
              <div className="absolute right-0 top-full mt-2 bg-white p-3 rounded-xl shadow-xl text-xs text-neutral-700 border border-neutral-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                Crypto payments total and converted amount.
              </div>
            </div>
          </div>
          <p className="text-[40px] leading-none font-extrabold tracking-tight mb-1">
            <span className="text-sm text-purple-700 mr-1">SOL</span>
            {currentCryptoValues.totalValue.toLocaleString(undefined, {
              minimumFractionDigits: 4,
              maximumFractionDigits: 4,
            })}
          </p>
          <p className="text-xs text-neutral-500">Total Payments Value</p>
          <div className="mt-5 text-sm text-neutral-700 flex items-center justify-between">
            <span>Total Converted To Local Currency:</span>
            <span>
              <span className="text-[11px] text-purple-700 mr-1">SOL</span>
              {currentCryptoValues.converted.toLocaleString(undefined, {
                minimumFractionDigits: 3,
                maximumFractionDigits: 4,
              })}
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-300 to-amber-400 p-6 rounded-2xl shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base font-semibold text-white">Payout</h3>
            <div className="relative group">
              <button className="w-6 h-6 grid place-items-center bg-white/20 text-white rounded-full">?</button>
              <div className="absolute right-0 top-full mt-2 bg-white p-3 rounded-xl shadow-xl text-xs text-neutral-700 border border-neutral-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                Send to bank or preferred destination. Choose currency.
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              className="px-4 py-2.5 bg-white text-neutral-800 rounded-xl hover:bg-neutral-50 transition shadow-sm font-medium"
              onClick={() => setShowBankModal(true)}
            >
              Send To Bank
            </button>

            <div className="flex items-center justify-center gap-2 text-white text-xs">
              <span className="opacity-80">Powered by</span>
              <div className="flex items-center gap-1 bg-white/15 px-2 py-0.5 rounded">
                <span className="font-semibold">Onramper</span>
                <Image src="/onramper.png" alt="Onramper" width={30} height={10} className="invert brightness-0" />
              </div>
            </div>

            <p className="text-[11px] leading-tight text-white/95 text-center mt-1">
              By clicking ‘Send To Bank’, you can send your money to your bank or another destination and select your
              currency.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm relative col-span-2">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base font-semibold text-neutral-800">Payment Comparison</h3>
            <div className="relative group">
              <button className="w-6 h-6 grid place-items-center bg-neutral-200 text-neutral-700 rounded-full">?</button>
              <div className="absolute right-0 top-full mt-2 bg-white p-3 rounded-xl shadow-xl text-xs text-neutral-700 border border-neutral-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                Trends over time: all payments vs crypto payments.
              </div>
            </div>
          </div>
          {isClient && <Line data={graphData} options={graphOptions} />}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-semibold text-neutral-800">Payment Methods</h3>
            <div className="relative group">
              <button className="w-6 h-6 grid place-items-center bg-neutral-200 text-neutral-700 rounded-full">?</button>
              <div className="absolute right-0 top-full mt-2 bg-white p-3 rounded-xl shadow-xl text-xs text-neutral-700 border border-neutral-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                Breakdown of methods used by customers.
              </div>
            </div>
          </div>
          <ul className="space-y-4">
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-white rounded-full shadow-sm">
                  <Image
                    src="/solana.png"
                    alt="Solana"
                    className="w-5 h-5"
                    width={20}
                    height={20}
                    style={{ filter: "hue-rotate(220deg) brightness(1.2)", mixBlendMode: "multiply" }}
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
                <span>Mastercard</span>
              </div>
              <span>20%</span>
            </li>
            <li className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-white rounded-full shadow-sm">
                  <FaCcPaypal className="w-5 h-5 text-[#003087]" />
                </div>
                <span>Paypal</span>
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
              <span>6%</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm relative col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-semibold text-neutral-800">Transaction History</h3>
            <div className="relative group">
              <button className="w-6 h-6 grid place-items-center bg-neutral-200 text-neutral-700 rounded-full">?</button>
              <div className="absolute right-0 top-full mt-2 bg-white p-3 rounded-xl shadow-xl text-xs text-neutral-700 border border-neutral-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                Recent transactions and details.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-0 mb-2 text-[11px] font-medium text-neutral-500">
            <div className="px-4 text-left">Client&apos;s Name</div>
            <div className="px-4 text-center">Experience Name</div>
            <div className="px-4 text-center">Amount Paid</div>
            <div className="px-4 text-right">Payment Date</div>
          </div>

          <div className="space-y-3">
            {transactions
              .slice(0, showExpandedTransactions ? transactions.length : 3)
              .map((transaction) => (
                <div key={transaction.id} className="grid grid-cols-4 items-center py-3 border-b border-gray-100">
                  <div className="flex items-center px-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full grid place-items-center shrink-0 mr-3">
                      <span className="text-sm font-semibold">
                        {transaction.partner_name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </span>
                    </div>
                    <span className="text-[12px] font-medium">{transaction.partner_name}</span>
                  </div>
                  <div className="flex justify-center px-4">
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-medium text-center bg-green-100 text-green-800">
                      {transaction.experience_name}
                    </span>
                  </div>
                  <div className="text-center font-medium text-green-600 text-[12px] px-4">€{transaction.total_price}</div>
                  <div className="text-right text-[12px] text-gray-500 px-4">{transaction.booking_date}</div>
                </div>
              ))}
          </div>

      <div className="flex justify-end mt-6">
        <button
          className="inline-flex items-center gap-1 text-[12px] text-neutral-500 hover:text-neutral-800"
          onClick={() => setShowExpandedTransactions((prev) => !prev)}
        >
          {showExpandedTransactions ? "Show Less" : "See More"}
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>


        <div className="bg-white p-6 rounded-2xl shadow-sm relative">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base font-semibold text-neutral-800">Refunds</h3>
            <div className="relative group">
              <button className="w-6 h-6 grid place-items-center bg-neutral-200 text-neutral-700 rounded-full">?</button>
              <div className="absolute right-0 top-full mt-2 bg-white p-3 rounded-xl shadow-xl text-xs text-neutral-700 border border-neutral-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                Total refunds and rate vs. experiences.
              </div>
            </div>
          </div>
          <p className="text-[40px] leading-none font-extrabold tracking-tight mb-1 text-red-600">
            -€{currentRefundValues.totalRefunds.toLocaleString()}
          </p>
          <p className="text-xs text-neutral-500">Total Refund Value</p>
          <div className="mt-5 text-sm text-neutral-700 space-y-2">
            <div className="flex justify-between">
              <span>Total Refunds:</span>
              <span className="text-red-600">{currentRefundValues.totalRefunds}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Rate / Experience:</span>
              <span className="text-red-600">{currentRefundValues.refundRate}%</span>
            </div>
          </div>
        </div>
      </section>

      {showBankModal && (
        <>
          <div
            className="fixed inset-0 backdrop-blur-sm bg-black/30 z-40 transition-all duration-300"
            onClick={() => setShowBankModal(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-[#f7f7f7] rounded-2xl shadow-2xl p-6 max-w-md w-full relative">
              <button
                onClick={() => setShowBankModal(false)}
                className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full"
                aria-label="Close"
              >
                <XIcon className="w-6 h-6" />
              </button>

              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div>
                  <label className="block text-sm text-gray-600 mb-1">You send</label>
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

                <div>
                  <label className="block text-sm text-gray-600 mb-1">You receive</label>
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

                <div className="relative">
                  <label className="block text-sm text-gray-600 mb-1">Destination</label>
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
                      <span className="text-green-600 text-xs">Recommended</span>
                    </div>
                    <XIcon className={`w-4 h-4 transition-transform ${showPaymentMethods ? "rotate-45" : ""}`} />
                  </button>

                  {showPaymentMethods && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 max-h-80 overflow-y-auto">
                      <div className="px-4 py-3 border-b border-gray-100 text-sm font-medium">Select payment method</div>
                      <div className="py-2">
                        <button className="w-full flex items-center px-4 py-3 hover:bg-gray-50">
                          <FaCreditCard className="w-6 h-6 mr-3 text-gray-700" />
                          <span>Revolut Pay</span>
                          <span className="ml-2 text-xs text-green-600">Recommended</span>
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
                      <div className="text-center text-xs text-gray-500 py-2">Powered by Onramper</div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-4 bg-black text-white rounded-xl text-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Send
                </button>
                <div className="text-center text-xs text-gray-500">Powered by Onramper</div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
