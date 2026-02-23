"use client";
import { useState } from "react";
import { LogoBusinessPage, SmallLogoSidebar } from "../shared/IconComponents";
import { Calendar, GraduationCap, Inbox, Megaphone, PanelLeft, PanelRight, Store, Sun, Wallet } from "lucide-react";

interface SidebarProps {
  selectedSection: string;
  setSelectedSection: (section: string) => void;
}

const menuItems = [
  { id: "business-page", label: "Business Page", icon: Store },
  { id: "experiences", label: "Experiences", icon: Sun },
  { id: "mambo-wallet", label: "Mambo Wallet", icon: Wallet },
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "inbox", label: "Inbox", icon: Inbox },
  { id: "marketing-tools", label: "Marketing Tools", icon: Megaphone },
  { id: "profile", label: "Profile", icon: GraduationCap },
];

export default function Sidebar({
  selectedSection,
  setSelectedSection,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`
        min-h-screen flex flex-col py-600 bg-white shadow-md overflow-y-auto justify-between shrink-0
        ${collapsed ? "w-fit px-800 gap-1200" : "w-[var(--width-authbuttons)] px-800 gap-0"}
      `}
    >
      {/* Top: Dashboard menu */}
      <div className={`flex flex-col ${collapsed ? "gap-800" : "gap-800"}`}>

        {/* Logo row */}
        <div className={`flex ${collapsed ? "flex-col gap-800 items-center" : "flex-row justify-between items-center"}`}>
          {collapsed
            ? <SmallLogoSidebar width={44} height={34} />
            : <LogoBusinessPage width={216} height={34} />
          }
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="text-disabled cursor-pointer p-1 rounded hover:bg-gray-100 transition-colors"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed
              ? <PanelRight className="icon-size-s" />
              : <PanelLeft className="icon-size-s" />
            }
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex flex-col gap-400">
          {menuItems.map(({ id, label, icon: Icon }) => {
            const isSelected = selectedSection === id;
            return (
              <button
                key={id}
                onClick={() => setSelectedSection(id)}
                className={`
                  flex flex-row items-center rounded-300 text-left w-full
                  px-600 py-400 transition-colors duration-150
                  ${collapsed ? "" : "gap-250"}
                  ${isSelected
                    ? "bg-teal-500 text-inverted"
                    : "bg-none text-secondary hover:bg-teal-50 hover:text-teal-700"
                  }
                `}
              >
                <Icon className="icon-size-s flex-shrink-0" />
                {!collapsed && <span className="body-l-button">{label}</span>}
              </button>
            );
          })}
        </nav>

      </div>
    </aside>
  );
}