import { ChevronUp, ChevronDown, Check, Minus, Plus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";

interface SelectorProps<T extends string | number> {
  label: string;
  options?: T[];
  value: T;
  setValue: (val: T) => void;
  formatLabel?: (option: T) => string;
  minVal?: number;
  maxVal?: number;
  layout?: "vertical" | "horizontal";
  containerClassName?: string;
  labelClassName?: string;
  buttonClassName?: string;
}

export function CustomSelect<T extends string | number>({
  label,
  options,
  value,
  setValue,
  formatLabel = (o) => String(o),
  minVal,
  maxVal,
  layout = "vertical",
  containerClassName = "",
  labelClassName = "",
  buttonClassName = ""
}: SelectorProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  // Check if this is a numeric selector
  const isNumeric = typeof value === "number";

  const defaultContainerClass = layout === "horizontal" 
    ? "flex items-center gap-2" 
    : "";
  
  const defaultLabelClass = layout === "vertical" 
    ? "text-xs leading-none mb-3 h-3" 
    : "text-sm text-gray-600 whitespace-nowrap";
  
  const defaultButtonClass = layout === "vertical"
    ? isNumeric && !options 
      ? "bg-white flex items-center justify-between border border-none rounded-md h-10 px-2 py-1"
      : "bg-white rounded-md flex w-full bg-transparent border-none h-10 px-3 items-center focus:outline-none"
    : isNumeric && !options
      ? "border border-gray-300 rounded-lg px-2 py-1 text-sm h-8 bg-white flex items-center justify-between w-auto"
      : "border border-gray-300 rounded-lg px-3 py-1 text-sm h-8 bg-white flex items-center bg-transparent focus:outline-none w-auto";

  return (
    <div className={`${defaultContainerClass} ${containerClassName}`.trim()}>
      <p className={`${defaultLabelClass} ${labelClassName}`.trim()}>{label}:</p>
      {isNumeric && !options ? (
        // Counter style for numbers
        <div className={`${defaultButtonClass} ${buttonClassName}`.trim()}>
          <button
            type="button"
            className="p-1 text-primary disabled:opacity-50"
            onClick={() => setValue((value as number) - 1 as T)}
            disabled={(minVal !== undefined && (value as number) <= minVal)}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="text-black font-semibold px-3">{formatLabel(value)}</span>
          <button
            type="button"
            className="p-1 text-primary disabled:opacity-50"
            onClick={() => setValue((value as number) + 1 as T)}
            disabled={(maxVal !== undefined && (value as number) >= maxVal)}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      ) : (
        // Dropdown for strings
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <button className={`${defaultButtonClass} ${buttonClassName}`.trim()}>
              <span>{formatLabel(value)}</span>
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
            {options?.map((option) => {
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
                    className={`h-4 w-4 text-black ml-2 ${
                      isSelected ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <span>{formatLabel(option)}</span>
                </button>
              );
            })}
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}