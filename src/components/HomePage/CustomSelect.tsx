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
    ? "body-s text-primary leading-none mb-3 h-3" 
    : "body-m text-tertiary whitespace-nowrap";
  
  const defaultButtonClass = layout === "vertical"
    ? isNumeric && !options 
      ? "bg-white flex items-center justify-between border border-none rounded-md h-10 px-2 py-1"
      : "bg-white rounded-md w-full bg-transparent border-none h-10 px-3 focus:outline-none"
    : isNumeric && !options
      ? "border-none rounded-lg px-2 py-1 text-sm h-8 bg-surface flex items-center justify-between w-auto cursor-pointer"
      : "border-none rounded-lg px-3 py-1 text-sm h-8 bg-surface bg-transparent focus:outline-none w-auto cursor-pointer";

  return (
    <div className={`${defaultContainerClass} ${containerClassName}`.trim()}>
      <p className={`${defaultLabelClass} ${labelClassName}`.trim()}>{label}:</p>
      {isNumeric && !options ? (
        // Counter style for numbers
        <div className={`${defaultButtonClass} ${buttonClassName}`.trim()}>
          <button
            type="button"
            className="p-1 text-[var(--yellow-500)] disabled:text-[var(--neutral-300)]"
            onClick={() => setValue((value as number) - 1 as T)}
            disabled={(minVal !== undefined && (value as number) <= minVal)}
          >
            <Minus className="icon-s" />
          </button>

          <span className="body-xl text-primary px-3">{formatLabel(value)}</span>
          <button
            type="button"
            className="p-1 text-[var(--yellow-500)] disabled:text-[var(--neutral-300)]"
            onClick={() => setValue((value as number) + 1 as T)}
            disabled={(maxVal !== undefined && (value as number) >= maxVal)}
          >
            <Plus className="icon-s" />
          </button>
        </div>
      ) : (
        // Dropdown for strings
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <button
              className={`${defaultButtonClass} ${buttonClassName} flex justify-between items-center`.trim()}
            >
              <span className="body-m text-primary truncate">{formatLabel(value)}</span>
              {isOpen ? (
                <ChevronUp className="icon-s text-primary" />
              ) : (
                <ChevronDown className="icon-s text-primary" />
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="p-0 body-m bg-surface shadow-elevation-1 text-primary border-none rounded-300 min-w-[100%] w-auto max-w-fit"
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
                  className={`
                    w-full flex items-center gap-2 px-3 py-2 text-left
                    hover:bg-gray-100/80
                    ${isSelected ? "bg-gray-100/50 font-medium" : ""}
                    first:rounded-t-300 last:rounded-b-300
                  `}
                >
                  <Check
                    className={`icon-xs text-primary ml-2 ${
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