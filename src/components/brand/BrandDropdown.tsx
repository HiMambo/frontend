"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

type Item = { value: string; label: string };
type Props = {
  label?: string;
  placeholder?: string;
  value?: string;
  onValueChange?: (v: string) => void;
  items: Item[];
  className?: string;
};

export default function BrandDropdown({
  label,
  placeholder = "Select an option",
  value,
  onValueChange,
  items,
  className,
}: Props) {
  return (
    <div className={cn("space-y-150", className)}>
      {label && <Label className="text-sm text-neutral-800">{label}</Label>}
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="h-[58px] w-full rounded-300 border-neutral-200 bg-white px-400 text-sm focus:ring-2 focus:ring-yellow-500/30">
          <SelectValue placeholder={placeholder} />
          <ChevronDown className="ml-auto w-4 h-4 text-neutral-500" />
        </SelectTrigger>
        <SelectContent className="rounded-300">
          {items.map((it) => (
            <SelectItem key={it.value} value={it.value}>
              {it.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
