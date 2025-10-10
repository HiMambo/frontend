"use client";

import AccountStepper from "@/components/PartnerOnboarding/AccountStepper";
import CreateAccountForm from "@/components/PartnerOnboarding/CreateAccountForm";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header/Header";

export default function RegisterExperiencePage() {
  return (
    <>
      <Header />
      <section className="bg-neutral-50">
        <div className="max-w-6xl mx-auto px-[var(--spacing-400)] md:px-[var(--spacing-800)] py-[var(--spacing-800)] md:py-[var(--spacing-1200)]">
          {/* Title + subtitle */}
          <header className="text-center mb-[var(--spacing-800)] md:mb-[var(--spacing-1200)]">
            <h1 className="heading-h2 text-primary mb-[var(--spacing-200)]">
              Create a HiMambo Partner Profile
            </h1>
            <p className="text-neutral-700 body-m">
              We’d love to welcome you into our growing network of HiMambo
              Partners.
            </p>
          </header>

          {/* Stepper */}
          <div className="mb-800 md:mb-[var(--spacing-1200)]">
            <AccountStepper
              steps={[
                "Create Account",
                "Business Details",
                "Documents",
                "Experience Info",
                "Go Online",
              ]}
              activeIndex={0}
            />
          </div>

          {/* Card */}
          <div className="bg-white rounded-800 shadow-sm ring-1 ring-black/5 p-400 md:p-[var(--spacing-600)]">
            <CreateAccountForm />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
