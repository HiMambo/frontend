'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CountdownTimer } from '@/components/CountdownTimer';
import QRCode from 'react-qr-code';

import { useCart } from "@/context/Cart"; // Import the Cart context

import { createBooking } from "@/lib/api"; // Import the createBooking function


type PaymentSession = {
  session_id: string;
  experience_id: string;
  price_data: Record<string, { price: number; digits: number; convert_rate: number }>;
  final_price: number;
  final_currency: string;
  public_key: string;
  status: 'init' | 'pending' | 'checked' | 'success';
  expires_at: string;
};

type Currency = 'USDC' | 'SOL';

const T_PERIOD_CHECK_PAYMENT = 3000; // in milliseconds
const MAX_ATTEMPTS_CHECK_PAYMENT = 20; // in times
const SHARE_PERCENTAGE_HIMAMBO = 0.1

// Add props for integration
type CryptoPaymentProps = {
  onClose?: () => void;
  onPaymentComplete?: () => void;
};

export default function CryptoPayment({}: CryptoPaymentProps) {
  const { price, experienceId, discount, number_of_people, booking_date} = useCart();
  const [payment, setPayment] = useState<PaymentSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('USDC');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isBookingCreated, setIsBookingCreated] = useState(false); // Flag to prevent duplicate bookings

  
  const [isPaymentSessionInitialized, setIsPaymentSessionInitialized] = useState(false); // Tracks whether the session is initialized

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://127.0.0.1:8000';

  // Calculate the total price based on the discount
  const calculateTotalPrice = () => {
    if (!price) return 0;

    // Total price 
    const discountMultiplier = (100 - discount) / 100; // Convert discount percentage to multiplier
    return price * discountMultiplier * number_of_people ;
  };
  
  // * Starting the payment session * // 
  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        setLoading(true); // Set loading to true before starting the fetch
        setError(null); // Clear any previous errors
  
        console.log('API URL:', API_URL); // Debugging: Log the API URL

        const totalPrice = calculateTotalPrice(); // Calculate the total price
        console.log('Total Price (after discount):', totalPrice); // Debugging: Log the total price

        const response = await fetch(`${API_URL}/experience/${experienceId}/start_pay_session/price/${totalPrice}`);
        if (!response.ok) {
          console.error('Response status for starting payment session:', response.status); // Debugging: Log the response status
          throw new Error('Failed to fetch payment session data');
        }
  
        const data = await response.json();
        console.log('Payment Session Data:', data); // Debugging: Log the API response
  
        // Update the payment session state with the new structure
        setPayment({
          session_id: data.session_id,
          experience_id: data.experience_id,
          price_data: data.price_data,
          final_price: 0, // Placeholder, not used in this context
          final_currency: '',
          public_key: '',
          status: 'init',
          expires_at: '', // Placeholder, not used in this context
        });

        setLoading(false); // Set loading to false after the fetch
        setIsPaymentSessionInitialized(true); // Mark session as initialized
      } catch (err) {
        console.error('Error fetching payment session:', err);
        setError(err instanceof Error ? err.message : 'Failed to load payment session');
      } finally {
        setLoading(false); // Ensure loading is set to false after the fetch
      }
    };
  
    fetchPaymentData();
  }, []); // Run only once on component mount


  // * Proceeding to payment * //
  const handleProceedToPayment = async () => {
    if (!payment) return;
  
    try {
      setError(null); // Clear any previous errors
      setShowPaymentModal(true); // Show the modal immediately
  
      const response = await fetch(
        `${API_URL}/payment_session/${payment.session_id}/pay/currency/${selectedCurrency}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (!response.ok) {
        throw new Error('Failed to initiate payment session');
      }
  
      const data = await response.json();
      console.log('Payment Session Response:', data); // Debugging: Log the API response
  
      // Update only the necessary fields in the payment state
      setPayment((prev) => {
        if (!prev) return null; // Ensure the previous state exists

        return {
          ...prev, // Retain all existing fields
          session_id: data.session_id || prev.session_id,
          public_key: data.pubkey || prev.public_key,
          expires_at: data.expires_at || prev.expires_at,
          final_price: data.final_price || prev.final_price,
          final_currency: data.final_currency || prev.final_currency,
          status: data.status,
        };
      });

    } catch (err) {
      console.error('Error initiating payment session:', err);
      setError('Failed to initiate payment session. Please try again.');
      setShowPaymentModal(false); // Hide the modal if the request fails
      return;
    } finally {

    }
  };

  // * Fetching the status of the payment session (periodically) * //
  useEffect(() => {
    if (!payment || (payment.status !== 'pending' && payment.status !== 'checked') || !payment.session_id) return;
  
    let attempts = 0;
  
    const checkPaymentStatus = async () => {
      try {
        console.log('Checking payment status...');
        const response = await fetch(`${API_URL}/payment_session/${payment.session_id}/status`, {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to check payment status');
        }
  
        const data = await response.json();
        console.log('Payment Status Response:', data.status); // Debugging: Log the API response

        setPayment((prev) => {
          if (!prev) return null; // Ensure the previous state exists
          return {
            ...prev,
            status: data.status || prev.status, // Update the status field
          };
        });

        if (data.status === 'success') {
          console.log('Payment successful!');
          clearInterval(intervalId); // Stop polling if payment is successful
        }
      } catch (err) {
        attempts += 1;
        console.error(`Payment status check failed (attempt ${attempts}):`, err);
  
        if (attempts >= MAX_ATTEMPTS_CHECK_PAYMENT) {
          clearInterval(intervalId);
          setError('Maximum attempts reached. Please try again later.');
        }
      }
    };
  
    const intervalId = setInterval(checkPaymentStatus, T_PERIOD_CHECK_PAYMENT); // Poll every x seconds
  
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [payment?.status, payment?.session_id, API_URL]);


  const handleCreateBooking = async () => {
    if (!payment) return;

    const now = new Date(); 

    // Ensure experienceId is not null
    if (!experienceId) {
      console.error("Experience ID is null. Cannot create booking.");
      setError("Experience ID is missing. Please try again.");
      return;
    }

    try {
      const bookingData = {
        experience_id: experienceId,
        booking_date: now.toISOString(),
        client_id: 5,
        duration_days: 2,
        number_of_people: number_of_people,
        total_price: calculateTotalPrice()*(1-SHARE_PERCENTAGE_HIMAMBO),
        created_at: now.toISOString(),
        updated_at: now.toISOString(),
        discount: discount,
        currency: payment.final_currency,
        experience_date : booking_date.toISOString(),
        payment_type: "crypto",
        confirmation_code : "asij1823nasd",
        status: "paid"
      };

      console.log("Creating booking with data:", bookingData);

      const response = await createBooking(bookingData);
      console.log("Booking created successfully:", response);
      setIsBookingCreated(true);
    } catch (err) {
      console.error("Error creating booking:", err);
      setError("Failed to create booking. Please contact support.");
    }
  };

  // Automatically call createBooking when payment status is 'success'
  useEffect(() => {
    if (payment?.status === "success" && !isBookingCreated) {
      handleCreateBooking();
    }
  }, [payment?.status, isBookingCreated]);



  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess('Copied to clipboard!'); // Set success message
      setTimeout(() => setCopySuccess(null), 2000); // Clear message after 2 seconds
    });
  };

  const getAmount = () => {
    if (!payment || !payment.price_data[selectedCurrency]) return '0.00';
    const { price, digits } = payment.price_data[selectedCurrency];
    return price.toFixed(digits); // Format the price based on the number of digits
  };

  const PaymentModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 space-y-6 relative">
        
       <button
          onClick={() => setShowPaymentModal(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
       </button>
  
        {payment?.status === 'pending' ?  (
          // Waiting state
          <>
            <h2 className="text-2xl font-bold text-center">Pay {getAmount()} {selectedCurrency}</h2>
  
            {payment && (
              <CountdownTimer
                expiresAt={payment.expires_at}
                onExpire={() => {
                  setShowPaymentModal(false);
                  setError('Payment time expired');
                }}
              />
            )}
  
            <div className="bg-gray-50 p-6 rounded-2xl">
              <div className="w-full aspect-square bg-gray-200 rounded-lg mb-4">
                <QRCode
                  value={payment.public_key}
                  style={{ width: '100%', height: '100%' }} // Make QR code fill the parent div
              />
              </div>
  
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Payment Address</label>
                <div className="flex items-center space-x-2">
                  <input
                    readOnly
                    value={payment?.public_key}
                    className="bg-white rounded-lg px-4 py-2 w-full text-sm font-mono"
                  />
                  <button
                    onClick={() => handleCopy(payment?.public_key || '')}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                  >
                    Copy
                  </button>
                </div>
                {copySuccess && (
                  <p className="text-green-600 text-sm">✓ {copySuccess}</p>
                )}
              </div>
            </div>
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
          </>

        ) : payment?.status === 'success' ? (
          console.log('Payment successful from the PaymentModal'),
          // Success state
          <div className="text-center space-y-4">
            <img
              src="/happy-face.png"
              alt="Happy Face"
              className="w-24 h-24 mx-auto"
            />
            <h2 className="text-2xl font-bold text-green-600">Payment Successful!</h2>
            <p className="text-gray-600">Thank you for your payment. Your transaction has been confirmed.</p>
            <Link href="/mybookings">
              <button
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                To your bookings
              </button>
            </Link>
          </div>
        ) : payment?.status === 'checked' ? (
          // Success state
          <div className="text-center space-y-4">
            <img
              src="/paper-plane.png"
              alt="Paper Plane"
              className="w-24 h-24 mx-auto"
            />
            <h2 className="text-2xl font-bold text-green-600">Just a bit longer</h2>
            <p className="text-gray-600">We are letting our HiMambo partner know 
              you are on your way!</p>
          </div>
        ) : (
          // Loading state
          <div className="text-center space-y-4">
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
            <p className="text-gray-600">Processing payment...</p>
          </div>
        )}
      </div>
    </div>
  );


  // Handle loading, error, and no payment data states
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 text-lg font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  
  if (!payment?.price_data) {
    return <div className="min-h-screen flex items-center justify-center">No payment data</div>;
  }

  // Render the main content
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-md mx-auto space-y-8">
          <div className="bg-white rounded-2xl p-6 shadow-xl">
          <div className="flex justify-center space-x-2 mb-8">
            {['USDC', 'SOL'].map((currency) => (
              <button
                key={currency}
                onClick={() => setSelectedCurrency(currency as Currency)} // Update selectedCurrency
                className={`px-4 py-2 rounded-lg ${
                  selectedCurrency === currency
                    ? 'bg-yellow-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {currency}
              </button>
            ))}
          </div>

            <div className="text-center mb-8">
              <p className="text-sm text-gray-600 mb-2">Total Amount</p>
              <p className="text-4xl font-bold">
                {getAmount()} {selectedCurrency}
              </p>
            </div>

            <button
              onClick={async () => {
                if (isPaymentSessionInitialized) {
                  try {
                    handleProceedToPayment()
                  } catch (err) {
                    console.error('Error with the API call', err);
                    setError('Failed to initiate our payment session with MamboPay. Please try again.');
                    return;
                  } finally {
                    
                  }
                }
              }}
              className="w-full bg-yellow-500 text-white py-4 rounded-xl text-lg font-medium hover:bg-yellow-600 transition-colors"
            >
              Proceed to Payment
            </button>
            
          </div>
        </div>
      </div>

      {showPaymentModal && <PaymentModal />}
    </>
  );
}