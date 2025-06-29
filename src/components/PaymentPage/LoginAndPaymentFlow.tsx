'use client'
import { useEffect, useState } from 'react';
import { AccordionStep } from './AccordionStep';
import { AuthForm } from './AuthForm';
import { PaymentForm } from './PaymentForm';
import GuestForm from './GuestForm';
import { useSearch } from "@/context/SearchContext"
import { useCart } from '@/context/Cart';
import { SlotForm } from './SlotForm';

type Guest = {
  firstName: string;
  lastName: string;
};

type LoginAndPaymentFlowProps = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
};

export default function LoginAndPaymentFlow({ 
  currentStep,
  setCurrentStep
}: LoginAndPaymentFlowProps) {

  const { searchParams, setGuests } = useSearch();
  const { payment_type, setPaymentType, CRYPTO_DISCOUNT } = useCart();
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

  // Step handlers (1: AuthForm, 2: Guests, 3: TimeSlots, 4: Payment, 5: Success)
  const getStepStatus = (stepNumber: number) => {
    if (currentStep === stepNumber) return 'active';
    if (currentStep > stepNumber) return 'completed';
    return 'pending';
  };
  // Success handlers
  const handleAuthFormComplete = () => setCurrentStep(2);
  const handleGuestDetailsComplete = () => setCurrentStep(3);
  const handleTimeSlotsComplete = () => setCurrentStep(4);
  const handlePaymentComplete = () => setCurrentStep(5);
  // Return handlers
  const handleBackToGuestDetails = () => setCurrentStep(2);
  const handleBackToTimeSlots = () => setCurrentStep(3);

  return (
    <div className="mx-auto space-y-4 max-w-xl min-h-[500px] transition-all duration-500">
      {/* Step 1: Auth */}
      <AccordionStep
        title={currentStep > 1 ? 'Logged in' : 'Step 1: Login/Signup'}
        status={getStepStatus(1)}
      >
        <AuthForm 
          onComplete={handleAuthFormComplete}
        />
      </AccordionStep>

      {/* Step 2: Guest Details and Discount */}
      <AccordionStep
        title={currentStep > 2 ? 'Guest Details Confirmed' : 'Step 2: Confirm Guests & Apply Discount'}
        status={getStepStatus(2)}
      >
        <GuestForm
          guests={searchParams.guests}
          setGuests={setGuests}
          guestDetails={guestDetails}
          setGuestDetails={setGuestDetails}
          onComplete={handleGuestDetailsComplete}
        />
      </AccordionStep>

      {/* Step 3: Slots */}
      <AccordionStep
        title={currentStep > 3 ? "Time Slot Selected" : "Step 3: Select Time Slot"}
        status={getStepStatus(3)}
      >
        <SlotForm
          onComplete={handleTimeSlotsComplete}
          onBack={handleBackToGuestDetails}
        />
      </AccordionStep>

      {/* Step 4: Payment */}
      <AccordionStep
        title={currentStep > 4 ? "Payment Successful" : "Step 4: Select Payment & Pay"}
        status={getStepStatus(4)}
      >
        <PaymentForm
          payment_type={payment_type}
          setPaymentType={setPaymentType}
          cryptoDiscount={CRYPTO_DISCOUNT}
          onComplete={handlePaymentComplete}
          onBack={handleBackToTimeSlots}
        />
      </AccordionStep>

      {/* Step 4: Confirmation */}
      {currentStep === 5 && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-medium text-green-800">Booking Confirmed!</h3>
          <p className="text-green-700">Thank you for your booking.</p>
        </div>
      )}
    </div>
  );
}