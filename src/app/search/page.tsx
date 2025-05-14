import ExperienceCard from "@/components/ExperienceCard";
import FilterSidebar from "@/components/FilterSidebar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-brand-yellow min-h-screen p-8">
        <h1 className="text-4xl font-bold text-center">Welcome to hiMAMBO!</h1>
        <p className="text-center text-gray-600 mt-4">
          Real experiences, real sustainability.
        </p>

        {/* Main layout with filter sidebar and experience cards */}
        <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <div className="md:col-span-1">
            <FilterSidebar />
          </div>

          {/* Experience Cards */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <ExperienceCard
              title="Hidden Caves & Mountain Trekking"
              price={55.0}
              location="Chiapas, Mexico"
              image="https://via.placeholder.com/400"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              discount={75.0}
              rating={4}
            />
            <ExperienceCard
              title="Jungle River Floating & Waterfall"
              price={50.0}
              location="Minca, Colombia"
              image="https://via.placeholder.com/400"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              discount={null}
              rating={4}
            />
            <ExperienceCard
              title="Traditional Indigo Weaving with Artisans"
              price={90.0}
              location="Sapa, Vietnam"
              image="https://via.placeholder.com/400"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              discount={100.0}
              rating={4}
            />
            <ExperienceCard
              title="Cacao Harvest & Chocolate-Making"
              price={30.0}
              location="Manabi, Ecuador"
              image="https://via.placeholder.com/400"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              discount={45.0}
              rating={4}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
