"use client";

import AccountStepper from "@/components/PartnerOnboarding/AccountStepper";
import { ExperienceFormA } from "@/components/PartnerOnboarding/ExperienceFormA";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronUp, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

/* ───────── helpers ───────── */
const NEXT_STEP = "/register-experience/success";

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
    <div className="inline-flex items-center border border-neutral-300 rounded-lg overflow-hidden bg-white">
      <button
        type="button"
        className="w-9 h-10 grid place-items-center hover:bg-neutral-100"
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
        className="w-9 h-10 grid place-items-center hover:bg-neutral-100"
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
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-xl shadow-sm ring-1 ring-black/5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full h-14 px-4 flex items-center justify-between"
      >
        <span className="text-lg font-semibold text-[#4B2C20]">{title}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-neutral-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-neutral-600" />
        )}
      </button>

      {open ? (
        <div className="px-4 pb-4 text-sm text-neutral-700">{children}</div>
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
  const router = useRouter();

  return (
    <>
      <Header />
      <section className="bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10">
          {/* stepper */}
          <div className="mb-6 md:mb-10">
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

          {/* top card */}
          <div className="bg-[#FAF8F5] rounded-2xl shadow-sm ring-1 ring-black/5 p-6 max-w-4xl mx-auto">
            <header className="space-y-3">
              <h2 className="text-2xl md:text-3xl font-bold text-[#4B2C20] leading-tight">
                Experience Registration
              </h2>
              <p className="text-sm md:text-base text-neutral-800">
                Please provide details about the tourism experiences or services
                your business offers. This information helps us showcase your
                offerings accurately on the HiMambo platform and connect you
                with the right customers.
              </p>
            </header>

            <div className="mt-6 space-y-2">
              <p className="text-lg font-semibold text-[#4B2C20]">
                Do you want to get HiMambo Certified?
              </p>
              <p className="text-sm text-neutral-800">
                Add at least 3 experiences and you will be automatically
                verified if all of them meet our internal sustainability
                standards. Our HiMambo Certification is free of charge.
              </p>
            </div>

            {/* stepper BELOW as in design */}
            <div className="mt-6">
              <Label className="block text-xs text-neutral-600 mb-1">
                How many experiences would you like to register?
              </Label>
              <NumberStepper
                value={count}
                onChange={setCount}
                min={1}
                max={3}
              />
              <div className="text-[11px] text-neutral-600 mt-1">
                {count} {label}
              </div>
            </div>
          </div>

          {/* accordions */}
          <div className="mt-6 space-y-4 max-w-4xl mx-auto">
            <ExpandRow title="Experience A" defaultOpen>
              <ExperienceFormA />
            </ExpandRow>
            <ExpandRow title="Experience B" />
            <ExpandRow title="Experience C" />
          </div>

          {/* submit button */}
          <div className="mt-6 max-w-4xl mx-auto">
            <Button
              onClick={() => router.push(NEXT_STEP)}
              className="w-full h-12 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-white font-semibold"
            >
              Submit Experience &amp; Finish Registration
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
