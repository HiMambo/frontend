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
  containerSizeClassName?: string;
  iconSizeClassName?: string;
}> = ({
  icon: Icon,
  tooltip,
  onClick,
  containerSizeClassName = "icon-size-l",
  iconSizeClassName = "icon-size-m",
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <button 
        className={`${containerSizeClassName} rounded-full bg-white hover:bg-[var(--green-300)] hover:text-white flex items-center justify-center transition-colors cursor-pointer`}
        onClick={onClick}
        aria-label={tooltip}
      >
        <div className={`relative ${iconSizeClassName}`}>
          <Icon className="fill-current" />
        </div>
      </button>
    </TooltipTrigger>
    <TooltipContent className="body-m text-inverted bg-[var(--green-300)]">
      {tooltip}
    </TooltipContent>
  </Tooltip>
);
