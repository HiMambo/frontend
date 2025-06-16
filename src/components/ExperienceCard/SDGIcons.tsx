import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SDG_LABELS = [
  { value: "1", label: "SDG 1: No Poverty" },
  { value: "2", label: "SDG 2: Zero Hunger" },
  { value: "3", label: "SDG 3: Good Health And Well-Being" },
  { value: "4", label: "SDG 4: Quality Education" },
  { value: "5", label: "SDG 5: Gender Equality" },
  { value: "6", label: "SDG 6: Clean Water And Sanitation" },
  { value: "7", label: "SDG 7: Affordable And Clean Energy" },
  { value: "8", label: "SDG 8: Decent Work And Economic Growth" },
  { value: "9", label: "SDG 9: Industry, Innovation And Infrastructure" },
  { value: "10", label: "SDG 10: Reduced Inequalities" },
  { value: "11", label: "SDG 11: Sustainable Cities And Communities" },
  { value: "12", label: "SDG 12: Responsible Consumption And Production" },
  { value: "13", label: "SDG 13: Climate Action" },
  { value: "14", label: "SDG 14: Life Below Water" },
  { value: "15", label: "SDG 15: Life On Land" },
  { value: "16", label: "SDG 16: Peace, Justice And Strong Institutions" },
  { value: "17", label: "SDG 17: Partnerships For The Goals" },
];

export const SDGIcons: React.FC<{ 
  goals: string[]; 
  maxDisplay: number; 
  iconSize: number 
}> = ({ 
  goals, 
  maxDisplay, 
  iconSize 
}) => {
  if (!goals.length) return null;

  return (
    <TooltipProvider>
      <div className="flex items-center gap-[2px]">
        {goals.slice(0, maxDisplay).map((goal, index) => {
          const imagePath = `/assets/sdg/E-WEB-Goal-${goal.padStart(2, "0")}.png`;
          const label = SDG_LABELS.find((sdg) => sdg.value === goal)?.label || `SDG ${goal}`;
          return (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Image
                  src={imagePath}
                  alt={label}
                  width={iconSize}
                  height={iconSize}
                  className="rounded cursor-pointer"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{label}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
        {goals.length > maxDisplay && (
          <span 
            className="text-gray-500 font-medium px-1"
            style={{ fontSize: `${iconSize * 0.4}px`, lineHeight: 1 }}
          >
            +{goals.length - maxDisplay}
          </span>
        )}
      </div>
    </TooltipProvider>
  );
};