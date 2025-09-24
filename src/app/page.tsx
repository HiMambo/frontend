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
      <main className="relative pb-20 bg-surface">
        {/* Hero Image */}
        <div className="w-full relative">
          <Image
            src="/hero.png"
            alt="Hero"
            width={1920}
            height={743}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Search Box */}
        <div className="-mt-11 relative z-10">
          <SearchBox />
        </div>

        {/* Featured Experiences Section */}
        <section className="px-4 py-20">
          <div className="text-center mb-20">
            <h2 className="heading-h5-light text-primary">Choose your next adventure</h2>
            <p className="heading-h2 text-secondary mt-3">Select the best experience for you!</p>
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
