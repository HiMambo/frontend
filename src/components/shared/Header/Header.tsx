"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Menu } from "lucide-react";
import Link from "next/link";
import { LogoHeader } from "../IconComponents";
import { NavLink } from "../NavLink";
import HeaderRight from "./HeaderRight";
import { cn } from "@/lib/utils";

type HeaderVariant = "default" | "partner";

const DEFAULT_NAV_LINKS = [
  { href: "/about", label: "About us" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact us" },
  { href: "/partner-program", label: "Partner Program" },
];

const PARTNER_NAV_LINKS = [
  { href: "/about", label: "About us" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact us" },
  { href: "/register-experience", label: "Register your Experience" },
];

export interface HeaderProps {
  variant?: HeaderVariant;
}

export default function Header({ variant = "default" }: HeaderProps) {
  const isPartner = variant === "partner";
  const navLinks = isPartner ? PARTNER_NAV_LINKS : DEFAULT_NAV_LINKS;

  return (
    <header
      className={cn(
        "px-[var(--spacing-2400)] py-[var(--spacing-600)]",
        isPartner ? "bg-white" : "bg-surface"
      )}
    >
      <div className="flex items-center justify-between relative gap-[var(--spacing-2400)]">
        {/* Mobile: Menu toggle */}
        <div className="lg:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <button
                aria-label="Toggle menu"
                className="p-2 rounded-md text-gray-800 hover:bg-gray-100 transition-colors"
                suppressHydrationWarning
              >
                <Menu className="w-6 h-6" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              sideOffset={10}
              className="backdrop-blur-md bg-white/90 rounded-xl shadow-xl px-6 py-4 flex flex-col items-center text-center space-y-4 w-auto max-w-[90vw]"
            >
              {navLinks.map(({ href, label }) => (
                <NavLink key={href} href={href}>
                  {label}
                </NavLink>
              ))}
            </PopoverContent>
          </Popover>
        </div>

        {/* Desktop: Left side (Logo + Nav) */}
        <div className="hidden lg:flex flex-1 items-center justify-between">
          {/* Logo left-aligned */}
          <Link href="/" className="flex items-center">
            <LogoHeader width={200} height={36} />
          </Link>
          {/* Nav right-aligned */}
          <nav className="flex gap-[var(--spacing-1600)] body-l text-primary">
            {navLinks.map(({ href, label }) => (
              <NavLink
                key={href}
                href={href}
                hoverColor="hover:text-terracotta-600"
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Desktop: Auth and Notifications */}
        <HeaderRight variant={variant}/>
      </div>
    </header>
  );
}
