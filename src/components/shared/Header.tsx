"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, User, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const handleSignOut = () => {
    signOut();
  };

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

        {/* User Badge or Sign Up Button */}
        {session?.user ? (
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  {session.user.name}
                </span>
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              sideOffset={10}
              className="w-64 p-4 bg-white rounded-xl shadow-xl border"
            >
              <div className="flex items-center space-x-3 mb-4">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
                <div>
                  <p className="font-medium text-gray-900">{session.user.name}</p>
                  <p className="text-sm text-gray-600">{session.user.email}</p>
                </div>
              </div>
              
              <div className="border-t pt-3">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left p-2 hover:bg-gray-50"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <Link
            href="/signup"
            className="bg-primary text-white shadow-lg py-2 px-4 rounded-md text-center w-25 hover:bg-[#e18533] sm:w-35 text-lg"
          >
            {loading ? 'Loading...' : 'Sign up'}
          </Link>
        )}
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