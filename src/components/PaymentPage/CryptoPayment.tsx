'use client';

import { useEffect, useState } from 'react';
import { useCart } from "@/context/Cart"; // Import the Cart context
import { useSearch } from '@/context/SearchContext';
import { createBooking } from "@/lib/api"; // Import the createBooking function
import { CryptoPaymentUI } from './CryptoPaymentUI';

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
  const { priceBreakdown, booking_date, cartExperience} = useCart();
  const { searchParams } = useSearch();
  const [payment, setPayment] = useState<PaymentSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('USDC');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isBookingCreated, setIsBookingCreated] = useState(false); // Flag to prevent duplicate bookings

  
  const [isPaymentSessionInitialized, setIsPaymentSessionInitialized] = useState(false); // Tracks whether the session is initialized

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://127.0.0.1:8000';
  
  // * Starting the payment session * // 
  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        setLoading(true); // Set loading to true before starting the fetch
        setError(null); // Clear any previous errors
  
        console.log('API URL:', API_URL); // Debugging: Log the API URL

        const totalPrice = priceBreakdown?.finalPrice
        console.log('Total Price (after discount):', totalPrice); // Debugging: Log the total price

        const response = await fetch(`${API_URL}/experience/${cartExperience?.id}/start_pay_session/price/${totalPrice}`);
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
    console.log('Payment Status Response:', data.status);

    // ONLY update if the status has actually changed
    setPayment((prev) => {
      if (!prev) return null;
      
      // Compare current status with new status
      if (prev.status === data.status) {
        console.log('Status unchanged, skipping update');
        return prev; // Return the same object reference - no re-render
      }
      
      console.log(`Status changed from ${prev.status} to ${data.status}`);
      return {
        ...prev,
        status: data.status || prev.status,
      };
    });

    if (data.status === 'success') {
      console.log('Payment successful!');
      clearInterval(intervalId);
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
    if (!cartExperience?.id || !priceBreakdown) {
      console.error("Experience ID is null. Cannot create booking.");
      setError("Experience ID is missing. Please try again.");
      return;
    }

    try {
      const bookingData = {
        experience_id: cartExperience.id,
        booking_date: now.toISOString(),
        client_id: 5,
        duration_days: 2,
        number_of_people: searchParams.guests,
        total_price: priceBreakdown?.finalPrice*(1-SHARE_PERCENTAGE_HIMAMBO),
        created_at: now.toISOString(),
        updated_at: now.toISOString(),
        discount: priceBreakdown.cryptoDiscount, //To be reviewed
        baseDiscount: priceBreakdown.basePriceDiscount, //To be reviewed
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

  const handleRetry = () => {
    window.location.reload();
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false);
  };

  const handleCurrencySelect = (currency: Currency) => {
    setSelectedCurrency(currency);
  };

  const handleProceedClick = async () => {
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
  };

  return (
    <CryptoPaymentUI
      loading={loading}
      error={error}
      payment={payment}
      selectedCurrency={selectedCurrency}
      showPaymentModal={showPaymentModal}
      copySuccess={copySuccess}
      getAmount={getAmount}
      onRetry={handleRetry}
      onCloseModal={handleCloseModal}
      onCurrencySelect={handleCurrencySelect}
      onProceedClick={handleProceedClick}
      onCopy={handleCopy}
    />
  );
}