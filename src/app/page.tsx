"use client";

import Header from "@/components/shared/Header/Header";
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
      <main className="relative pb-20 bg-white">
      {/* Hero with overlaid SearchBox */}
      <div className="relative w-full">
        <Image
          src="/hero.png"
          alt="Hero"
          width={1920}
          height={743}
          className="w-full h-auto"
          priority
        />

        {/* Search Box positioned at bottom center */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-10">
          <SearchBox />
        </div>
      </div>

        {/* Featured Experiences Section */}
        <section className="px-[var(--spacing-1600)] py-[var(--spacing-4000)]">
          <div className="text-center mb-[var(--spacing-4000)]">
            <h2 className="heading-h5-light text-primary">Choose your next adventure</h2>
            <p className="heading-h2 text-secondary mt-[var(--spacing-600)]">Select the best experience for you!</p>
          </div>

          <FeaturedExperiencesCarousel
            experiences={experiences}
            loading={loading}
            error={error}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
