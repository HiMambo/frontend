"use client";

import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Image from "next/image";
import SearchBox from "@/components/HomePage/SearchBox";
import { FeaturedExperiencesCarousel } from "@/components/HomePage/FeaturedExperiencesCarousel";
import { useExperiences } from "@/hooks/useExperiences";

export default function Home(){
  
  const { experiences, loading, error } = useExperiences(); //Placeholder until we can fetch featured experiences.

  return (
    <>
      <Header />
      <main className="relative pb-20">
        {/* Hero Image */}
        <div className="w-full relative">
          <Image
            src="/hero.png"
            alt="Hero"
            width={1919}
            height={809}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Search Box */}
        <div className="-mt-9 relative z-10">
          <SearchBox />
        </div>

        {/* Featured Experiences Section */}
        <section className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-20">
            <h2 className="text-2xl font-bold text-primary tracking-wide">Choose your package</h2>
            <p className="text-4xl font-semibold text-black mt-3 tracking-wider">Select the best experience for you!</p>
          </div>

          <FeaturedExperiencesCarousel
            experiences={experiences}
            loading={loading}
            error={error}
          />
        </section>
      </main>
      <Footer variant="home" />
    </>
  );
}
