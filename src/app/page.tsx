import ExperienceCard from "@/components/ExperienceCard";
import FilterSidebar from "@/components/FilterSidebar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="bg-white min-h-screen p-8">
        {/* <h1 className="text-4xl font-bold text-center">Welcome to hiMAMBO!</h1>
        <p className="text-center text-gray-600 mt-4">
          Real experiences, real sustainability.
        </p> */}

        {/* Main layout with filter sidebar and experience cards */}
        <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <div className="md:col-span-1">
            <FilterSidebar />
          </div>

          {/* Experience Cards */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
            <ExperienceCard
              title="Hidden Caves & Mountain Trekking"
              price={55.0}
              location="Chiapas, Mexico"
              image="/assets/Rectangle_32.png" // Use the correct path to the image
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              discount={75.0}
            />
            <ExperienceCard
              title="Jungle River Floating & Waterfall"
              price={50.0}
              location="Minca, Colombia"
              image="/assets/Rectangle_32.png" // Same here, replace with your image
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              discount={null}
            />
            <ExperienceCard
              title="Traditional Indigo Weaving with Artisans"
              price={90.0}
              location="Sapa, Vietnam"
              image="/assets/Rectangle.png" // Replace with the correct image path
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              discount={100.0}
            />
            <ExperienceCard
              title="Cacao Harvest & Chocolate-Making"
              price={30.0}
              location="Manabi, Ecuador"
              image="/src/assets/Rectangle.png" // Correct image path
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              discount={45.0}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
