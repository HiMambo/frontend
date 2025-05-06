import ExperienceCard from "@/components/ExperienceCard";
import FilterSidebar from "@/components/FilterSidebar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function SearchPage() {
  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        <FilterSidebar />
        <main className="flex-1 p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Search Results</h2>
          <ExperienceCard
            title="Hidden Caves & Mountain Trekking"
            location="Chiapas, Mexico"
            price={55}
          />
          <ExperienceCard
            title="Jungle River Floating"
            location="Minca, Colombia"
            price={50}
          />
        </main>
      </div>
      <Footer />
    </>
  );
}
