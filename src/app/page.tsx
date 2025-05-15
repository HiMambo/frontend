"use client";

import { useEffect, useState } from "react";
import ExperienceCard from "@/components/ExperienceCard";
import FilterSidebar from "@/components/FilterSidebar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Search from "@/components/Search";
import SearchControls from "@/components/SearchControls";
import { fetchExperiences } from "@/lib/api";
import { useCart } from "@/context/Cart"; // Import the Cart context

export default function Home() {
  const [experiences, setExperiences] = useState([]); // State to store experiences
  const { setPax } = useCart(); // Access the setPax function from the Cart context

  // Fetch experiences and set default number_of_people
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchExperiences();
      setExperiences(data); // Set the fetched experiences
    };

    fetchData();
    setPax(2); // Set the default value for number_of_people
    console.log("Default number_of_people set to 2");
  }, [setPax]);

  return (
    <>
      <Header />
      <Search />
      <SearchControls />
      <main className="bg-white min-h-screen p-12">
        <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <div className="md:col-span-1">
            <FilterSidebar />
          </div>

          {/* Experience Cards */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
            {experiences.map((exp) => (
              <ExperienceCard
                key={exp.id}
                id={exp.id}
                title={exp.name}
                price={parseFloat(exp.experience_price)}
                location={`${exp.experience_city}, ${exp.experience_country}`}
                image={exp.experience_promo_image}
                description={exp.experience_description}
                discount={null} // Optional: handle discounts if available later
                rating={exp.rating_avg}
                sustainabilityGoal={exp.sustainability_goal}
              />
            ))}
{/* {experiences.map((exp) => (
              <ExperienceCard
                key={exp.id}
                title={exp.name}
                price={parseFloat(exp.experience_price)}
                location={`${exp.experience_city}, ${exp.experience_country}`}
                image={exp.experience_promo_image}
                description={exp.experience_description}
                discount={null} // Optional: handle discounts if available later
                rating={exp.rating_avg}
                sustainabilityGoal={exp.sustainability_goal}
              />
            ))} */}
{/* {experiences.map((exp) => (
              <ExperienceCard
                key={exp.id}
                title={exp.name}
                price={parseFloat(exp.experience_price)}
                location={`${exp.experience_city}, ${exp.experience_country}`}
                image={exp.experience_promo_image}
                description={exp.experience_description}
                discount={null} // Optional: handle discounts if available later
                rating={exp.rating_avg}
                sustainabilityGoal={exp.sustainability_goal}
              />
            ))} */}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
