import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const SDG_LABELS = [
  { value: "1", label: "SDG 1: No Poverty", color: "#e5243b" },
  { value: "2", label: "SDG 2: Zero Hunger", color: "#dda63a" },
  { value: "3", label: "SDG 3: Good Health And Well-Being", color: "#4c9f38" },
  { value: "4", label: "SDG 4: Quality Education", color: "#c5192d" },
  { value: "5", label: "SDG 5: Gender Equality", color: "#ff3a21" },
  { value: "6", label: "SDG 6: Clean Water And Sanitation", color: "#26bde2" },
  { value: "7", label: "SDG 7: Affordable And Clean Energy", color: "#fcc30b" },
  { value: "8", label: "SDG 8: Decent Work And Economic Growth", color: "#a21942" },
  { value: "9", label: "SDG 9: Industry, Innovation And Infrastructure", color: "#fd6925" },
  { value: "10", label: "SDG 10: Reduced Inequalities", color: "#dd1367" },
  { value: "11", label: "SDG 11: Sustainable Cities And Communities", color: "#fd9d24" },
  { value: "12", label: "SDG 12: Responsible Consumption And Production", color: "#bf8b2e" },
  { value: "13", label: "SDG 13: Climate Action", color: "#3f7e44" },
  { value: "14", label: "SDG 14: Life Below Water", color: "#0a97d9" },
  { value: "15", label: "SDG 15: Life On Land", color: "#56c02b" },
  { value: "16", label: "SDG 16: Peace, Justice And Strong Institutions", color: "#00689d" },
  { value: "17", label: "SDG 17: Partnerships For The Goals", color: "#19486a" },
];

export const SDGIcons: React.FC<{
  goals: string[];
  maxDisplay: number;
  iconSize: number;
  showPopover?: boolean;
  wrapperClassName?: string;
  
}> = ({ 
  goals,
  maxDisplay,
  iconSize,
  showPopover = true,
  wrapperClassName = "flex items-center gap-1",
}) => {
  if (!goals.length) return null;

  return ( 
    <TooltipProvider>
      <div className={wrapperClassName}>
        {goals.slice(0, maxDisplay).map((goal, index) => {
          const imagePath = `/assets/sdg/E-WEB-Goal-${goal.padStart(2, "0")}.png`;
          const sdgData = SDG_LABELS.find((sdg) => sdg.value === goal);
          const label = sdgData?.label || `SDG ${goal}`;
          const color = sdgData?.color || "#6b7280"; // fallback to gray-500
          const unUrl = `https://sdgs.un.org/goals/goal${goal}`;

          return (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Image
                  src={imagePath}
                  alt={label}
                  width={iconSize}
                  height={iconSize}
                  className="rounded cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(unUrl, '_blank', 'noopener,noreferrer');
                  }}
                />
              </TooltipTrigger>
              <TooltipContent
                style={{
                  backgroundColor: color,
                  color: "white",
                  border: "none",
                }}
                className="text-white font-medium cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(unUrl, '_blank', 'noopener,noreferrer');
                }}
              >
                <p>{label}</p>
                <p className="text-xs opacity-90 mt-1">Click to learn more</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
        {goals.length > maxDisplay && showPopover && (
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="text-gray-500 hover:text-gray-700 font-medium px-1 cursor-pointer transition-colors"
                style={{ fontSize: `${iconSize * 0.4}px`, lineHeight: 1 }}
                onClick={(e) => e.stopPropagation()}
              >
                +{goals.length - maxDisplay}
              </button>
            </PopoverTrigger>
            <PopoverContent className="p-3 w-50">
              <div className="space-y-3 text-start">
                <h4 className="font-semibold text-sm text-gray-900">
                  All Sustainable Development Goals ({goals.length}):
                </h4>
                <SDGIcons 
                  goals={goals} 
                  maxDisplay={goals.length} 
                  iconSize={40} 
                  showPopover={false}
                  wrapperClassName="grid grid-cols-4 gap-2 justify-items-center"
                />
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </TooltipProvider>
  );
};