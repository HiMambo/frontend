import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ActionButton: React.FC<{
  icon: string;
  alt: string;
  tooltip: string;
  onClick: (e: React.MouseEvent) => void;
  size: number;
  className?: string;
}> = ({
  icon,
  alt,
  tooltip,
  onClick,
  size,
  className = "w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer",
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <button className={className} onClick={onClick}>
        <Image src={icon} alt={alt} width={size} height={size} />
      </button>
    </TooltipTrigger>
    <TooltipContent>{tooltip}</TooltipContent>
  </Tooltip>
);
