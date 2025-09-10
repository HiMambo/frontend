"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import UserBadge from "./UserBadge";

const NAV_LINKS = [
  { href: "/about", label: "About us" },
  { href: "/partner-dashboard", label: "Partner Program" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact us" },
];

export default function Header() {
  return (
    <header className="bg-white px-6 sm:px-10 shadow-md">
      <div className="flex items-center justify-between py-4 relative">
        {/* Mobile: Menu toggle */}
        <div className="lg:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <button
                aria-label="Toggle menu"
                className="p-2 rounded-md text-gray-800 hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              sideOffset={10}
              className="backdrop-blur-md bg-white/90 rounded-xl shadow-xl px-6 py-4 flex flex-col items-center text-center space-y-4 w-auto max-w-[90vw]"
            >
              {NAV_LINKS.map(({ href, label }) => (
                <NavLink key={href} href={href}>
                  {label}
                </NavLink>
              ))}
            </PopoverContent>
          </Popover>
        </div>

        {/* Logo */}
        <div className="flex justify-center lg:justify-start">
          <Link href="/" className="flex items-center ml-16 mb-2">
            <Image
              src="/logo.svg"
              alt="hiMAMBO logo"
              width={200}
              height={37}
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-10 relative ml-20">
          {NAV_LINKS.map(({ href, label }) => (
            <NavLink key={href} href={href}>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User Badge or Sign Up Button */}
        <div className="flex items-center mr-16">
          <UserBadge />
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-gray-700 text-lg hover:text-indigo-600 hover:scale-103 transition-colors"
    >
      {children}
    </Link>
  );
}
