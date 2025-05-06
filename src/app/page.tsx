import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen p-8">
        <h1 className="text-4xl font-bold text-center">Welcome to hiMAMBO!</h1>
        <p className="text-center text-gray-600 mt-4">
          Real experiences, real sustainability.
        </p>
      </main>
      <Footer />
    </>
  );
}
