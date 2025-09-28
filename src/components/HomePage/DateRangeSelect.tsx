import { useState } from "react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { ChevronUp, ChevronDown } from "lucide-react"
import { format } from "date-fns"
import { DateRange } from "react-day-picker"

interface DateRangePickerProps {
  label?: string
  value: DateRange | undefined
  onChange: (value: DateRange | undefined) => void
  layout?: "vertical" | "horizontal"
  containerClassName?: string
  labelClassName?: string
  buttonClassName?: string
  inputHeight?: "fixed" | "fluid";
}

export function DateRangeSelect({ 
  label = "Dates", 
  value, 
  onChange,
  layout = "vertical",
  containerClassName = "",
  labelClassName = "",
  buttonClassName = "",
  inputHeight = "fixed"
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [tempDate, setTempDate] = useState<DateRange | undefined>()

  // Determine height class based on inputHeight prop
  const heightClass = inputHeight === "fluid" ? "h-input-fluid" : "h-10";

  const defaultContainerClass = layout === "horizontal" 
    ? "flex items-center gap-2" 
    : ""
  
  const defaultLabelClass = layout === "vertical" 
    ? "body-s text-primary leading-none mb-3 h-3" 
    : "body-m text-tertiary whitespace-nowrap";
  
  const defaultButtonClass = layout === "vertical"
    ? `bg-white ${heightClass} rounded-300 w-full bg-transparent border-none px-3 focus:outline-none`
    : "border border-gray-300 rounded-300 px-3 py-1 text-sm h-8 bg-white bg-transparent focus:outline-none w-auto"

  return (
    <div className={`${defaultContainerClass} ${containerClassName}`.trim()}>
      <p className={`${defaultLabelClass} ${labelClassName}`.trim()}>{label}:</p>
      <Popover
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open)
          if (open) setTempDate(value)
        }}
      >
        <PopoverTrigger asChild>
          <button
            className={`flex justify-between items-center ${defaultButtonClass} ${buttonClassName}`.trim()}
          >
            <span className="body-s text-primary">{formatDateRange(value)}</span>
            {isOpen ? (
              <ChevronUp className="ml-1 icon-size-s text-primary" />
            ) : (
              <ChevronDown className="ml-1 icon-size-s text-primary" />
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-surface border-none shadow-elevation-1 rounded-300">
          <Calendar
            className="text-primary"
            mode="range"
            selected={tempDate}
            onSelect={setTempDate}
          />
          <div className="flex justify-end gap-x-2 pr-4 pb-4">
            <Button
              variant="link"
              className="text-m font-semibold text-secondary"
              onClick={() => setTempDate(undefined)}
            >
              Reset
            </Button>
            <Button
              variant="link"
              className="text-m font-semibold text-secondary"
              onClick={() => {
                if (tempDate?.from && tempDate?.to) {
                  onChange(tempDate)
                  setIsOpen(false)
                }
              }}
            >
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

function formatDateRange(value: DateRange | undefined) {
  if (!value?.from) return "Pick a date range";
  const from = value.from;
  const to = value.to;

  if (!to) return `${format(from, "dd MMM yy")} - ...`;

  const fromDay = from.getDate();
  const toDay = to.getDate();
  const fromMonth = format(from, "MMM");
  const toMonth = format(to, "MMM");
  const fromYear = format(from, "yy");
  const toYear = format(to, "yy");

  if (fromMonth === toMonth && fromYear === toYear) {
    return `${fromDay} - ${toDay} ${fromMonth} ${fromYear}`;
  } else if (fromYear === toYear) {
    return `${fromDay} ${fromMonth} - ${toDay} ${toMonth} ${fromYear}`;
  } else {
    return `${fromDay} ${fromMonth} ${fromYear} - ${toDay} ${toMonth} ${toYear}`;
  }
}