"use client";

import WalletBanner from "./WalletBanner";
import BusinessDetails from "./BusinessDetails";
import ContactInformation from "./ContactInformation";
import BusinessCertifications from "./BusinessCertifications";
import AccountStepper from "@/components/PartnerOnboarding/AccountStepper";

export default function BusineesPageContainer() {
  const steps = ["Account Verification", "Wallet Setup", "Calendar Setup", "Go Online"];

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-6">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Welcome to Your Himambo Partner Dashboard</h2>
          <p className="text-lg text-gray-600 mt-2">
            Manage your partnership, update your business information, and follow your metrics—all in one place.
          </p>
        </div>

        <div className="mb-8">
          <AccountStepper steps={steps} activeIndex={1} />
        </div>

        <WalletBanner />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <BusinessDetails />
          <div className="flex flex-col gap-8">
            <ContactInformation />
            <BusinessCertifications />
          </div>
        </div>
      </div>
    </div>
  );
}
