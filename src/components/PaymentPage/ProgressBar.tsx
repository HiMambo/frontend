type ProgressBarProps = {
  currentStep: number; // 1 = Login, 2 = Payment, 3 = Review
};

const steps = ['Login/Signup', 'Payment', 'Review'];

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  return (
    <div className="flex justify-center w-full py-6 px-4">
      <div className="flex items-center justify-between w-full max-w-3xl">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;

          return (
            <div key={index} className="flex items-center">
              {/* Circle + Label */}
              <div className="flex items-center space-x-2">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium transition
                  ${isCompleted
                    ? 'bg-primary text-white border-primary'
                    : isActive
                      ? 'bg-white text-primary border-primary'
                      : 'bg-white text-gray-400 border-gray-300'
                  }`}
                >
                  {stepNumber}
                </div>
                <div className="text-sm whitespace-nowrap">{label}</div>
              </div>

              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div
                  className={`flex-grow h-0.5 mx-2 transition-all
                  ${stepNumber < currentStep
                    ? 'bg-primary'
                    : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
