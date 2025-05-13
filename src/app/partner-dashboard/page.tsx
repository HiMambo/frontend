"use client";

import { useState } from "react";
import Image from "next/image";
import MamboWallet from "@/components/PartnerDashboard/MamboWallet";
import EducationHub from "@/components/PartnerDashboard/EducationHub";
import { FaGraduationCap, FaWallet, FaStore, FaBullhorn, FaRobot, FaUserTie } from 'react-icons/fa';

export default function Home() {
  const [selectedSection, setSelectedSection] = useState("dashboard");

  const renderContent = () => {
    switch (selectedSection) {
      case "business-page":
        return <h1 className="text-3xl font-bold">Business Page Content</h1>;
      case "marketing-tools":
        return <h1 className="text-3xl font-bold">Marketing Tools Content</h1>;
      case "education-hub":
        return <EducationHub />;
      case "mambo-wallet":
        return <MamboWallet />;
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
            <a
              href="/partner-dashboard"
              className="px-4 py-1.5 text-lg font-semibold text-green-800 bg-green-100 hover:bg-green-200 rounded-lg transition-colors"
            >
              Home
            </a>
          </div>

          {/* Navigation with purple background container */}
          <nav className="space-y-1">
            <div className="bg-purple-50 p-2 rounded-xl border border-purple-200 mb-3"> {/* Changed from mb-6 to mb-3 */}
              {/* Business Page */}
              <div className="pb-2 border-b border-purple-200">
                <h2
                  onClick={() => setSelectedSection("business-page")}
                  className={`text-xs font-semibold cursor-pointer transition-all duration-200 flex items-center gap-2 p-2 rounded-lg
                    ${selectedSection === "business-page"
                      ? 'text-green-600 bg-green-50 shadow-sm' 
                      : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                    }`}
                >
                  <FaStore className="w-3.5 h-3.5" />
                  Business Page
                </h2>
              </div>

              {/* Marketing Tools */}
              <div className="py-2 border-b border-purple-200">
                <h2
                  onClick={() => setSelectedSection("marketing-tools")}
                  className={`text-xs font-semibold cursor-pointer transition-all duration-200 flex items-center gap-2 p-2 rounded-lg
                    ${selectedSection === "marketing-tools"
                      ? 'text-purple-600 bg-purple-50 shadow-sm' 
                      : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                    }`}
                >
                  <FaBullhorn className="w-3.5 h-3.5" />
                  Marketing Tools
                </h2>
              </div>

              {/* Education Hub */}
              <div className="py-2 border-b border-purple-200">
                <h2
                  onClick={() => setSelectedSection("education-hub")}
                  className={`text-xs font-semibold cursor-pointer transition-all duration-200 flex items-center gap-2 p-2 rounded-lg
                    ${selectedSection === "education-hub"
                      ? 'text-purple-600 bg-purple-50 shadow-sm' 
                      : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                    }`}
                >
                  <FaGraduationCap className="w-3.5 h-3.5" />
                  Education Hub
                </h2>
              </div>

              {/* MamboWallet */}
              <div className="py-2">
                <h2
                  onClick={() => setSelectedSection("mambo-wallet")}
                  className={`text-xs font-semibold cursor-pointer transition-all duration-200 flex items-center gap-2 p-2 rounded-lg
                    ${selectedSection === "mambo-wallet"
                      ? 'text-purple-600 bg-purple-50 shadow-sm' 
                      : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                    }`}
                >
                  <FaWallet className="w-3.5 h-3.5" />
                  MamboWallet
                </h2>
              </div>
            </div>
          </nav>

          {/* Help Section with separator */}
          <div className="relative">
            <div className="border-t border-gray-200 my-3"></div> {/* Added separator */}
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
                  
                  {/* Repositioned Tooltip */}
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
        {/* Partner Profile - Moved outside of content area */}
        <div className="sticky top-0 right-0 z-50 bg-gray-100 py-4 px-8">
          <div className="flex justify-end">
            <div className="relative group">
              <button className="flex items-center gap-3 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
                <div className="w-8 h-8 bg-purple-100 rounded-full overflow-hidden flex items-center justify-center">
                  <span className="text-sm font-semibold text-purple-700">ET</span>
                </div>
                <span className="text-sm font-medium text-gray-700">EcoTours Adventure</span>
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">Partner Account</p>
                  <p className="text-xs text-gray-500">contact@ecotours-adventure.com</p>
                </div>
                <div className="py-1">
                  <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile Settings
                  </a>
                  <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Account Settings
                  </a>
                  <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Security
                  </a>
                </div>
                <div className="py-1 border-t border-gray-100">
                  <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50">
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </a>
                </div>
              </div>
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
