import { fetchExperienceById } from "@/lib/api";
import { notFound } from "next/navigation";

import Header from "@/components/shared/Header/Header";
import Footer from "@/components/shared/Footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeftDuo } from "@/components/shared/IconComponents";
import ExperienceCard from "@/components/ExperienceCard/ExperienceCard";
import ExperienceDetailsTabs from "@/components/ExperienceDetails/ExperienceDetailsTabs";
import { FAQ } from "@/components/shared/FAQ";

export default async function ExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  if (isNaN(id)) return notFound();

  let experience;
  try {
    experience = await fetchExperienceById(id);
  } catch {
    return notFound();
  }

  return (
    <>
    <Header />
      <main className="flex flex-col gap-[var(--spacing-1600)] py-[var(--spacing-800)] px-[var(--spacing-2400)] bg-surface">
        {/* === Top Section === */}
        <section className="items-center justify-center">
          <Link href="/experiencepage">
              <Button
                variant="outline-yellow"
                size="custom"
                className="px-[var(--spacing-400)] py-[var(--spacing-300)] gap-[var(--spacing-200)]"
              >
                <ChevronLeftDuo className="icon-size-s" />
                Go Back
              </Button>
            </Link>
        </section>

        {/* === Main Section === */}
        <ExperienceCard view="details" experience={experience}/>
        <ExperienceDetailsTabs experience={experience} />

        {/* === FAQ Section === */}
        <FAQ />
      </main>
    <Footer />
    </>
  );
}