import React, { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Option<T> = T | { value: T; label: string };

interface FilterSectionProps<T extends string | number> {
  title: string;
  options: Option<T>[];
  selected: T[];
  onToggle: (val: T) => void;
  renderLabel?: (val: T) => string;
  renderBadgeLabel?: (val: T) => string;
  disabled?: boolean;
  dropdown?: boolean;
  searchPlaceholder?: string;
  dropdownPlaceholder?: string;
  emptyMessage?: string;
}

export const FilterSection = <T extends string | number>({
  title,
  options,
  selected,
  onToggle,
  renderLabel,
  renderBadgeLabel,
  disabled = false,
  dropdown = false,
  searchPlaceholder = "Search...",
  dropdownPlaceholder = "Select items...",
  emptyMessage = "No items found.",
}: FilterSectionProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const getValue = (opt: Option<T>): T =>
    typeof opt === "object" ? opt.value : opt;

  const getLabel = (opt: Option<T>): string =>
    typeof opt === "object" ? opt.label : String(opt);

  const clearAll = () => {
    selected.forEach(item => onToggle(item));
  };

  const getSelectedLabel = (value: T): string => {
    const option = options.find(opt => getValue(opt) === value);
    return option ? getLabel(option) : String(value);
  };

  // Dropdown rendering
  if (dropdown) {
    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg text-blue-800">{title}</h3>
          {selected.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="text-muted-foreground hover:text-foreground h-auto p-1"
              disabled={disabled}
            >
              Clear All
            </Button>
          )}
        </div>
        
        {/* Selected Items Display */}
        {selected.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {selected.map((value) => {
              // Use renderBadgeLabel if provided, otherwise fall back to renderLabel or default
              const displayLabel = renderBadgeLabel 
                ? renderBadgeLabel(value)
                : renderLabel 
                ? renderLabel(value) 
                : getSelectedLabel(value);
              
              return (
                <Badge
                  key={String(value)}
                  variant="secondary"
                  className="text-xs"
                >
                  {displayLabel}
                  <button
                    onClick={() => onToggle(value)}
                    disabled={disabled}
                    className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5 disabled:opacity-50"
                  >
                    <X className="h-2 w-2" />
                  </button>
                </Badge>
              );
            })}
          </div>
        )}

        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={isOpen}
              className="w-full justify-between text-left font-normal"
              disabled={disabled}
            >
              {selected.length === 0
                ? dropdownPlaceholder
                : `${selected.length} item${selected.length > 1 ? 's' : ''} selected`}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput placeholder={searchPlaceholder} />
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup className="max-h-64 overflow-auto">
                {options.map((option) => {
                  const value = getValue(option);
                  const label = renderLabel ? renderLabel(value) : getLabel(option);
                  
                  return (
                    <CommandItem
                      key={String(value)}
                      value={label}
                      onSelect={() => onToggle(value)}
                      className="cursor-pointer"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selected.includes(value)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  // Default checkbox rendering
  return (
    <div className="mb-6">
      <h3 className="font-semibold text-lg text-blue-800 mb-2">{title}</h3>
      <ul className="space-y-2">
        {options.map((option) => {
          const value = getValue(option);
          const label = renderLabel ? renderLabel(value) : getLabel(option);

          return (
            <li key={String(value)}>
              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <Checkbox
                  id={String(value)}
                  checked={selected.includes(value)}
                  disabled={disabled}
                  onCheckedChange={() => !disabled && onToggle(value)}
                  className="filter-checkbox"
                />
                <span className={`text-gray-700 ${disabled ? "opacity-50" : ""}`}>
                  {label}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};