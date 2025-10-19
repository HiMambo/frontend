import { Check } from "lucide-react";
import { type StepStatus, useSteps } from "@/context/BookingStepsContext";

export default function ProgressBar() {
  const { getStepStatus, completedSteps, steps, canGoToStep, goToStep } = useSteps();

  const totalSteps = steps.length;
  const totalWidth = (totalSteps - 1) / totalSteps;
  const progressPercentage = Math.min((completedSteps.size / (totalSteps - 1)) * 100, 100);

  const getStepStyles = (status: StepStatus): string => {
    switch (status) {
      case "completed":
        return "bg-primary text-white border-primary";
      case "active":
        return "bg-primary text-white border-primary ring-5 ring-primary/30";
      case "revisited":
        return "bg-primary text-white border-primary ring-5 ring-primary/30";
      case "open":
        return "bg-white text-primary border-primary";
      case "pending":
      default:
        return "bg-white text-gray-300 border-gray-200";
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pt-10">
      <div className="relative flex items-center justify-between">
        {/* Track */}
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

        {/* Steps */}
        {steps.map(({ step, label }) => {
          const status = getStepStatus(step);
          const isCompleted = status === "completed" || status === "revisited";
          const isClickable = canGoToStep(step);

          return (
            <div key={step} className="relative z-20 flex flex-col items-center flex-1">
              <div
                onClick={() => isClickable && goToStep(step)}
                className={`w-9 h-9 rounded-full flex items-center justify-center border-2 text-sm font-semibold transition-all duration-300
                  ${getStepStyles(status)}
                  ${isClickable ? "hover:scale-[1.1] cursor-pointer" : "cursor-default"}`}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : step}
              </div>
              <span className="mt-2 text-sm text-gray-700">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
