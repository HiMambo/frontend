import { useState, useEffect, useCallback } from 'react';
import { fetchExperienceSlots, type ExperienceSlot } from '@/lib/api';

export const useExperienceSlots = (experienceId: number | null) => {
  const [availableSlots, setAvailableSlots] = useState<ExperienceSlot[]>([]);
  const [unavailableSlots, setUnavailableSlots] = useState<ExperienceSlot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState<boolean>(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState<boolean>(false);

  const fetchSlots = useCallback(async (id: number) => {
    setSlotsLoading(true);
    setSlotsError(null);
    
    try {
      const slots = await fetchExperienceSlots(id);
      const now = new Date();
      
      // Filter slots into available and unavailable
      const availableSlots = slots.filter(slot =>
        slot.status === "open" &&
        new Date(slot.start_datetime) > now &&
        slot.booked_spots < slot.max_spots
      );
      
      const unavailableSlots = slots.filter(slot =>
        new Date(slot.start_datetime) > now &&
        (slot.status === "full" || slot.booked_spots >= slot.max_spots || slot.status === "canceled")
      );
      
      setAvailableSlots(availableSlots);
      setUnavailableSlots(unavailableSlots);
      
    } catch (error) {
      console.error("Error fetching slots:", error);
      setSlotsError(error instanceof Error ? error.message : "Unknown error");
      setAvailableSlots([]);
      setUnavailableSlots([]);
    } finally {
      setSlotsLoading(false);
    }
  }, []);

  // Auto-fetch slots when experience ID changes
  useEffect(() => {
    if (experienceId) {
      fetchSlots(experienceId);
    } else {
      setAvailableSlots([]);
      setUnavailableSlots([]);
      setSlotsError(null);
    }
  }, [experienceId, fetchSlots]);

  const refetchSlots = useCallback(() => {
    if (experienceId) {
      fetchSlots(experienceId);
    }
  }, [experienceId, fetchSlots]);

  // Function to validate selected slot and clear if invalid
  const validateAndClearSlotIfInvalid = useCallback((
    selectedSlot: ExperienceSlot | null, 
    setSelectedSlot: (slot: ExperienceSlot | null) => void
  ) => {
    if (selectedSlot && !availableSlots.find(slot => slot.id === selectedSlot.id)) {
      setSelectedSlot(null);
      return false; // Slot was cleared
    }
    return true; // Slot is still valid
  }, [availableSlots]);

  // Function to check slot availability before selection
  const checkSlotAvailabilityAndSelect = useCallback(async (
    slotId: number,
    setSelectedSlot: (slot: ExperienceSlot | null) => void
  ): Promise<boolean> => {
    if (!experienceId) return false;
    
    setIsCheckingAvailability(true);
    
    try {
      // Fetch fresh slot data
      const slots = await fetchExperienceSlots(experienceId);
      const now = new Date();
      
      // Find the specific slot and check if it's still available
      const targetSlot = slots.find(slot => slot.id === slotId);
      
      if (!targetSlot) {
        console.warn(`Slot ${slotId} not found`);
        return false;
      }
      
      const isStillAvailable = 
        targetSlot.status === "open" &&
        new Date(targetSlot.start_datetime) > now &&
        targetSlot.booked_spots < targetSlot.max_spots;
      
      if (isStillAvailable) {
        setSelectedSlot(targetSlot);
        return true;
      } else {
        console.warn(`Slot ${slotId} is no longer available`);
        // Refresh the slots data to show updated availability
        await fetchSlots(experienceId);
        return false;
      }
    } catch (error) {
      console.error("Error checking slot availability:", error);
      return false;
    } finally {
      setIsCheckingAvailability(false);
    }
  }, [experienceId, fetchSlots]);

  return {
    availableSlots,
    unavailableSlots,
    slotsLoading,
    slotsError,
    refetchSlots,
    validateAndClearSlotIfInvalid,
    checkSlotAvailabilityAndSelect,
    isCheckingAvailability,
  };
};