"use client";

import Header from "@/components/shared/Header/Header";
import Footer from "@/components/shared/Footer";
import { UserCircle, Wallet, Navigation, Eye, ArrowRight } from "lucide-react";
import { FAQ } from "@/components/shared/FAQ";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PARTNER_ONBOARDING_FAQS } from "@/lib/FAQDefinitions";
import Link from "next/link";

export default function PartnerProgramPage() {
  return (
    <main className="flex flex-col min-h-screen bg-surface text-primary">
      <Header variant="partner"/>

      {/* Hero Section */}
      <section className="relative w-full h-[var(--partner-hero-height)] flex justify-start text-primary overflow-hidden">
        {/* Background image */}
        <Image
          src="/partner-hero.jpg"
          alt="HiMambo Partner Hero"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Content layer */}
        <div className="relative flex flex-col gap-800 p-4000 z-10">
          <h2 className="heading-h2">
            Join the HiMambo Partner Program
          </h2>
          <p className="heading-h5-normal">
            Help conscious travelers discover and book experiences that <br/> respect nature,
            support communities, and protect culture.
          </p>
          <div>

            <Button
              variant="teal"
              size="custom"
              className="px-800 py-400"
              asChild
            >
              <Link href="/register-experience">
                List your experience
                <ArrowRight className="icon-size-s" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="px-4000 py-4000 flex flex-col gap-2400">
        {/* Heading */}
        <div className="flex flex-col gap-400">
          <h2 className="heading-h4 text-secondary">
            Are you a small or medium-sized tourism business offering sustainable, ethical, and meaningful travel experiences?
          </h2>
          <h3 className="heading-h5-light text-primary">
            We’d love to welcome you into our growing network of HiMambo Partners.
          </h3>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-2 gap-1600">
          {/* Item 1 */}
          <div className="flex flex-row gap-400 items-center">
            <div className="badge-size-m flex-shrink-0 bg-[#E4EBE6] rounded-bl-sm rounded-tr-sm rounded-tl-2xl rounded-br-4xl flex items-center justify-center">
              <UserCircle className="icon-size-l text-[#309248]" />
            </div>
            <p className="body-xxl text-primary">
              A free profile on our platform during the pilot phase
            </p>
          </div>

          {/* Item 2 */}
          <div className="flex flex-row gap-400 items-center">
            <div className="badge-size-m flex-shrink-0 bg-[#E4EBE6] rounded-bl-sm rounded-tr-sm rounded-tl-2xl rounded-br-4xl flex items-center justify-center">
              <Wallet className="icon-size-l text-[#309248]" />
            </div>
            <p className="body-xxl text-primary">
              Access to our integrated booking & payment system
            </p>
          </div>

          {/* Item 3 */}
          <div className="flex flex-row gap-400 items-center">
            <div className="badge-size-m flex-shrink-0 bg-[#E4EBE6] rounded-bl-sm rounded-tr-sm rounded-tl-2xl rounded-br-4xl flex items-center justify-center">
              <Navigation className="icon-size-l text-[#309248]" />
            </div>
            <p className="body-xxl text-primary">
              Support to digitalize your offering — even with no tech experience
            </p>
          </div>

          {/* Item 4 */}
          <div className="flex flex-row gap-400 items-center">
            <div className="badge-size-m flex-shrink-0 bg-[#E4EBE6] rounded-bl-sm rounded-tr-sm rounded-tl-2xl rounded-br-4xl flex items-center justify-center">
              <Eye className="icon-size-l text-[#309248]" />
            </div>
            <p className="body-xxl text-primary">
              Visibility to travelers who care about sustainability.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQ faqs={PARTNER_ONBOARDING_FAQS} questionClassName="text-tertiary body-xxl-label" answerClassName="text-tertiary body-xl"/>
      </section>

      <Footer />
    </main>
  );
}