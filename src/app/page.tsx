"use client";

import { useEffect, useState } from "react";
import ExperienceCard from "@/components/ExperienceCard";
import FilterSidebar from "@/components/FilterSidebar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Search from "@/components/Search";
import SearchControls from "@/components/SearchControls";
import { fetchExperiences } from "@/lib/api";
import { useCart } from "@/context/Cart";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

// Define the type for an Experience object
interface Experience {
  id: number;
  name: string;
  experience_description: string;
  experience_price: string;
  experience_promo_image: string;
  experience_city: string;
  experience_country: string;
  rating_avg: number;
  sustainability_goal: string[];
}

export default function Home() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const { setPax, setBookingDate } = useCart();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchExperiences();
        setExperiences(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching experiences:", err);
        setError("Failed to load experiences. Please try again later.");
      }
    };

    fetchData();
    setPax(2);
    const hardcodedDate = new Date("2025-06-13T09:30:00Z");
    setBookingDate(hardcodedDate);
  }, [setPax, setBookingDate]);

  return (
    <>
      <Header />
      <Search />
      <SearchControls />
      <main className="bg-white min-h-screen p-4 sm:p-6 md:p-8 xl:p-12">
        {/* Filter Toggle for Mobile */}
        <div className="xl:hidden mb-4 flex justify-end">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[90vw] sm:w-[400px] overflow-auto">
              <SheetHeader>
                <SheetTitle>Filter Experiences</SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                <FilterSidebar />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 xl:gap-8 gap-4">
          {/* Filter Sidebar - visible only on large screens */}
          <div className="hidden xl:block xl:col-span-1">
            <FilterSidebar />
          </div>

          {/* Experience Cards */}
          <div className="xl:col-span-3 flex flex-col gap-8">
            {error ? (
              <div className="text-red-500 text-center">{error}</div>
            ) : (
              experiences.map((exp) => (
                <ExperienceCard
                  key={exp.id}
                  id={exp.id}
                  title={exp.name}
                  price={parseFloat(exp.experience_price)}
                  location={`${exp.experience_city}, ${exp.experience_country}`}
                  image={exp.experience_promo_image}
                  description={exp.experience_description}
                  discount={null}
                  rating={exp.rating_avg}
                  sustainabilityGoal={exp.sustainability_goal}
                />
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
