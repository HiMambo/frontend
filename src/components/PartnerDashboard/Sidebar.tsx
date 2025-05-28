"use client";

import Image from "next/image";
import {
	FaBullhorn,
	FaGraduationCap,
	FaRobot,
	FaStore,
	FaUserTie,
	FaWallet,
} from "react-icons/fa";

// Define props directly here
interface SidebarProps {
  selectedSection: string;
  setSelectedSection: (section: string) => void;
}

export default function Sidebar({
  selectedSection,
  setSelectedSection,
}: SidebarProps) {
  const linkClass = (id: string) =>
    `text-xs font-semibold cursor-pointer transition-all duration-200 flex items-center gap-2 p-2 rounded-lg ${
      selectedSection === id
        ? "text-green-600 bg-green-50 shadow-sm"
        : "text-gray-700 hover:text-green-600 hover:bg-green-50"
    }`;

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-white shadow-md p-6 overflow-y-auto flex flex-col">
      {/* Logo and Navigation */}
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
          <div className="bg-purple-50 p-2 rounded-xl border border-purple-200 mb-3">
            <div className="pb-2 border-b border-purple-200">
              <h2
                onClick={() => setSelectedSection("business-page")}
                className={linkClass("business-page")}
              >
                <FaStore className="w-3.5 h-3.5" />
                Business Page
              </h2>
            </div>

            <div className="py-2 border-b border-purple-200">
              <h2
                onClick={() => setSelectedSection("marketing-tools")}
                className={linkClass("marketing-tools")}
              >
                <FaBullhorn className="w-3.5 h-3.5" />
                Marketing Tools
              </h2>
            </div>

            <div className="py-2 border-b border-purple-200">
              <h2
                onClick={() => setSelectedSection("education-hub")}
                className={linkClass("education-hub")}
              >
                <FaGraduationCap className="w-3.5 h-3.5" />
                Education Hub
              </h2>
            </div>

            <div className="py-2">
              <h2
                onClick={() => setSelectedSection("mambo-wallet")}
                className={linkClass("mambo-wallet")}
              >
                <FaWallet className="w-3.5 h-3.5" />
                MamboWallet
              </h2>
            </div>
          </div>
        </nav>

        {/* Help Section */}
        <div className="relative">
          <div className="border-t border-gray-200 my-3"></div>
          <div className="bg-purple-50 p-2 rounded-xl border border-purple-200">
            <h3 className="text-xs font-medium text-purple-600 mb-1.5">
              Need help?
            </h3>
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
                  <h4 className="font-medium text-gray-900 mb-1 text-xs">
                    Your Account Manager
                  </h4>
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
  );
}
