"use client";

import AccountStepper from "@/components/PartnerOnboarding/AccountStepper";
import VerifyEmailForm from "@/components/PartnerOnboarding/VerifyEmailForm";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header/Header";

export default function VerifyEmailPage() {
  return (
    <>
      <Header />
      <section className="bg-neutral-50">
        <div className="max-w-6xl mx-auto px-400 md:px-800 py-800 md:py-1200">
          {/* Stepper (step 0 active) */}
          <div className="mb-800 md:mb-1200">
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
          <div className="bg-white rounded-800 shadow-sm ring-1 ring-black/5 p-400 md:p-600 max-w-3xl mx-auto">
            <header className="text-center mb-400">
              <h2 className="text-2xl font-semibold text-primary">
                Verify Your Business Email Address
              </h2>
              <p className="text-sm text-neutral-600 mt-050">
                Please enter the verification code sent to your email below to
                confirm your address and continue with the registration process.
              </p>
            </header>

            <VerifyEmailForm />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
