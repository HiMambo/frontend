"use client";

import { Button } from "@/components/ui/button";
import CenteredCard from "./CenteredCard";
import { SlotSelector } from "./SlotSelector";

interface SlotFormProps {
  onComplete: () => void;
  onBack: () => void;
}

export function SlotForm({
  onComplete,
  onBack,
}: SlotFormProps) {

  return (
    <div>
      <CenteredCard>
        <div className="space-y-4">
          
          <SlotSelector />

          {/* Back button */}
          <Button
            onClick={onBack}
            variant="outline"
            className="w-full"
          >
            Back to Guest Details
          </Button>

          {/* Next Button */}
          <Button
            className="w-full"
            onClick={onComplete}
          >
            Proceed to add payment details
          </Button>
        </div>
      </CenteredCard>
    </div>
  );
}