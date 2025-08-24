/* ───────── ExperienceForm ───────── */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Textarea } from "../ui/textarea";

function GuestsStepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="inline-flex items-center border border-neutral-200 rounded-md overflow-hidden">
      <button
        type="button"
        className="w-9 h-9 grid place-items-center hover:bg-neutral-50"
        onClick={() => onChange(Math.max(1, value - 1))}
      >
        <Minus className="w-4 h-4" />
      </button>
      <div className="px-3 h-9 grid place-items-center text-sm font-medium w-10">
        {value}
      </div>
      <button
        type="button"
        className="w-9 h-9 grid place-items-center hover:bg-neutral-50"
        onClick={() => onChange(value + 1)}
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}

export function ExperienceFormA() {
  const [guests, setGuests] = useState(1);
  const [refundable, setRefundable] = useState("yes");

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-4">
      {/* Left side */}
      <div className="space-y-4">
        <h3 className="font-semibold text-primary flex items-center gap-2">
          <span>📝</span> Basic Information
        </h3>

        <div>
          <Label>Select the experience Category</Label>
          <select className="mt-1 block w-full border border-neutral-300 rounded-md p-2 text-sm">
            <option>Nature & Wildlife</option>
            <option>Culture & Heritage</option>
            <option>Food & Drink</option>
            <option>Adventure</option>
          </select>
        </div>

        <div>
          <Label>Heading (max 50 characters)</Label>
          <Input
            placeholder="Traditional Indigo Weaving with Artisans"
            maxLength={50}
          />
        </div>

        <div>
          <Label>Country</Label>
          <select className="mt-1 block w-full border border-neutral-300 rounded-md p-2 text-sm">
            <option>Select one</option>
            <option>Vietnam</option>
            <option>Germany</option>
            <option>Italy</option>
          </select>
        </div>

        <div>
          <Label>Location</Label>
          <Input placeholder="Sapa, Vietnam" />
        </div>
      </div>

      {/* Right side */}
      <div className="space-y-4">
        <h3 className="font-semibold text-primary flex items-center gap-2">
          <span>📄</span> Description
        </h3>
        <div>
          <Label>Long Description (max 400 characters)</Label>
          <Textarea
            rows={6}
            maxLength={400}
            placeholder="Join local artisans in a vibrant village to learn the ancient art..."
          />
        </div>

        <h3 className="font-semibold text-primary mt-4">Additional Details</h3>

        <div className="flex items-center justify-between">
          <Label>Max # of Guests</Label>
          <GuestsStepper value={guests} onChange={setGuests} />
        </div>

        <div>
          <Label>Refundable</Label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-1 text-sm">
              <input
                type="radio"
                name="refundable"
                value="yes"
                checked={refundable === "yes"}
                onChange={() => setRefundable("yes")}
              />
              Yes
            </label>
            <label className="flex items-center gap-1 text-sm">
              <input
                type="radio"
                name="refundable"
                value="no"
                checked={refundable === "no"}
                onChange={() => setRefundable("no")}
              />
              No
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
