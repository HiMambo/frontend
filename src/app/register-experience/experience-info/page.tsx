"use client";

import AccountStepper from "@/components/PartnerOnboarding/AccountStepper";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronUp, Minus, Plus } from "lucide-react";
import { useMemo, useState } from "react";

/* ───────── helpers ───────── */

function NumberStepper({
  value,
  onChange,
  min = 1,
  max = 3,
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="inline-flex items-center border border-neutral-200 rounded-300 overflow-hidden">
      <button
        type="button"
        className="w-9 h-10 grid place-items-center hover:bg-neutral-50"
        onClick={() => onChange(Math.max(min, value - 1))}
        aria-label="decrease"
      >
        <Minus className="w-4 h-4" />
      </button>
      <div className="px-3 h-10 grid place-items-center text-sm font-medium w-12">
        {value}
      </div>
      <button
        type="button"
        className="w-9 h-10 grid place-items-center hover:bg-neutral-50"
        onClick={() => onChange(Math.min(max, value + 1))}
        aria-label="increase"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}

function ExpandRow({
  title,
  defaultOpen = false,
}: {
  title: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-800 shadow-sm ring-1 ring-black/5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full h-14 px-300 flex items-center justify-between"
      >
        <span className="text-lg font-semibold text-primary">{title}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-neutral-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-neutral-600" />
        )}
      </button>
      {open ? (
        <div className="px-300 pb-300 text-sm text-neutral-600">
          {/* empty for now */}
        </div>
      ) : null}
    </div>
  );
}

/* ───────── page ───────── */

export default function ExperienceInfoPage() {
  const [count, setCount] = useState(3);
  const label = useMemo(
    () => (count === 1 ? "experience" : "experiences"),
    [count]
  );

  return (
    <>
      <Header />
      <section className="bg-neutral-50">
        {/* match Documents page paddings */}
        <div className="max-w-6xl mx-auto px-400 md:px-600 py-400 md:py-600">
          {/* stepper spacing matches */}
          <div className="mb-400 md:mb-600">
            <AccountStepper
              steps={[
                "Create Account",
                "Business Details",
                "Documents",
                "Experience Info",
                "Go Online",
              ]}
              activeIndex={3}
            />
          </div>

          {/* top card — narrow, centered, tight rhythm */}
          <div className="bg-white rounded-800 shadow-sm ring-1 ring-black/5 p-300 md:p-400 max-w-4xl mx-auto">
            <header>
              <h2 className="text-2xl md:text-3xl font-semibold text-primary leading-tight">
                Experience Registration
              </h2>
              <p className="text-sm md:text-base text-neutral-700 mt-100">
                Please provide details about the tourism experiences or services
                your business offers. This information helps us showcase your
                offerings accurately on the HiMambo platform and connect you
                with the right customers.
              </p>
            </header>

            <div className="mt-300 grid md:grid-cols-[1fr_auto]  items-start">
              <div>
                <p className="text-primary font-semibold mb-050">
                  Do you want to get HiMambo Certified?
                </p>
                <p className="text-sm text-neutral-700">
                  Add at least 3 experiences and you will be automatically
                  verified if all of them meet our internal sustainability
                  standards. Our HiMambo Certification is free of charge
                </p>
              </div>

              <div className="justify-self-end">
                <Label className="block text-xs text-neutral-600 mb-050">
                  How many experiences would you like to register?
                </Label>
                <NumberStepper
                  value={count}
                  onChange={setCount}
                  min={1}
                  max={3}
                />
                <div className="text-[11px] text-neutral-600 mt-050 text-right">
                  {count} {label}
                </div>
              </div>
            </div>
          </div>

          {/* accordions — same max width as card */}
          <div className="mt-300 space-y-200 max-w-4xl mx-auto">
            <ExpandRow title="Experience A" defaultOpen />
            <ExpandRow title="Experience B" />
            <ExpandRow title="Experience C" />
          </div>

          {/* submit — same width */}
          <div className="mt-300 max-w-4xl mx-auto">
            <Button className="w-full h-12 rounded-300 bg-yellow-500 hover:bg-yellow-400 text-white">
              Submit Experience &amp; Finish Registration
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
