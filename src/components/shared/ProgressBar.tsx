import { type StepStatus, useSteps } from "@/context/StepContext";
import { LucideIcon } from "lucide-react";

interface StepIconPair {
  incomplete: LucideIcon;
  completed: LucideIcon;
}

interface ProgressBarProps {
  icons: StepIconPair[];
}

export default function ProgressBar({ icons }: ProgressBarProps) {
  const { getStepStatus, completedSteps, steps, canGoToStep, routeToStep } = useSteps();

  const totalSteps = steps.length;
  const totalWidth = (totalSteps - 1) / totalSteps;
  const progressPercentage = Math.min(
    (completedSteps.size / (totalSteps - 1)) * 100,
    100
  );

  const getStepStyles = (status: StepStatus): string => {
    switch (status) {
      case "completed":
        return "bg-surface-accent-2 text-inverted border-[var(--surface-accent-2)] border-3";
      case "active":
        return "bg-[var(--neutral-100)] text-disabled border-[var(--surface-accent-2)] border-3 ring-5 ring-[var(--surface-accent-2)]/40";
      case "revisited":
        return "bg-surface-accent-2 text-inverted border-[var(--surface-accent-2)] ring-5 ring-[var(--surface-accent-2)]/40";
      case "open":
        return "bg-[var(--neutral-100)] text-disabled border-[var(--surface-accent-2)] border-3";
      case "pending":
      default:
        return "bg-[var(--neutral-100)] text-disabled border-[var(--text-disabled)] border-3";
    }
  };

  return (
    <div className="w-[var(--width-progress-bar)] mx-auto px-1200 py-600">
      <div className="relative flex items-center justify-between">
        {/* Track */}
        <div
          className="absolute h-1 bg-[var(--text-disabled)] z-0 rounded"
          style={{
            top: `34%`,
            left: `${100 / (2 * totalSteps)}%`,
            width: `${totalWidth * 100}%`,
          }}
        />

        {/* Filled progress */}
        <div
          className="absolute h-1 bg-surface-accent-2 z-10 rounded transition-all duration-500"
          style={{
            top: `34%`,
            left: `${100 / (2 * totalSteps)}%`,
            width: `${progressPercentage * totalWidth}%`,
          }}
        />

        {/* Steps */}
        {steps.map(({ step, label }, index) => {
          const status = getStepStatus(step);
          const isCompleted = status === "completed" || status === "revisited";
          const isClickable = canGoToStep(step);

          const Icon = isCompleted
            ? icons[index].completed
            : icons[index].incomplete;

          return (
            <div key={step} className="relative z-20 flex flex-col items-center gap-100">
              <div
                onClick={() => isClickable && routeToStep(step)}
                className={`icon-size-l rounded-full flex items-center justify-center
                  ${getStepStyles(status)}
                  ${isClickable ? "hover:scale-[1.05] cursor-pointer" : "cursor-default"}`}
              >
                <Icon className="icon-size-m" />
              </div>
              <span className="body-xxs-light text-tertiary">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
