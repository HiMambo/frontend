"use client";

import Link from "next/link";
import { useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo Section and Hamburger Menu */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          {/* Hamburger Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-gray-800 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="flex-1 flex justify-center">
            <div className="flex items-center space-x-2">
              <Image
                src="Logo.svg" 
                alt="hiMAMBO logo"
                className="w-40 h-12" 
              />
            </div>
          </div>
        </div>

        {/* Normal Navigation Links */}
        <nav className="hidden lg:flex space-x-6">
          <Link href="/" className="text-gray-700 no-underline hover:underline mr-15 hover:text-indigo-600">
            Home
          </Link>
          <Link href="/about" className="text-gray-700 mr-15 hover:text-indigo-600">
            About
          </Link>
          <Link href="/hiPartners" className="text-gray-700 mr-15 hover:text-indigo-600">
            hiPartners
          </Link>
          <Link href="/blog" className="text-gray-700 mr-15 hover:text-indigo-600">
            Blog
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-indigo-600">
            Contact us
          </Link>
        </nav>

        {/* Sign-up Button */}
        <Link
          href="/signup"
          className="bg-primary text-white shadow-lg py-2 px-4 rounded-xs text-center w-25 hover:bg-orange-600 sm:text-sm sm:w-40 md:text-lg"
        >
          Sign up
        </Link>
      </div>

      {/* Mobile Navigation Links */}
      <div
        className={`lg:hidden fixed inset-0 bg-gray-800 bg-opacity-50 z-50 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={toggleMenu}
            className="text-white text-3xl"
          >
            &times;
          </button>
        </div>
        <div className="flex flex-col items-center space-y-6 mt-10">
          <Link href="/" className="text-white text-2xl hover:text-indigo-400">
            Home
          </Link>
          <Link href="/about" className="text-white text-2xl hover:text-indigo-400">
            About
          </Link>
          <Link href="/hiPartners" className="text-white text-2xl hover:text-indigo-400">
            hiPartners
          </Link>
          <Link href="/blog" className="text-white text-2xl hover:text-indigo-400">
            Blog
          </Link>
          <Link href="/contact" className="text-white text-2xl hover:text-indigo-400">
            Contact us
          </Link>
        </div>
      </div>
    </header>
  );
};

