import { Check } from "lucide-react";
type ProgressBarProps = {
  currentStep: number;
};

const steps = [
  { label: 'Login', step: 1 },
  { label: 'Guests', step: 2 },
  { label: "Slots", step: 3 },
  { label: 'Payment', step: 4 },
];

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  const totalSteps = steps.length;
  const totalWidth = (totalSteps - 1) / totalSteps;
  const progressPercentage = Math.min(((currentStep - 1) / (totalSteps - 1)) * 100, 100);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pt-10">
      {/* Container for steps */}
      <div className="relative flex items-center justify-between">
        {/* Background progress track */}
        <div 
          className="absolute top-4 h-1 bg-gray-200 z-0 rounded"
          style={{
            left: `${100 / (2 * totalSteps)}%`,
            width: `${totalWidth * 100}%`,
          }} 
        />

        {/* Filled progress */}
        <div
          className="absolute top-4 h-1 bg-primary z-10 rounded transition-all duration-500"
          style={{
            left: `${100 / (2 * totalSteps)}%`,
            width: `${progressPercentage * totalWidth}%`,
          }}
        />

        {/* Step circles */}
        {steps.map(({ step, label }) => {
          const isCompleted = currentStep > step;
          const isActive = currentStep === step;

          return (
            <div key={step} className="relative z-20 flex flex-col items-center flex-1">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center border-2 text-sm font-semibold transition
                ${isCompleted
                  ? 'bg-primary text-white border-primary'
                  : isActive
                    ? 'bg-white text-primary border-primary'
                    : 'bg-white text-gray-400 border-gray-300'
                }`}
              >
                {isCompleted 
                  ? <Check className="w-5 h-5"/>
                  : step
                }
              </div>
              <span className="mt-2 text-sm text-gray-700">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
