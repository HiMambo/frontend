"use client";

import React from "react";
import Image from "next/image";



export default function TopNav() {
  const [notifOpen, setNotifOpen] = React.useState(false);

  const notifRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!notifRef.current) return;
      if (!notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <div className="sticky top-0 right-0 z-50 bg-gray-100 py-4 px-8">
      <div className="flex justify-end">
        <div className="flex items-start gap-3">
          <div className="flex relative" ref={notifRef}>
                      <div className="relative group">
            <button className="flex items-center gap-3 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
              <div className="w-8 h-8 bg-purple-100 rounded-full overflow-hidden flex items-center justify-center">
                <span className="text-sm font-semibold text-purple-700">ET</span>
              </div>
              <span className="text-sm font-medium text-gray-700">EcoTours Adventure</span>
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown */}
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-100">
              <div className="p-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">Partner Account</p>
                <p className="text-xs text-gray-500">contact@ecotours-adventure.com</p>
              </div>
              <div className="py-1">
                <a
                  href="#"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Profile Settings
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Account Settings
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Security
                </a>
              </div>
              <div className="py-1 border-t border-gray-100">
                <a
                  href="#"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                >
                  <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Sign Out
                </a>
              </div>
            </div>
          </div>
                       <div className="relative group ml-3">
           
<button
  type="button"
  onClick={() => setNotifOpen((v) => !v)}
className="flex items-center gap-3 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all h-12"  aria-label="Notifications"
  >

  <Image
    src="/assets/Notification.svg"
    alt="Notifications"
    width={20}
    height={20}
    className="text-gray-600"
  />

  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-4 w-4 rounded-full bg-green-500 text-white text-[10px] font-bold">
    4
  </span>
</button>
          </div>

            {notifOpen && (
              <div className="absolute right-0 top-full mt-2 w-[360px] max-w-[90vw] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <span className="text-sm font-semibold text-gray-900">Notifications</span>
                  <span className="text-gray-400">•••</span>
                </div>
                <ul className="divide-y divide-gray-100 max-h-96 overflow-auto">
                  {[
                    { t: "24m ago", msg: "Enrique M. wrote you a message" },
                    { t: "3h ago", msg: "New payout available for review" },
                    { t: "6h ago", msg: "Your experience was booked" },
                    { t: "3 days ago", msg: "Monthly statement is ready" },
                  ].map((it, i) => (
                    <li key={i} className="px-4 py-3 flex items-start gap-3">
                      <div className="h-9 w-9 rounded-full bg-emerald-100 text-emerald-700 grid place-items-center text-sm font-semibold shrink-0">
                        EM
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">{it.msg}</p>
                        <button className="text-[11px] text-gray-500 mt-0.5 hover:text-gray-800">
                          View details
                        </button>
                      </div>
                      <span className="text-[11px] text-gray-400 shrink-0">{it.t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>


        </div>
      </div>
    </div>
  );
}
