import ExperienceCard from "@/components/ExperienceCard";
import FilterSidebar from "@/components/FilterSidebar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Search from "@/components/Search";
import SearchControls from "@/components/SearchControls";
import { fetchExperiences } from "@/lib/api";

export default async function Home() {
  const experiences = await fetchExperiences();

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
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
