"use client";
import Image from "next/image";
import Link from "next/link";
import { FaEnvelope, FaWallet } from "react-icons/fa";

interface SidebarProps {
  selectedSection: string;
  setSelectedSection: (section: string) => void;
}

export default function Sidebar({
  selectedSection,
  setSelectedSection,
}: SidebarProps) {
  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-white shadow-md p-6 overflow-y-auto flex flex-col">
      <div>
        <div className="mb-8 flex items-center space-x-4">
          <Image
            src="/logo.png"
            alt="HiMambo Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />

          <Link
            href="/"
            className="px-4 py-1.5 text-lg font-semibold text-orange-400 bg-orange-100 hover:bg-orange-200 rounded-lg transition-colors"
          >
            Home
          </Link>
        </div>

        <nav className="space-y-1">
          <SidebarItem
            icon={<FaWallet />}
            label="Profile"
            selected={selectedSection === "user-profile"}
            onClick={() => setSelectedSection("user-profile")}
          />
          <SidebarItem
            icon={<FaEnvelope />}
            label="Messages"
            selected={selectedSection === "messages"}
            onClick={() => setSelectedSection("messages")}
          />
        </nav>

        <div className="relative mt-6">
          <div className="border-t border-gray-200 my-3"></div>
          <div className="bg-orange-50 p-2 rounded-xl border border-orange-200">
            <h3 className="text-xs font-medium text-orange-600 mb-1.5">
              Need help?
            </h3>
            <div className="space-y-1.5">
              <button className="w-full flex items-center gap-1.5 px-2 py-1 text-left text-xs bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition-colors">
                🤖 <span>Talk to MamboAI</span>
              </button>
              <div className="relative group">
                <button className="w-full flex items-center gap-1.5 px-2 py-1 text-left text-xs bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors">
                  🧑‍💼 <span>Talk to HiMambo Team</span>
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

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  selected: boolean;
  onClick: () => void;
}

function SidebarItem({ icon, label, selected, onClick }: SidebarItemProps) {
  return (
    <div
      onClick={onClick}
      className={`text-xs font-semibold cursor-pointer flex items-center gap-2 p-2 rounded-lg transition-all
        ${
          selected
            ? "text-white bg-orange-400 shadow-sm"
            : "text-white-700 hover:text-orange-600 hover:bg-orange-50"
        }`}
    >
      {icon}
      {label}
    </div>
  );
}
