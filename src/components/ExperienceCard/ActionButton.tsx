import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

export const ActionButton: React.FC<{
  icon: React.ElementType;
  tooltip: string;
  onClick: (e: React.MouseEvent) => void;
  size?: number;
  className?: string;
}> = ({
  icon: Icon,
  tooltip,
  onClick,
  size = 20,
  className = "w-9 h-9 rounded-full bg-white hover:bg-[var(--green-300)] hover:text-white flex items-center justify-center transition-colors cursor-pointer",
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <button className={className} onClick={onClick} aria-label={tooltip}>
        <Icon width={size} height={size} />
      </button>
    </TooltipTrigger>
    <TooltipContent className="body-m text-inverted">{tooltip}</TooltipContent>
  </Tooltip>
);
