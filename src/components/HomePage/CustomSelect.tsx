import { ChevronUp, ChevronDown, Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";

interface SelectorProps<T extends string | number> {
  label: string;
  options: T[];
  value: T;
  setValue: (val: T) => void;
  formatLabel?: (option: T) => string;
}

export function CustomSelect<T extends string | number>({
  label,
  options,
  value,
  setValue,
  formatLabel = (o) => String(o),
}: SelectorProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <p className="text-xs leading-none mb-1 h-3">{label}</p>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button className="flex w-full font-semibold bg-transparent border-none p-0 h-auto focus:outline-none">
            {formatLabel(value)}
            {isOpen ? (
              <ChevronUp className="ml-1 h-5 w-5 text-primary" />
            ) : (
              <ChevronDown className="ml-1 h-5 w-5 text-primary" />
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="p-0 text-sm bg-white text-black border border-gray-300 min-w-[100%] w-auto max-w-fit"
        >
          {options.map((option) => {
            const isSelected = value === option;
            return (
              <button
                key={String(option)}
                onClick={() => {
                  setValue(option);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-100/80 ${
                  isSelected ? "bg-gray-100/50 font-medium" : ""
                }`}
              >
                <Check
                  className={`text-primary h-4 w-4 text-black ml-2 ${
                    isSelected ? "opacity-100" : "opacity-0"
                  }`}
                />
                <span>{formatLabel(option)}</span>
              </button>
            );
          })}
        </PopoverContent>
      </Popover>
    </div>
  );
}
