"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Minus, Plus, Save, Trash2, Upload } from "lucide-react";
import { useState } from "react";

/* ───────── helpers ───────── */

function GuestsStepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="inline-flex items-center border border-neutral-300 rounded-md overflow-hidden">
      <button
        type="button"
        className="w-9 h-9 grid place-items-center hover:bg-neutral-100"
        onClick={() => onChange(Math.max(1, value - 1))}
      >
        <Minus className="w-4 h-4" />
      </button>
      <div className="px-3 h-9 grid place-items-center text-sm font-medium w-10">
        {value}
      </div>
      <button
        type="button"
        className="w-9 h-9 grid place-items-center hover:bg-neutral-100"
        onClick={() => onChange(value + 1)}
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}

/* ───────── form ───────── */

export function ExperienceFormA() {
  const [guests, setGuests] = useState(1);
  const [refundable, setRefundable] = useState("yes");

  return (
    <form className="space-y-12 text-neutral-800">
      {/* ───────── Basic Info + Description ───────── */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* LEFT: Basic Info */}
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 font-semibold text-primary text-lg">
            <span>📝</span> Basic Information
          </h3>

          <div>
            <Label className="text-sm text-neutral-700">
              Select the experience Category
            </Label>
            <select className="mt-1 block w-full rounded-lg border border-neutral-200 bg-neutral-50 p-2 text-sm focus:ring-2 focus:ring-primary">
              <option>Nature & Wildlife</option>
              <option>Culture & Heritage</option>
              <option>Food & Drink</option>
              <option>Adventure</option>
            </select>
          </div>

          <div>
            <Label className="text-sm text-neutral-700">
              Heading (max 50 characters)
            </Label>
            <Input
              placeholder="Traditional Indigo Weaving with Artisans"
              maxLength={50}
              className="bg-neutral-50"
            />
          </div>

          <div>
            <Label className="text-sm text-neutral-700">Country</Label>
            <select className="mt-1 block w-full rounded-lg border border-neutral-200 bg-neutral-50 p-2 text-sm focus:ring-2 focus:ring-primary">
              <option>Select one</option>
              <option>Vietnam</option>
              <option>Germany</option>
              <option>Italy</option>
            </select>
          </div>

          <div>
            <Label className="text-sm text-neutral-700">Location</Label>
            <Input placeholder="Sapa, Vietnam" className="bg-neutral-50" />
          </div>
        </div>

        {/* RIGHT: Description */}
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 font-semibold text-primary text-lg">
            <span>📄</span> Description
          </h3>

          <div>
            <Label className="text-sm text-neutral-700">
              Long Description (max 400 characters)
            </Label>
            <Textarea
              rows={6}
              maxLength={400}
              className="bg-neutral-50"
              placeholder="Join local artisans in a vibrant village..."
            />
          </div>

          <h3 className="font-semibold text-primary">Additional Details</h3>

          <div className="flex items-center justify-between">
            <Label className="text-sm text-neutral-700">Max # of Guests</Label>
            <GuestsStepper value={guests} onChange={setGuests} />
          </div>

          <div>
            <Label className="text-sm text-neutral-700">Refundable</Label>
            <div className="flex gap-6 mt-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  checked={refundable === "yes"}
                  onChange={() => setRefundable("yes")}
                />
                Yes
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  checked={refundable === "no"}
                  onChange={() => setRefundable("no")}
                />
                No
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* ───────── Pricing + Other Sections in 2 Columns ───────── */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* LEFT COLUMN */}
        <div className="space-y-4">
          <div>
            <Label className="text-sm text-neutral-700">Price per person</Label>
            <div className="flex items-center border rounded-lg bg-neutral-50 px-3 py-2">
              <span className="text-sm text-neutral-600 mr-1">€</span>
              <Input
                type="number"
                placeholder="80.00"
                className="border-none bg-neutral-50 flex-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label className="text-sm text-neutral-700">Weeks</Label>
              <Input type="number" defaultValue={3} className="bg-neutral-50" />
            </div>
            <div>
              <Label className="text-sm text-neutral-700">Days per week</Label>
              <Input type="number" defaultValue={4} className="bg-neutral-50" />
            </div>
            <div>
              <Label className="text-sm text-neutral-700">Hours per Day</Label>
              <Input
                type="number"
                defaultValue={4.5}
                step={0.5}
                className="bg-neutral-50"
              />
            </div>
          </div>

          <div>
            <Label className="text-sm text-neutral-700">
              Short Description (max 150 characters)
            </Label>
            <Input
              maxLength={150}
              placeholder="Step into a world of color and tradition..."
              className="bg-neutral-50"
            />
          </div>

          <div>
            <Label className="text-sm text-neutral-700">
              SDGs the experience meets
            </Label>
            <select
              multiple
              className="mt-1 block w-full rounded-lg border border-neutral-200 bg-neutral-50 p-2 text-sm focus:ring-2 focus:ring-primary"
            >
              <option>Climate Action</option>
              <option>Life on Land</option>
              <option>Responsible Consumption</option>
              <option>Gender Equality</option>
            </select>
          </div>

          <div>
            <Label className="text-sm text-neutral-700">Special Feature</Label>
            <Input
              placeholder="Take your DIY woven item home"
              className="bg-neutral-50"
            />
          </div>

          <div>
            <Label className="text-sm text-neutral-700">
              Hero Image (4:3 ratio / 1280x960 px)
            </Label>
            <div className="flex items-center gap-2 border-2 border-dashed border-neutral-300 rounded-lg p-3 bg-neutral-50">
              <Upload className="w-4 h-4 text-neutral-500" />
              <span className="text-sm text-neutral-500">
                Imageplaceholder.png
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4">
          <div>
            <Label className="text-sm text-neutral-700">
              How long does it take?
            </Label>
            <select className="mt-1 block w-full rounded-lg border border-neutral-200 bg-neutral-50 p-2 text-sm focus:ring-2 focus:ring-primary">
              <option>Select one</option>
              <option>1 hour</option>
              <option>Half day</option>
              <option>Full day</option>
              <option>Multiple days</option>
            </select>
          </div>

          <div>
            <Label className="text-sm text-neutral-700">Special Features</Label>
            <div className="border rounded-lg bg-neutral-50 p-2">
              <select className="w-full bg-neutral-50 text-sm">
                <option>Pet Friendly</option>
                <option>Family Friendly</option>
              </select>
            </div>
          </div>

          <div>
            <Label className="text-sm text-neutral-700">
              Gallery images (4:3 ratio / 1280x960 px)
            </Label>
            <Button
              variant="outline"
              type="button"
              className="bg-neutral-50 border-neutral-300 w-full"
            >
              Upload max 10 PNGs / JPEGs
            </Button>
          </div>

          <div>
            <Label className="text-sm text-neutral-700">
              Video (max 5 min)
            </Label>
            <div className="flex items-center gap-2 border rounded-lg p-3 bg-neutral-50">
              <Upload className="w-4 h-4 text-neutral-500" />
              <span className="text-sm text-neutral-500">
                Imageplaceholder.mp4
              </span>
            </div>
          </div>

          <div>
            <Label className="text-sm text-neutral-700">
              About your Business
            </Label>
            <Textarea
              rows={5}
              className="bg-neutral-50"
              placeholder="The heart of this experience lies with the Hmong community..."
            />
          </div>
        </div>
      </div>
      {/* Actions */}
      {/* Actions */}
      <div className="flex justify-between items-center w-full mt-6">
        <Button
          type="button"
          className="flex items-center gap-2 border border-[#c4c0b5] text-[#7c786d] bg-transparent hover:bg-[#f5f3ef] rounded-lg px-6 py-2"
        >
          Delete Experience
          <Trash2 className="w-4 h-4" />
        </Button>

        <Button
          type="submit"
          className="flex items-center gap-2 bg-[#a9c97d] hover:bg-[#99b86d] text-white rounded-lg px-6 py-2"
        >
          Save changes
          <Save className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
}
