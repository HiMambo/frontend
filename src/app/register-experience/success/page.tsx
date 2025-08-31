"use client";

import AccountStepper from "@/components/PartnerOnboarding/AccountStepper";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import {
  CheckCircle2,
  Clock4,
  Mail,
  MailCheck,
  ShieldCheck,
} from "lucide-react";

export default function RegistrationSuccessPage() {
  return (
    <>
      <Header />
      <section className="bg-neutral-50">
        <div className="max-w-6xl mx-auto px-400 md:px-600 py-400 md:py-600">
          {/* stepper */}
          <div className="mb-400 md:mb-600">
            <AccountStepper
              steps={[
                "Create Account",
                "Business Details",
                "Documents",
                "Experience Info",
                "Go Online",
              ]}
              activeIndex={4}
            />
          </div>

          {/* success card */}
          <div className="max-w-4xl mx-auto rounded-2xl bg-[#FAF8F5] p-400 shadow-sm ring-1 ring-black/5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full grid place-items-center bg-green-100 border border-green-300 shrink-0">
                <CheckCircle2 className="w-6 h-6 text-green-700" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-semibold text-[#6B3B2A] leading-tight">
                  Registration Successful!
                </h1>
                <p className="text-sm md:text-base text-neutral-800 mt-100">
                  Thank you for completing your registration for the HiMambo
                  Partner Program. We have received your information and will
                  review your application shortly.
                </p>
                <p className="text-sm text-neutral-600 mt-150">
                  You will be contacted if further details are needed or once
                  your partnership is approved.
                </p>
              </div>
            </div>
          </div>

          {/* what happens next card */}
          <div className="max-w-4xl mx-auto rounded-2xl bg-[#FAF8F5] p-400 shadow-sm ring-1 ring-black/5 mt-400">
            <div className="flex items-center gap-2 mb-300">
              <div className="w-6 h-6 rounded-full grid place-items-center bg-neutral-200 text-neutral-600">
                ?
              </div>
              <h2 className="text-base md:text-lg font-semibold text-[#6B3B2A]">
                What happens next?
              </h2>
            </div>

            <ul className="space-y-300">
              <NextRow
                icon={<ShieldCheck className="w-5 h-5 text-green-700" />}
                text="Our team will verify your submitted documents and business details to ensure eligibility."
              />
              <NextRow
                icon={<Clock4 className="w-5 h-5 text-yellow-700" />}
                text="This review process usually takes between 3 to 5 business days."
              />
              <NextRow
                icon={<Mail className="w-5 h-5 text-teal-700" />}
                text="If additional information is needed, we will contact you via the provided contact details."
              />
              <NextRow
                icon={<MailCheck className="w-5 h-5 text-green-700" />}
                text="Once your application is approved, you will receive a confirmation email with next steps to fully activate your partnership and publish your experiences."
              />
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

function NextRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <li className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm">
      <span className="w-8 h-8 rounded-md bg-neutral-100 border border-neutral-200 grid place-items-center shrink-0">
        {icon}
      </span>
      <p className="text-sm text-neutral-700">{text}</p>
    </li>
  );
}
