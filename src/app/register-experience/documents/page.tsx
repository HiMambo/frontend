"use client";

import AccountStepper from "@/components/PartnerOnboarding/AccountStepper";
import DocumentsForm from "@/components/PartnerOnboarding/DocumentsForm";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function DocumentsPage() {
  return (
    <>
      <Header />
      <section className="bg-neutral-50">
        {/* ↓ reduce section padding */}
        <div className="max-w-6xl mx-auto px-400 md:px-600 py-400 md:py-600">
          {/* ↓ reduce spacing under stepper */}
          <div className="mb-400 md:mb-600">
            <AccountStepper
              steps={[
                "Create Account",
                "Business Details",
                "Documents",
                "Experience Info",
                "Go Online",
              ]}
              activeIndex={2}
            />
          </div>

          {/* ↓ narrower card + less padding */}
          <div className="bg-white rounded-800 shadow-sm ring-1 ring-black/5 p-300 md:p-400 max-w-4xl mx-auto">
            <header className="mb-300">
              {/* avoid huge heading utilities; keep line-height tight */}
              <h2 className="text-2xl md:text-3xl font-semibold text-primary leading-tight">
                Business Legal Documents
              </h2>
              <p className="text-sm md:text-base text-neutral-700 mt-100 max-w-3xl">
                These documents help us verify your business legitimacy to
                ensure eligibility for the HiMambo Partner Program.
              </p>
            </header>

            <DocumentsForm />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
