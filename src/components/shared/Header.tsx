"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

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
              <NavLink href="/">Home</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/partner-dashboard">hiPartners</NavLink>
              <NavLink href="/blog">Blog</NavLink>
              <NavLink href="/contact">Contact us</NavLink>
            </PopoverContent>
          </Popover>
        </div>


        {/* Logo */}
        <div className="flex justify-center lg:justify-start">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/Logo.svg"
              alt="hiMAMBO logo"
              width={65}
              height={50}
              priority
            />
            <Image
              src="/logo_text.svg"
              alt="hiMAMBO logo text"
              width={163}
              height={29}
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-10 absolute left-1/2 -translate-x-1/2">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/partner-dashboard">hiPartners</NavLink>
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/contact">Contact us</NavLink>
        </nav>

        {/* Sign Up Button */}
        <Link
          href="/signup"
          className="bg-primary text-white shadow-lg py-2 px-4 rounded-md text-center w-25 hover:bg-[#e18533] sm:w-35 text-lg">
          Sign up
        </Link>
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

