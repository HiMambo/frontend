"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

// const NEXT_STEP = "/register-experience/documents";

const COUNTRIES = [
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "PT", name: "Portugal", flag: "🇵🇹" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "KE", name: "Kenya", flag: "🇰🇪" },
  { code: "TZ", name: "Tanzania", flag: "🇹🇿" },
  { code: "MA", name: "Morocco", flag: "🇲🇦" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦" },
];

const CATEGORIES = [
  "Nature & Wildlife",
  "Cultural Immersion",
  "Adventure & Outdoor",
  "Social Impact",
  "Food & Gastronomy",
  "Wellness",
  "Arts & Crafts",
  "Water Sports",
  "City Tours",
];

export default function BusinessDetailsForm() {
  const router = useRouter();

  const [businessName, setBusinessName] = useState("");
  const [website, setWebsite] = useState("");
  const [country, setCountry] = useState<string>("DE");
  const [address, setAddress] = useState("");
  const [yearFounded, setYearFounded] = useState<string>(
    new Date().getFullYear().toString()
  );
  const [category, setCategory] = useState<string | undefined>();

  // Decorative initials badge (like your mock)
  const initials = useMemo(() => {
    const parts = businessName.trim().split(/\s+/);
    return (
      parts
        .slice(0, 2)
        .map((p) => p[0]?.toUpperCase() ?? "")
        .join("") || "EM"
    );
  }, [businessName]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: persist to API later

    router.push("/register-experience/documents");
  }

  return (
    <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-400 relative">
      {/* Badge */}
      <div className="hidden md:block absolute right-400 -top-200">
        <div className="w-1200 h-1200 rounded-1000 bg-neutral-100 grid place-items-center text-terracotta-900 font-semibold text-400">
          {initials}
        </div>
      </div>

      {/* Business Name */}
      <div>
        <Label htmlFor="businessName">Business Name *</Label>
        <Input
          id="businessName"
          placeholder="HiMambo"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          required
          className="mt-150"
        />
      </div>

      {/* Website / Social */}
      <div>
        <Label htmlFor="website">Business Website / Social Media</Label>
        <Input
          id="website"
          placeholder="www.himambo.com"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="mt-150"
          inputMode="url"
        />
      </div>

      {/* Country */}
      <div>
        <Label>Main country of operation *</Label>
        <Select value={country} onValueChange={setCountry}>
          <SelectTrigger className="mt-150">
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            {COUNTRIES.map((c) => (
              <SelectItem key={c.code} value={c.code}>
                <span className="mr-200">{c.flag}</span>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Address */}
      <div>
        <Label htmlFor="address">Business Address *</Label>
        <Input
          id="address"
          placeholder="Somewhere over the rainbow 33"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="mt-150"
        />
      </div>

      {/* Year Founded */}
      <div>
        <Label htmlFor="yearFounded">Year Founded *</Label>
        <Input
          id="yearFounded"
          type="number"
          inputMode="numeric"
          min={1800}
          max={new Date().getFullYear()}
          value={yearFounded}
          onChange={(e) => setYearFounded(e.target.value)}
          required
          className="mt-150 no-spinner"
        />
      </div>

      {/* Category */}
      <div>
        <Label>Select Category *</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="mt-150">
            <SelectValue placeholder="Business Category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Submit */}
      <div className="md:col-span-2">
        <Button
          type="submit"
          disabled={
            !businessName || !address || !yearFounded || !country || !category
          }
          className="w-full bg-yellow-500 hover:bg-yellow-400 text-white rounded-300 h-1200"
        >
          Register Business
        </Button>
      </div>
    </form>
  );
}
