type ProgressBarProps = {
  currentStep: number; // 1 = Login, 2 = Payment, 3 = Review
};

const steps = [
  { label: 'Login/Signup', step: 1 },
  { label: 'Payment', step: 2 },
  { label: 'Review', step: 3 },
];

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  const totalSteps = steps.length;
  const progressPercentage =
    ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pt-10">
      <div className="relative flex items-center justify-between">
        {/* Progress track container */}
        <div className="absolute left-1/6 right-1/6 top-4.5 h-1 bg-gray-200 z-0 rounded" />

        {/* Filled progress */}
        <div
          className="absolute left-1/6 top-4.5 h-1 bg-primary z-10 rounded transition-all duration-500"
          style={{ width: `calc(${progressPercentage}% * 2 / 3)` }} // Scales between 0% and ~100% between circles
        />

        {/* Step circles */}
        {steps.map(({ step, label }) => {
          const isCompleted = currentStep > step;
          const isActive = currentStep === step;

          return (
            <div key={step} className="relative z-20 flex flex-col items-center w-1/3">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center border-2 text-sm font-semibold transition
                ${isCompleted
                  ? 'bg-primary text-white border-primary'
                  : isActive
                    ? 'bg-white text-primary border-primary'
                    : 'bg-white text-gray-400 border-gray-300'
                }`}
              >
                {isCompleted ? '✓' : step}
              </div>
              <span className="mt-2 text-sm text-gray-700">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
