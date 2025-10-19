import { useExperienceSlots } from "@/hooks/useExperienceSlots";
import { useSteps } from "@/context/BookingStepsContext";
import { useBooking } from "@/context/BookingContext";
import { Check, X } from "lucide-react";
import { format, parseISO } from "date-fns";
import { type ExperienceSlot } from "@/lib/api";
import { useEffect } from "react";

export function SlotSelector() {
  const { cartExperience, bookingState, setSelectedSlot } = useBooking();
  const { setIsValid, setValidationError } = useSteps();
  const { 
    availableSlots,
    unavailableSlots,
    slotsLoading,
    slotsError,
    refetchSlots,
    validateAndClearSlotIfInvalid,
    checkSlotAvailabilityAndSelect,
    isCheckingAvailability,
  } = useExperienceSlots(cartExperience?.id || null);

  // Validate selected slot whenever available slots change
  useEffect(() => {
    if (!slotsLoading && availableSlots.length > 0) {
      validateAndClearSlotIfInvalid(bookingState.selectedSlot, setSelectedSlot);
    }
  }, [slotsLoading, availableSlots, validateAndClearSlotIfInvalid, bookingState.selectedSlot, setSelectedSlot]);

  // Handle slot selection with availability check
  const handleSlotSelection = async (slot: ExperienceSlot) => {
    const success = await checkSlotAvailabilityAndSelect(slot.id, setSelectedSlot);
    if (!success) {
      console.warn("Slot is no longer available");
    }
  };

  // Step validations
  useEffect(() => {
    if (!bookingState.selectedSlot && !isCheckingAvailability) {
      setIsValid(false);
      setValidationError("No time slot selected.");
    } else {
      setIsValid(true);
      setValidationError(null);
    }
  }, [bookingState.selectedSlot, setIsValid, setValidationError, isCheckingAvailability]);

  // Helper function to format slot display
  const formatSlotDisplay = (slot: ExperienceSlot) => {
    const startDate = parseISO(slot.start_datetime);
    const endDate = parseISO(slot.end_datetime);
    
    const dateStr = format(startDate, "MMM dd, yyyy");
    const startTime = format(startDate, "HH:mm");
    const endTime = format(endDate, "HH:mm");
    
    const spotsAvailable = slot.max_spots - slot.booked_spots;
    
    return {
      dateStr,
      timeRange: `${startTime} - ${endTime}`,
      spotsAvailable,
      isLowCapacity: spotsAvailable <= 3 && spotsAvailable > 0
    };
  };

  // Helper function to get unavailable slot reason
  const getUnavailableReason = (slot: ExperienceSlot) => {
    if (slot.status === "canceled") return "Canceled";
    if (slot.status === "full" || slot.booked_spots >= slot.max_spots) return "Fully Booked";
    return "Unavailable";
  };

  // Combine and sort all slots by date
  const allSlots = [...availableSlots, ...unavailableSlots].sort((a, b) => 
    new Date(a.start_datetime).getTime() - new Date(b.start_datetime).getTime()
  );

  if (!cartExperience) {
    return (
      <div className="flex flex-col bg-surface gap-[var(--spacing-1000)] p-[var(--spacing-600)] items-center w-full">
        <h2 className="heading-h5-light text-secondary text-center border-b-2 border-[var(--text-disabled)] py-[var(--spacing-600)] w-full">
          Select Time Slot
        </h2>
        <p className="body-m text-tertiary">Please select an experience first</p>
      </div>
    );
  }

  if (slotsLoading || isCheckingAvailability) {
    return (
      <div className="flex flex-col bg-surface gap-[var(--spacing-1000)] p-[var(--spacing-600)] items-center w-full">
        <h2 className="heading-h5-light text-secondary text-center border-b-2 border-[var(--text-disabled)] py-[var(--spacing-600)] w-full">
          Select Time Slot
        </h2>
        <div className="flex flex-col items-center gap-[var(--spacing-600)]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="body-m text-tertiary">
            {slotsLoading ? "Loading available time slots..." : "Checking slot availability..."}
          </span>
        </div>
      </div>
    );
  }

  if (slotsError) {
    return (
      <div className="flex flex-col bg-surface gap-[var(--spacing-1000)] p-[var(--spacing-600)] items-center w-full">
        <h2 className="heading-h5-light text-secondary text-center border-b-2 border-[var(--text-disabled)] py-[var(--spacing-600)] w-full">
          Select Time Slot
        </h2>
        <div className="flex flex-col items-center gap-[var(--spacing-600)]">
          <p className="body-m text-red-600">Error loading slots: {slotsError}</p>
          <button 
            onClick={() => cartExperience && refetchSlots()}
            className="body-m text-primary hover:text-[var(--terracotta-600)] hover:underline hover:cursor-pointer"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (allSlots.length === 0) {
    return (
      <div className="flex flex-col bg-surface gap-[var(--spacing-1000)] p-[var(--spacing-600)] items-center w-full">
        <h2 className="heading-h5-light text-secondary text-center border-b-2 border-[var(--text-disabled)] py-[var(--spacing-600)] w-full">
          Select Time Slot
        </h2>
        <div className="flex flex-col items-center gap-[var(--spacing-400)]">
          <p className="body-m text-tertiary">No time slots found for this experience.</p>
          <p className="body-s text-disabled">Please check back later or contact support.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-surface gap-[var(--spacing-1000)] p-[var(--spacing-600)] items-center w-full">
      {/* Header */}
      <div className="w-full">
        <h2 className="heading-h5-light text-secondary text-center border-b-2 border-[var(--text-disabled)] py-[var(--spacing-600)]">
          Select Time Slot
        </h2>
        <div className="flex justify-center gap-[var(--spacing-400)] mt-[var(--spacing-600)]">
          <span className="body-s text-primary">
            <span className="font-medium">{availableSlots.length}</span> available
          </span>
          {unavailableSlots.length > 0 && (
            <>
              <span className="body-s text-disabled">•</span>
              <span className="body-s text-disabled">
                {unavailableSlots.length} unavailable
              </span>
            </>
          )}
        </div>
      </div>

      {/* No available slots warning */}
      {availableSlots.length === 0 && unavailableSlots.length > 0 && (
        <div className="w-full p-[var(--spacing-600)] bg-orange-50 border-2 border-orange-200 rounded-300">
          <p className="body-s text-orange-800 text-center">
            All upcoming slots are currently unavailable. Check the dates below to see when new slots might open up.
          </p>
        </div>
      )}

      {/* Slots list */}
      <div className="flex flex-col gap-[var(--spacing-600)] w-full px-[var(--spacing-800)]">
        {[...allSlots]
          .sort((a, b) => new Date(a.start_datetime).getTime() - new Date(b.start_datetime).getTime())
          .map((slot) => {
            const { dateStr, timeRange, spotsAvailable, isLowCapacity } = formatSlotDisplay(slot);
            const isSelected = bookingState.selectedSlot?.id === slot.id;
            const isAvailable = availableSlots.some(s => s.id === slot.id);
            const unavailableReason = !isAvailable ? getUnavailableReason(slot) : null;

            return (
              <div
                key={slot.id}
                className={`
                  p-[var(--spacing-600)] border-2 rounded-300 transition-all duration-200
                  ${isSelected 
                    ? 'border-[var(--teal-500)] bg-[var(--teal-500)]/2' 
                    : isAvailable
                      ? 'border-[var(--text-disabled)] hover:border-[var(--teal-500)]/40 hover:bg-surface-hover cursor-pointer'
                      : 'border-[var(--text-disabled)] bg-gray-50 opacity-75'
                  }
                  ${isCheckingAvailability ? 'pointer-events-none opacity-60' : ''}
                `}
                onClick={() => isAvailable && !isCheckingAvailability && handleSlotSelection(slot)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-[var(--spacing-400)] flex-wrap">
                      <h4 className={`body-l font-medium ${isAvailable ? 'text-secondary' : 'text-tertiary'}`}>
                        {dateStr}
                      </h4>
                      {isLowCapacity && isAvailable && (
                        <span className="px-[var(--spacing-400)] py-[var(--spacing-200)] body-s bg-orange-100 text-orange-800 rounded-full">
                          Only {spotsAvailable} spots left
                        </span>
                      )}
                      {!isAvailable && (
                        <span className="px-[var(--spacing-400)] py-[var(--spacing-200)] body-s bg-red-100 text-red-800 rounded-full">
                          {unavailableReason}
                        </span>
                      )}
                    </div>
                    <p className={`body-m mt-[var(--spacing-200)] ${isAvailable ? 'text-tertiary' : 'text-disabled'}`}>
                      {timeRange}
                    </p>
                    <p className={`body-s mt-[var(--spacing-200)] ${isAvailable ? 'text-disabled' : 'text-disabled'}`}>
                      {isAvailable 
                        ? `${spotsAvailable} of ${slot.max_spots} spots available`
                        : `${slot.max_spots - slot.booked_spots} of ${slot.max_spots} spots available`
                      }
                    </p>
                    {slot.notes && (
                      <p className={`body-s mt-[var(--spacing-400)] italic ${isAvailable ? 'text-tertiary' : 'text-disabled'}`}>
                        {slot.notes}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center ml-[var(--spacing-400)]">
                    {isSelected && isAvailable && (
                      <div className="w-5 h-5 bg-[var(--teal-500)] rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                    {!isAvailable && (
                      <div className="w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center">
                        <X className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
        })}
      </div>
    </div>
  );
}