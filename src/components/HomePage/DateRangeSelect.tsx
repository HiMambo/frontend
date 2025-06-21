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
}

export function DateRangeSelect({ label = "Dates", value, onChange }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [tempDate, setTempDate] = useState<DateRange | undefined>()

  return (
    <div>
      <p className="text-xs leading-none mb-1 h-3">{label}</p>
      <Popover
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open)
          if (open) setTempDate(value)
        }}
      >
        <PopoverTrigger asChild>
          <button className="flex w-full font-semibold bg-transparent border-none p-0 h-auto focus:outline-none">
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
