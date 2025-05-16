"use client";

import { useState } from "react";
import Image from "next/image";
import { FaWallet, FaEnvelope, FaRobot, FaUserTie } from 'react-icons/fa';
import UserProfileDashboard from "@/components/MyBookings/UserProfileDashboard";
import Link from "next/link";

export default function Home() {
  const [selectedSection, setSelectedSection] = useState("dashboard");

  const renderContent = () => {
    switch (selectedSection) {
      case "user-profile":
        return <UserProfileDashboard />;
      case "education-hub":
        return null;
      case "messages":
        return (
          <div>
            <h1 className="text-2xl font-bold mb-4">Messages</h1>
            <p className="text-gray-600">
              Here you can message and manage your private conversations with HiMambo&apos;s Partners.
            </p>
          </div>
        );
      default:
        return <h1 className="text-3xl font-bold">Welcome to HiMambo Dashboard</h1>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-white shadow-md p-6 overflow-y-auto flex flex-col">
        <div>
          {/* Logo Section */}
          <div className="mb-8 flex items-center space-x-4">
            <Image
              src="/logo.png"
              alt="HiMambo Logo"
              width={40}
              height={40}
            />
            <Link href="/" className="px-4 py-1.5 text-lg font-semibold text-green-800 bg-green-100 hover:bg-green-200 rounded-lg transition-colors">
              Home
            </Link>
          </div>

          {/* Sidebar navigation */}
          <nav className="space-y-1">
            <div className="bg-purple-50 p-2 rounded-xl border border-purple-200 mb-3">
              {/* Profile Section */}
              <div className="py-2">
                <h2
                  onClick={() => setSelectedSection("user-profile")}
                  className={`text-xs font-semibold cursor-pointer transition-all duration-200 flex items-center gap-2 p-2 rounded-lg
                    ${selectedSection === "user-profile"
                      ? 'text-purple-600 bg-purple-100 shadow-sm'
                      : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                    }`}
                >
                  <FaWallet className="w-3.5 h-3.5" />
                  Profile
                </h2>
              </div>
              {/* Messages Section - styled like Profile */}
              <div className="py-2">
                <h2
                  onClick={() => setSelectedSection("messages")}
                  className={`text-xs font-semibold cursor-pointer transition-all duration-200 flex items-center gap-2 p-2 rounded-lg
                    ${selectedSection === "messages"
                      ? 'text-purple-600 bg-purple-100 shadow-sm'
                      : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                    }`}
                >
                  <FaEnvelope className="w-3.5 h-3.5" />
                  Messages
                </h2>
              </div>
            </div>
          </nav>

          {/* Help Section with separator */}
          <div className="relative">
            <div className="border-t border-gray-200 my-3"></div>
            <div className="bg-purple-50 p-2 rounded-xl border border-purple-200">
              <h3 className="text-xs font-medium text-purple-600 mb-1.5">Need help?</h3>
              <div className="space-y-1.5">
                <button className="w-full flex items-center gap-1.5 px-2 py-1 text-left text-xs bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition-colors">
                  <FaRobot className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Talk to MamboAI</span>
                </button>
                <div className="relative group">
                  <button className="w-full flex items-center gap-1.5 px-2 py-1 text-left text-xs bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors">
                    <FaUserTie className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Talk to HiMambo Team</span>
                  </button>
                  <div className="absolute top-full left-0 mt-1 p-2.5 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[60] border border-gray-100 w-48">
                    <h4 className="font-medium text-gray-900 mb-1 text-xs">Your Account Manager</h4>
                    <div className="space-y-0.5 text-xs text-gray-600">
                      <p>John Smith</p>
                      <p>john.smith@himambo.com</p>
                      <p>+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="ml-64 relative">
        {/* User Profile Menu */}
        <div className="sticky top-0 right-0 z-50 bg-gray-100 py-4 px-8">
          <div className="flex justify-end">
            <div className="relative group">
              <button className="flex items-center gap-3 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
                <div className="w-8 h-8 bg-purple-100 rounded-full overflow-hidden flex items-center justify-center">
                  <span className="text-sm font-semibold text-purple-700">HN</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Enrique Maldonado</span>
                <span className="text-xs text-gray-400 ml-2">ID: HM-2025-0501</span>
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* Dropdown menu here if needed */}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
