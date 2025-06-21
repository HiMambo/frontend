import { ChevronUp, ChevronDown } from "lucide-react"
import { Check } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"

interface SelectorProps {
  label: string
  options: string[]
  value: string
  setValue: (val: string) => void
  formatLabel?: (option: string) => string  
}

export function CustomSelect({ 
  label,
  options,
  value,
  setValue,
  formatLabel = (o) => o,
}: SelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <p className="text-xs leading-none mb-1 h-3">{label}</p>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            className="flex w-full font-semibold bg-transparent border-none p-0 h-auto focus:outline-none"
          >
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
            const isSelected = value === option
            return (
              <button
                key={option}
                onClick={() => {
                setValue(option)
                setIsOpen(false)
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-100/80 ${
                isSelected ? "bg-gray-100/50 font-medium" : ""
                }`}
              >
              <Check className={`text-primary h-4 w-4 text-black ml-2" ${
                isSelected ? "opacity:100" : "opacity-0"
                }`}
              />
              <span>{formatLabel(option)}</span>
            </button>
            )
        })}
        </PopoverContent>
      </Popover>
    </div>
  )
}
