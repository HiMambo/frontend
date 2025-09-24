"use client";

import { useSession } from "next-auth/react";
import UserBadge from "./UserBadge";
import AuthButtons from "./AuthButtons";
import NotificationBadge from "./NotificationBadge";

export default function HeaderRight() {
  const { data: session, status } = useSession();
  
  if (status === "loading") {
    return (
      <div className="flex items-center gap-[var(--spacing-400)]">
        <div className="flex items-center space-x-2 bg-gray-100 rounded-full py-2 px-3 animate-pulse">
          <div className="w-8 h-8 bg-gray-300 rounded-full" />
          <div className="w-16 h-4 bg-gray-300 rounded" />
        </div>
        <div className="w-10 h-10 bg-gray-100 rounded-full animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 bg-gray-300 rounded-full" />
        </div>
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-[var(--spacing-400)]">
        <UserBadge user={session.user} />
        <NotificationBadge />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-[var(--spacing-2400)]">
      <AuthButtons />
      <NotificationBadge />
    </div>
  );
}