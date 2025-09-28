"use client";

import { useSession } from "next-auth/react";
import UserBadge from "./UserBadge";
import AuthButtons from "./AuthButtons";
import NotificationBadge from "./NotificationBadge";
import { SkeletonCard } from "../SkeletonCard";

export default function HeaderRight() {
  const { data: session, status } = useSession();
  
  if (status === "loading") {
    return (
        <SkeletonCard view="headerRight"/>
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