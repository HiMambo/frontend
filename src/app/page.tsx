"use client";

import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Image from "next/image";
import SearchBox from "@/components/HomePage/SearchBox";
import ExperienceCard from "@/components/ExperienceCard/ExperienceCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useExperiences } from "@/hooks/useExperiences";

export default function Home(){
  
  const { experiences } = useExperiences(); //Placeholder until we can fetch featured experiences.

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

          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-6xl"
          >
            <CarouselContent>
              {experiences.map((experience) => (
                <CarouselItem
                  key={experience.id}
                  className="pl-5 md:basis-1/2 lg:basis-1/3 max-w-xs sm:max-w-sm mx-auto"
                >
                  <ExperienceCard experience={experience} view={"home"} />
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Buttons */}
            <CarouselPrevious className="left-2 xl:left-[-45px] z-10" />
            <CarouselNext className="right-2 xl:right-[-45px] z-10" />
          </Carousel>
        </section>
      </main>
      <Footer variant="home" />
    </>
  );
}
