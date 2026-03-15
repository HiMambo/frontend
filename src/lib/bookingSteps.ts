// Booking step definitions

// Future? Define all steps from all different flows in here, and conditionally pass steptype to stepcontext?

export const BOOKING_STEP_DEFINITIONS = [
  {
    step: 1,
    label: 'Login',
    title: 'Step 1: Log In',
    completedTitle: 'Logged In',
    component: 'AuthFlow',
    showBackButton: false,
    showNextButton: false,
  },
  {
    step: 2,
    label: 'Slots',
    title: 'Step 2: Select Time Slot',
    completedTitle: 'Time Slot Selected',
    component: 'SlotSelector',
    showBackButton: false,
    showNextButton: true,
    backButtonText: '',
    nextButtonText: 'Continue to Payment Details',
  },
  {
    step: 3,
    label: 'Payment',
    title: 'Step 3: Payment',
    completedTitle: 'Payment Successful',
    component: 'PaymentForm',
    showBackButton: false,
    showNextButton: false,
  },
];