import React, { useState } from "react";
import { FaUserCircle, FaEnvelope, FaLock, FaCamera } from "react-icons/fa";
import { FaCreditCard, FaPaypal, FaBitcoin, FaEllipsisV } from "react-icons/fa";
import Image from "next/image";

type PaymentMethod = 'credit-card' | 'paypal' | 'crypto';

type PaymentDetailsForm = {
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
    paypalEmail?: string;
    cryptoAddress?: string;
};


// Add to your existing types
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

    // Dummy data for cards
    const [upcomingExperiencesList] = useState([
        { name: "Eco Mountain Trek", date: "2025-06-15" },
        { name: "Sustainable Urban Tour", date: "2025-07-01" }
    ]);

    const [pastExperiencesList] = useState<PastExperience[]>([
        { name: "Green City Tour", date: "2025-04-15", amount: 150, location: "Barcelona" },
        { name: "Eco Hiking Tour", date: "2025-03-20", amount: 200, location: "Alps" },
        { name: "Sustainable Safari", date: "2025-02-10", amount: 300, location: "Kenya" }
    ]);
    // Add to your existing states
    const [showAllTransactions, setShowAllTransactions] = useState(false);
    const [showFavoritePartners, setShowFavoritePartners] = useState(false);
    const [showFavoriteExperiences, setShowFavoriteExperiences] = useState(false);

    // Add this array with your other dummy data
    const [allTransactions] = useState([
        { name: "John Doe", experience: "Sustainable Safari", amount: 200, experienceDate: "2025-06-15", paymentDate: "2025-05-01", status: "upcoming" },
        { name: "Jane Smith", experience: "Eco Hiking Tour", amount: 150, experienceDate: "2025-05-02", paymentDate: "2025-05-02" },
        { name: "Alice Johnson", experience: "Green City Tour", amount: 300, experienceDate: "2025-05-03", paymentDate: "2025-05-03" },
        { name: "Bob Wilson", experience: "Mountain Trek", amount: 250, experienceDate: "2025-05-04", paymentDate: "2025-05-04" },
        { name: "Carol Davis", experience: "Urban Tour", amount: 175, experienceDate: "2025-05-05", paymentDate: "2025-05-05" }
    ]);
    const [favoritePartners] = useState<FavoritePartner[]>([
        { name: "EcoVentures Ltd", location: "Barcelona", rating: 4.8, profilePic: "/partner1.jpg" },
        { name: "Green Tours Co", location: "Alps", rating: 4.9, profilePic: "/partner2.jpg" },
        { name: "Sustainable Safaris", location: "Kenya", rating: 5.0, profilePic: "/partner3.jpg" }
    ]);
    const [favoriteExperiences] = useState<FavoriteExperience[]>([
        { name: "Mountain Eco Trek", location: "Swiss Alps", price: 299, image: "/exp1.jpg" },
        { name: "Urban Green Tour", location: "Barcelona", price: 149, image: "/exp2.jpg" },
        { name: "Wildlife Safari", location: "Kenya", price: 399, image: "/exp3.jpg" }
    ]);



    return (
        <div className="ml-16 p-8 bg-[#f7f7f7] min-h-screen">
            <header className="mb-8">
                <h2 className="text-3xl font-bold">Profile</h2>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center relative">
                    <div className="relative mb-4">
                        <Image
                            src={profile.profilePic}
                            alt="Profile"
                            width={96}
                            height={96}
                            className="w-24 h-24 rounded-full object-cover border-4 border-purple-500 shadow"
                        />
                        <button
                            className="absolute bottom-2 right-2 bg-purple-500 text-white rounded-full p-2 shadow hover:bg-purple-600 transition-colors"
                            title="Change Profile Picture"
                        >
                            <FaCamera className="w-4 h-4" />
                        </button>
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{profile.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">ID: HM-2025-0501</p>
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full mb-4">
                        HiMambo User since: May 2025
                    </span>
                    <form className="w-full space-y-4">
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Name</label>
                            <div className={`flex items-center ${editing ? 'bg-white' : 'bg-gray-50'} rounded-lg px-3 py-2 border ${editing ? 'border-purple-200' : 'border-gray-200'}`}>
                                <FaUserCircle className={`mr-2 ${editing ? 'text-purple-400' : 'text-gray-400'}`} />
                                <input
                                    type="text"
                                    value={profile.name}
                                    disabled={!editing}
                                    onChange={e => setProfile({ ...profile, name: e.target.value })}
                                    className={`w-full focus:outline-none ${editing ? 'bg-white' : 'bg-gray-50'}`}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Email</label>
                            <div className={`flex items-center ${editing ? 'bg-white' : 'bg-gray-50'} rounded-lg px-3 py-2 border ${editing ? 'border-purple-200' : 'border-gray-200'}`}>
                                <FaEnvelope className={`mr-2 ${editing ? 'text-purple-400' : 'text-gray-400'}`} />
                                <input
                                    type="email"
                                    value={profile.email}
                                    disabled={!editing}
                                    onChange={e => setProfile({ ...profile, email: e.target.value })}
                                    className={`w-full focus:outline-none ${editing ? 'bg-white' : 'bg-gray-50'}`}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-1">Password</label>
                            <div className={`flex items-center ${editing ? 'bg-white' : 'bg-gray-50'} rounded-lg px-3 py-2 border ${editing ? 'border-purple-200' : 'border-gray-200'}`}>
                                <FaLock className={`mr-2 ${editing ? 'text-purple-400' : 'text-gray-400'}`} />
                                <input
                                    type="password"
                                    value={profile.password}
                                    disabled={!editing}
                                    onChange={e => setProfile({ ...profile, password: e.target.value })}
                                    className={`w-full focus:outline-none ${editing ? 'bg-white' : 'bg-gray-50'}`}
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="button"
                                onClick={() => setShowForgotPassword(true)}
                                className="text-xs text-blue-600 hover:text-blue-700 mt-1"
                            >
                                Forgot Password?
                            </button>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => setEditing(!editing)}
                                className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                            >
                                <span>{editing ? 'Save Changes' : 'Edit Profile'}</span>
                                {editing ? (
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Cards */}
                <div className="col-span-2 flex flex-col h-full">
                    {/* Favorites Row - Moved to top */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        {/* Favorite HiPartners */}
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg shadow-md border border-orange-200">
                            <div className="w-full flex justify-between items-center mb-3">
                                <h3 className="text-sm font-semibold text-orange-800">Favorite HiPartners</h3>
                                <InfoTooltip text="View your saved favorite sustainable tourism partners." />
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setShowFavoritePartners(true)}
                                    className="text-2xl font-bold text-orange-500 hover:text-orange-600 transition-colors"
                                >
                                    {favoritePartners.length}
                                </button>
                                <div
                                    onClick={() => setShowFavoritePartners(true)}
                                    className="flex flex-col cursor-pointer group"
                                >
                                    <div className="text-xs font-medium text-orange-800">Saved Partners</div>
                                    <div className="text-xs text-orange-500 group-hover:text-orange-600">
                                        Click to view all
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Favorite Experiences */}
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg shadow-md border border-orange-200">
                            <div className="w-full flex justify-between items-center mb-3">
                                <h3 className="text-sm font-semibold text-orange-800">Favorite Experiences</h3>
                                <InfoTooltip text="View your saved favorite sustainable experiences." />
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setShowFavoriteExperiences(true)}
                                    className="text-2xl font-bold text-orange-500 hover:text-orange-600 transition-colors"
                                >
                                    {favoriteExperiences.length}
                                </button>
                                <div
                                    onClick={() => setShowFavoriteExperiences(true)}
                                    className="flex flex-col cursor-pointer group"
                                >
                                    <div className="text-xs font-medium text-orange-800">Saved Experiences</div>
                                    <div className="text-xs text-orange-500 group-hover:text-orange-600">
                                        Click to view all
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Separator above My Bookings */}
                    <div className="w-full flex flex-col items-center mb-4">
                        <div className="w-full h-px bg-gray-200" />
                        <div className="h-2" /> {/* Small separation space */}
                        <div className="w-full flex justify-center">
                            <div className="w-full max-w-3xl mx-auto px-4 py-2 bg-purple-50 border border-purple-200 rounded-lg shadow-sm flex justify-center">
                                <span className="text-base font-semibold text-purple-700">My Bookings</span>
                            </div>
                        </div>
                    </div>

                    {/* Top Cards Container */}
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
                                    <div className="text-xs font-medium text-gray-600">Completed Experiences</div>
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
                                    <div className="text-xs font-medium text-gray-600">Scheduled Experiences</div>
                                    <div className="text-xs text-green-600">Click to view all</div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Methods - Reduced size */}
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
                                                {selectedPayment === 'credit-card' && <FaCreditCard className="text-blue-600 w-4 h-4" />}
                                                {selectedPayment === 'paypal' && <FaPaypal className="text-blue-600 w-4 h-4" />}
                                                {selectedPayment === 'crypto' && <FaBitcoin className="text-orange-500 w-4 h-4" />}
                                                <span className="capitalize text-sm">
                                                    {selectedPayment.replace('-', ' ')}
                                                </span>
                                            </>
                                        ) : (
                                            <span className="text-sm text-purple-600 font-medium">Select Payment Method</span>
                                        )}
                                    </div>
                                    <FaEllipsisV className="text-gray-400 w-3 h-3" />
                                </button>

                                {/* Payment Options Dropdown */}
                                {showPaymentMenu && (
                                    <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                                        <div className="py-1">
                                            <button
                                                onClick={() => {
                                                    setSelectedPayment('credit-card');
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
                                                    setSelectedPayment('paypal');
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
                                                    setSelectedPayment('crypto');
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
                            <div className="mt-4 text-xs text-gray-500">Click to change payment method</div>
                        </div>
                    </div>

                    {/* Transaction History Card */}
                    <div className="bg-white rounded-lg shadow-md flex-1">
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-sm font-semibold">Transaction History</h3>
                                <InfoTooltip text="Track all your financial transactions, payments, and experience bookings in one place." />
                            </div>

                            {/* Transaction Grid Headers */}
                            <div className="grid grid-cols-6 gap-0 mb-2 text-xs font-medium text-gray-500">
                                <div className="px-3 text-left">Client Name</div>
                                <div className="px-3 text-center">Experience Name</div>
                                <div className="px-3 text-center">Amount Paid</div>
                                <div className="px-3 text-center">Experience Date</div>
                                <div className="px-3 text-right">Payment Date</div>
                                <div className="px-3 text-right">Invoice</div>
                            </div>

                            {/* Transaction Items */}
                            <div className="space-y-2 overflow-y-auto" style={{ maxHeight: "calc(100% - 4rem)" }}>
                                {[...Array(3)].map((_, index) => (
                                    <div key={index} className="grid grid-cols-6 gap-0 items-center py-2 border-b border-gray-100">
                                        <div className="flex items-center px-3">
                                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center shrink-0 mr-2">
                                                <span className="text-sm font-semibold">
                                                    {index === 0 ? "JD" : index === 1 ? "JS" : "AJ"}
                                                </span>
                                            </div>
                                            <span className="text-xs font-medium">
                                                {index === 0 ? "John Doe" : index === 1 ? "Jane Smith" : "Alice Johnson"}
                                            </span>
                                        </div>
                                        <div className="flex justify-center px-3">
                                            <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium text-center bg-green-100 text-green-800">
                                                {index === 0 ? "Sustainable Safari" : index === 1 ? "Eco Hiking Tour" : "Green City Tour"}
                                            </span>
                                        </div>
                                        <div className="text-center font-medium text-green-600 text-xs px-3">
                                            ${index === 0 ? "200" : index === 1 ? "150" : "300"}
                                        </div>
                                        <div className="text-center px-3">
                                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${index === 0 ? 'bg-blue-100 text-blue-800' : 'text-gray-500'
                                                }`}>
                                                {index === 0 ? (
                                                    <div className="flex flex-col items-center">
                                                        <span>Upcoming</span>
                                                        <span className="text-xs text-blue-600">2025-06-15</span>
                                                    </div>
                                                ) : (
                                                    `2025-05-${(index + 1).toString().padStart(2, "0")}`
                                                )}
                                            </span>
                                        </div>
                                        <div className="text-right text-xs text-gray-500 px-3">
                                            2025-05-{(index + 1).toString().padStart(2, "0")}
                                        </div>
                                        <div className="px-3 text-right">
                                            <button
                                                onClick={() => {
                                                    // Add your PDF download logic here
                                                    console.log(`Downloading invoice for transaction ${index + 1}`);
                                                }}
                                                className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors"
                                            >
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                    />
                                                </svg>
                                                Invoice
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Add "See More" button here */}
                            <div className="flex justify-end mt-4 border-t border-gray-100 pt-3">
                                <button
                                    onClick={() => setShowAllTransactions(true)}
                                    className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                                >
                                    <span>See More Transactions</span>
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Details Modal */}
            {showPaymentDetails && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        onClick={() => {
                            setShowPaymentDetails(false);
                            if (!paymentDetails.cardNumber && !paymentDetails.paypalEmail && !paymentDetails.cryptoAddress) {
                                setSelectedPayment(null); // Reset if no payment details were saved
                            }
                        }}
                    />

                    {/* Modal */}
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-xl shadow-xl z-50 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold">
                                {selectedPayment === 'credit-card' ? 'Add Credit Card' :
                                    selectedPayment === 'paypal' ? 'Connect PayPal' : 'Add Crypto Wallet'}
                            </h3>
                            <button
                                onClick={() => {
                                    setShowPaymentDetails(false);
                                    if (!paymentDetails.cardNumber && !paymentDetails.paypalEmail && !paymentDetails.cryptoAddress) {
                                        setSelectedPayment(null); // Reset if no payment details were saved
                                    }
                                }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ×
                            </button>
                        </div>

                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            {selectedPayment === 'credit-card' && (
                                <>
                                    <div>
                                        <label className="block text-sm text-gray-600 mb-1">Card Number</label>
                                        <input
                                            type="text"
                                            placeholder="1234 5678 9012 3456"
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                                            maxLength={19}
                                            onChange={(e) => {
                                                const formatted = e.target.value
                                                    .replace(/\s/g, '')
                                                    .replace(/(\d{4})/g, '$1 ')
                                                    .trim();
                                                setPaymentDetails({ ...paymentDetails, cardNumber: formatted });
                                            }}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-gray-600 mb-1">Expiry Date</label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                                                maxLength={5}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-600 mb-1">CVV</label>
                                            <input
                                                type="text"
                                                placeholder="123"
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                                                maxLength={3}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {selectedPayment === 'paypal' && (
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">PayPal Email</label>
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                            )}

                            {selectedPayment === 'crypto' && (
                                <div>
                                    <label className="block text-sm text-gray-600 mb-1">Wallet Address</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your wallet address"
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                            )}

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowPaymentDetails(false)}
                                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-[#FF8C00] text-white rounded-lg hover:bg-orange-700 transition"
                                >
                                    Save Payment Method
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}

            {/* Past Experiences Modal */}
            {showPastExperiences && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        onClick={() => setShowPastExperiences(false)}
                    />
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-xl shadow-xl z-50 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold">Past Experiences</h3>
                            <button
                                onClick={() => setShowPastExperiences(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ×
                            </button>
                        </div>

                        <div className="space-y-4">
                            {pastExperiencesList.map((experience, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <h4 className="font-medium">{experience.name}</h4>
                                        <p className="text-sm text-gray-500">{experience.location}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-green-600 font-medium">€{experience.amount}</p>
                                        <p className="text-xs text-gray-500">{experience.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* Upcoming Experiences Modal */}
            {showUpcomingExperiences && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        onClick={() => setShowUpcomingExperiences(false)}
                    />
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-xl shadow-xl z-50 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold">Upcoming Experiences</h3>
                            <button
                                onClick={() => setShowUpcomingExperiences(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ×
                            </button>
                        </div>

                        <div className="space-y-4">
                            {upcomingExperiencesList.map((experience, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <h4 className="font-medium">{experience.name}</h4>
                                        <p className="text-sm text-gray-500">Coming soon</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-500">{experience.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* Forgot Password Modal */}
            {showForgotPassword && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        onClick={() => setShowForgotPassword(false)}
                    />
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-xl shadow-xl z-50 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold">Reset Password</h3>
                            <button
                                onClick={() => setShowForgotPassword(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ×
                            </button>
                        </div>

                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    value={resetEmail}
                                    onChange={(e) => setResetEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    We&apos;ll send you instructions to reset your password.
                                </p>
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowForgotPassword(false)}
                                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-[#FF8C00] text-white rounded-lg hover:bg-orange-700 transition"
                                >
                                    Send Reset Link
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}

            {/* All Transactions Modal */}
            {showAllTransactions && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        onClick={() => setShowAllTransactions(false)}
                    />
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-white rounded-xl shadow-xl z-50 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold">All Transactions</h3>
                            <button
                                onClick={() => setShowAllTransactions(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ×
                            </button>
                        </div>

                        <div className="overflow-y-auto max-h-[60vh]">
                            <div className="grid grid-cols-6 gap-0 mb-2 text-xs font-medium text-gray-500 sticky top-0 bg-white p-2">
                                <div className="px-3 text-left">Client Name</div>
                                <div className="px-3 text-center">Experience Name</div>
                                <div className="px-3 text-center">Amount Paid</div>
                                <div className="px-3 text-center">Experience Date</div>
                                <div className="px-3 text-right">Payment Date</div>
                                <div className="px-3 text-right">Invoice</div>
                            </div>

                            <div className="space-y-2">
                                {allTransactions.map((transaction, index) => (
                                    <div key={index} className="grid grid-cols-6 gap-0 items-center py-2 border-b border-gray-100">
                                        <div className="flex items-center px-3">
                                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center shrink-0 mr-2">
                                                <span className="text-sm font-semibold">
                                                    {transaction.name.split(' ').map(n => n[0]).join('')}
                                                </span>
                                            </div>
                                            <span className="text-xs font-medium">{transaction.name}</span>
                                        </div>
                                        <div className="flex justify-center px-3">
                                            <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium text-center bg-green-100 text-green-800">
                                                {transaction.experience}
                                            </span>
                                        </div>
                                        <div className="text-center font-medium text-green-600 text-xs px-3">
                                            €{transaction.amount}
                                        </div>
                                        <div className="text-center px-3">
                                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${transaction.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 'text-gray-500'
                                                }`}>
                                                {transaction.status === 'upcoming' ? (
                                                    <div className="flex flex-col items-center">
                                                        <span>Upcoming</span>
                                                        <span className="text-xs text-blue-600">{transaction.experienceDate}</span>
                                                    </div>
                                                ) : transaction.experienceDate}
                                            </span>
                                        </div>
                                        <div className="text-right text-xs text-gray-500 px-3">
                                            {transaction.paymentDate}
                                        </div>
                                        <div className="px-3 text-right">
                                            <button
                                                onClick={() => {
                                                    console.log(`Downloading invoice for transaction ${index + 1}`);
                                                }}
                                                className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                Invoice
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Favorite Partners Modal */}
            {showFavoritePartners && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        onClick={() => setShowFavoritePartners(false)}
                    />
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-xl shadow-xl z-50 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold">Favorite HiPartners</h3>
                            <button
                                onClick={() => setShowFavoritePartners(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ×
                            </button>
                        </div>

                        <div className="space-y-4">
                            {favoritePartners.map((partner, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                                            <Image src={partner.profilePic} alt={partner.name} width={48} height={48} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">{partner.name}</h4>
                                            <p className="text-sm text-gray-500">{partner.location}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center text-yellow-500">
                                            <span className="text-sm font-medium mr-1">{partner.rating}</span>
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* Favorite Experiences Modal */}
            {showFavoriteExperiences && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        onClick={() => setShowFavoriteExperiences(false)}
                    />
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-xl shadow-xl z-50 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold">Favorite Experiences</h3>
                            <button
                                onClick={() => setShowFavoriteExperiences(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ×
                            </button>
                        </div>

                        <div className="space-y-4">
                            {favoriteExperiences.map((experience, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-16 h-12 bg-gray-200 rounded-lg overflow-hidden">
                                            <Image src={experience.image} alt={experience.name} width={64} height={48} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">{experience.name}</h4>
                                            <p className="text-sm text-gray-500">{experience.location}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-green-600 font-medium">€{experience.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}