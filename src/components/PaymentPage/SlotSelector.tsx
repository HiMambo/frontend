import { useCart } from "@/context/Cart";
import { useExperienceSlots } from "@/hooks/useExperienceSlots";
import { Check, X } from "lucide-react";
import { format, parseISO } from "date-fns";
import { type ExperienceSlot } from "@/lib/api";
import { useEffect } from "react";

export const SlotSelector = () => {
  const { cartExperience, selectedSlot, setSelectedSlot } = useCart();
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
    validateAndClearSlotIfInvalid(selectedSlot, setSelectedSlot);
  }, [availableSlots, validateAndClearSlotIfInvalid, selectedSlot, setSelectedSlot]);

  // Handle slot selection with availability check
  const handleSlotSelection = async (slot: ExperienceSlot) => {
    const success = await checkSlotAvailabilityAndSelect(slot.id, setSelectedSlot);
    if (!success) {
      console.warn("Slot is no longer available");
    }
  };

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
      <div className="p-4 border rounded-lg bg-gray-50">
        <p className="text-gray-600">Please select an experience first</p>
      </div>
    );
  }

  if (slotsLoading || isCheckingAvailability) {
    return (
      <div className="p-4 border rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
          <span>
            {slotsLoading ? "Loading available time slots..." : "Checking slot availability..."}
          </span>
        </div>
      </div>
    );
  }

  if (slotsError) {
    return (
      <div className="p-4 border rounded-lg bg-red-50 border-red-200">
        <p className="text-red-600">Error loading slots: {slotsError}</p>
        <button 
          onClick={() => cartExperience && refetchSlots()}
          className="mt-2 text-red-700 underline hover:no-underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (allSlots.length === 0) {
    return (
      <div className="p-4 border rounded-lg bg-yellow-50 border-yellow-200">
        <p className="text-yellow-800">No time slots found for this experience.</p>
        <p className="text-sm text-yellow-600 mt-1">Please check back later or contact support.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Select Time Slot</h3>
        <div className="text-sm text-gray-600">
          <span className="text-green-600 font-medium">{availableSlots.length} available</span>
          {unavailableSlots.length > 0 && (
            <span className="ml-2 text-gray-500">
              • {unavailableSlots.length} unavailable
            </span>
          )}
        </div>
      </div>

      {availableSlots.length === 0 && unavailableSlots.length > 0 && (
        <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <p className="text-orange-800 text-sm">
            All upcoming slots are currently unavailable. Check the dates below to see when new slots might open up.
          </p>
        </div>
      )}

      <div className="space-y-2">
        {[...allSlots]
          .sort((a, b) => new Date(a.start_datetime).getTime() - new Date(b.start_datetime).getTime())
          .map((slot) => {
            const { dateStr, timeRange, spotsAvailable, isLowCapacity } = formatSlotDisplay(slot);
            const isSelected = selectedSlot?.id === slot.id;
            const isAvailable = availableSlots.some(s => s.id === slot.id);
            const unavailableReason = !isAvailable ? getUnavailableReason(slot) : null;

            return (
              <div
                key={slot.id}
                className={`
                  p-4 border rounded-lg transition-all duration-200
                  ${isSelected 
                    ? 'border-primary/40 bg-primary/5 ring-2 ring-primary/20' 
                    : isAvailable
                      ? 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer'
                      : 'border-gray-200 bg-gray-50 opacity-75'
                  }
                  ${isCheckingAvailability ? 'pointer-events-none opacity-60' : ''}
                `}
                onClick={() => isAvailable && !isCheckingAvailability && handleSlotSelection(slot)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className={`font-medium ${isAvailable ? 'text-gray-900' : 'text-gray-600'}`}>
                        {dateStr}
                      </h4>
                      {isLowCapacity && isAvailable && (
                        <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
                          Only {spotsAvailable} spots left
                        </span>
                      )}
                      {!isAvailable && (
                        <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                          {unavailableReason}
                        </span>
                      )}
                    </div>
                    <p className={`text-sm mt-1 ${isAvailable ? 'text-gray-600' : 'text-gray-500'}`}>
                      {timeRange}
                    </p>
                    <p className={`text-sm mt-1 ${isAvailable ? 'text-gray-500' : 'text-gray-400'}`}>
                      {isAvailable 
                        ? `${spotsAvailable} of ${slot.max_spots} spots available`
                        : `${slot.max_spots - slot.booked_spots} of ${slot.max_spots} spots available`
                      }
                    </p>
                    {slot.notes && (
                      <p className={`text-sm mt-2 italic ${isAvailable ? 'text-gray-600' : 'text-gray-500'}`}>
                        {slot.notes}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {isSelected && isAvailable && (
                      <div className="w-5 h-5 bg-primary/90 rounded-full flex items-center justify-center">
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
};