'use client'
import { useEffect, useState } from 'react';
import { AccordionStep } from './AccordionStep';
import { AuthForm } from './AuthForm';
import { PaymentForm } from './PaymentForm';
import GuestDetailsAndDiscount from './GuestDetailsAndDiscount';
import { useCart } from "@/context/Cart";
import { useSearch } from "@/context/SearchContext"

type Props = {
  setCurrentStep: (step: number) => void;
};

type Guest = {
  firstName: string;
  lastName: string;
};

export default function LoginAndPaymentFlow({ setCurrentStep }: Props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [guestDetailsConfirmed, setGuestDetailsConfirmed] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const { payment_type, setPaymentType } = useCart();

  const { searchParams, setGuests } = useSearch();
  const [guestDetails, setGuestDetails] = useState<Guest[]>([
    { firstName: '', lastName: '' },
  ]);

  // Initialize guest details when component mounts or guest count changes
  useEffect(() => {
    setGuestDetails(prev =>
      Array.from({ length: searchParams.guests }, (_, i) => ({
        firstName: prev[i]?.firstName || '',
        lastName: prev[i]?.lastName || '',
      }))
    );
  }, [searchParams.guests]);

  // Update current step based on new flow
  useEffect(() => {
    if (!isLoggedIn) {
      setCurrentStep(1);
    } else if (!guestDetailsConfirmed) {
      setCurrentStep(2);
    } else if (!bookingConfirmed) {
      setCurrentStep(3);
    } else {
      setCurrentStep(4);
    }
  }, [isLoggedIn, guestDetailsConfirmed, bookingConfirmed, setCurrentStep]);

  // Handle guest details confirmation
  const handleGuestDetailsComplete = () => {
    setGuestDetailsConfirmed(true);
  };

  // Handle going back to guest details
  const handleBackToGuestDetails = () => {
    setGuestDetailsConfirmed(false);
  };

  // Handle booking confirmation (after payment)
  const handleBookingConfirmed = () => {
    setBookingConfirmed(true);
  };

  // Changing the payment method
  const handleMethodChange = (m: 'credit' | 'crypto') => {
    console.log('Changing payment method to:', m);
    setPaymentType(m);
  };

  return (
    <div className="mx-auto space-y-4 max-w-xl min-h-[500px] transition-all duration-500">
      {/* Step 1: Auth */}
      <AccordionStep
        title={isLoggedIn ? 'Logged in' : 'Step 1: Login/Signup'}
        show={!isLoggedIn}
        completed={isLoggedIn}
      >
        <AuthForm onSuccess={() => setIsLoggedIn(true)} />
      </AccordionStep>

      {/* Step 2: Guest Details and Discount */}
      <AccordionStep
        title={guestDetailsConfirmed ? 'Guest Details Confirmed' : 'Step 2: Confirm Guests & Apply Discount'}
        show={isLoggedIn && !guestDetailsConfirmed}
        completed={guestDetailsConfirmed}
      >
        <GuestDetailsAndDiscount
          guests={searchParams.guests}
          setGuests={setGuests}
          guestDetails={guestDetails}
          setGuestDetails={setGuestDetails}
          onComplete={handleGuestDetailsComplete}
        />
      </AccordionStep>

      {/* Step 3: Payment */}
      <AccordionStep
        title={bookingConfirmed ? "Payment Complete!" : 'Step 3: Select Payment & Pay'}
        show={guestDetailsConfirmed && !bookingConfirmed}
        completed={bookingConfirmed}
      >
        <PaymentForm
          disabled={!guestDetailsConfirmed}
          method={payment_type}
          onMethodChange={handleMethodChange}
          onComplete={handleBookingConfirmed}
          onBackToGuestDetails={handleBackToGuestDetails}
        />
      </AccordionStep>

      {/* Step 4: Confirmation */}
      {bookingConfirmed && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-medium text-green-800">Booking Confirmed!</h3>
          <p className="text-green-700">Thank you for your booking.</p>
        </div>
      )}
    </div>
  );
}