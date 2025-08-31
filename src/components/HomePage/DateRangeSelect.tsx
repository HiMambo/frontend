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
}

export function DateRangeSelect({ 
  label = "Dates", 
  value, 
  onChange,
  layout = "vertical",
  containerClassName = "",
  labelClassName = "",
  buttonClassName = ""
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [tempDate, setTempDate] = useState<DateRange | undefined>()

  const defaultContainerClass = layout === "horizontal" 
    ? "flex items-center gap-2" 
    : ""
  
  const defaultLabelClass = layout === "vertical" 
    ? "text-xs leading-none mb-3 h-3" 
    : "text-sm text-gray-600 whitespace-nowrap"
  
  const defaultButtonClass = layout === "vertical"
    ? "bg-white h-10 rounded-md items-center flex w-full bg-transparent border-none px-3 focus:outline-none"
    : "border border-gray-300 rounded-lg px-3 py-1 text-sm h-8 bg-white items-center flex bg-transparent focus:outline-none w-auto"

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
          <button className={`${defaultButtonClass} ${buttonClassName}`.trim()}>
            {value?.from ? (
              value.to ? (
                <span>
                  {format(value.from, "dd MMM yyyy")} - {format(value.to, "dd MMM yyyy")}
                </span>
              ) : (
                <span>{format(value.from, "dd MMM yyyy")} - ...</span>
              )
            ) : (
              <span>Pick a date range</span>
            )}
            {isOpen ? (
              <ChevronUp className="ml-1 h-5 w-5 text-primary" />
            ) : (
              <ChevronDown className="ml-1 h-5 w-5 text-primary" />
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-white">
          <Calendar
            className="text-black"
            mode="range"
            selected={tempDate}
            onSelect={setTempDate}
          />
          <div className="flex justify-end gap-x-2 pr-2 pb-2">
            <Button
              variant="outline"
              onClick={() => setTempDate(undefined)}
            >
              Reset
            </Button>
            <Button
              variant="default"
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