import React, { useState } from "react";
import Image from "next/image";
import { CheckedIcon, NotCheckedIcon } from "../shared/IconComponents";
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
  iconPath?: (val: T) => string | undefined;
  single?: boolean;
  TitleIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>; 
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
  iconPath,
  single = false,
  TitleIcon,
}: FilterSectionProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

const handleToggle = (val: T) => {
  if (single && !dropdown) {
    if (selected.includes(val)) {
      onToggle(val);
    } else {
      selected.forEach((s) => onToggle(s));
      onToggle(val);
    }
  } else {
    onToggle(val);
  }
};

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

  const renderIcon = (value: T, size: number, className = "object-contain rounded-xs") => {
    if (!iconPath) return null;
      const path = iconPath(value);
    if (!path) return null;

    return (
      <Image
        src={path}
        width={size}
        height={size}
        alt=""
        className={className}
        aria-hidden="true"
      />
    );
  };

  // Dropdown rendering
  if (dropdown) {
    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2 border-b-2 border-[var(--text-secondary)] pb-1 text-secondary">
            {TitleIcon && <TitleIcon className="icon-s" aria-hidden="true" />}
            <h3 className="body-xl">{title}</h3>
          </div>
          {selected.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="text-muted-foreground hover:text-foreground h-auto p-1"
              disabled={disabled}
            >
              Clear
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
                <div className="flex items-center gap-1.5 rounded-md">
                  {renderIcon?.(value, 16)}
                  <span>{displayLabel}</span>
                </div>
                  <button
                    onClick={() => handleToggle(value)}
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
          <PopoverContent className="w-full p-0 shadow-elevation-1" align="start">
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
                      onSelect={() => handleToggle(value)}
                      className={cn(
                        "cursor-pointer flex items-center gap-2",
                        selected.includes(value)
                          ? "bg-gray-100/50"
                          : ""
                      )}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selected.includes(value)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {renderIcon(value, 20)}
                      <span>{label}</span>
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
      <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2 border-b-2 border-[var(--text-secondary)] pb-1 text-secondary">
            {TitleIcon && <TitleIcon className="icon-s" aria-hidden="true" />}
            <h3 className="body-xl">{title}</h3>
          </div>
          {(selected.length > 0) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="text-muted-foreground hover:text-foreground h-auto p-1"
              disabled={disabled}
            >
              Clear
            </Button>
          )}
      </div>
      <ul className="space-y-2">
        {options.map((option) => {
          const value = getValue(option);
          const label = renderLabel ? renderLabel(value) : getLabel(option);

          return (
            <li key={String(value)}>
              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={selected.includes(value)}
                  onChange={() => !disabled && handleToggle(value)}
                  disabled={disabled}
                  className="hidden"
                />
                <span
                  className={`w-5 h-5 text-primary flex-shrink-0 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {selected.includes(value) ? (
                    <CheckedIcon className="w-full h-full" />
                  ) : (
                    <NotCheckedIcon className="w-full h-full" />
                  )}
                </span>
                {renderIcon(value, 20)}
                <span className={`body-m text-gray-500 ${disabled ? "opacity-50" : ""}`}>
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