"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import UserBadge from "./UserBadge";
import AuthButtons from "./AuthButtons";
import NotificationBadge from "./NotificationBadge";
import { SkeletonCard } from "../SkeletonCard";

export default function HeaderRight() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (status === "loading") {
    return <SkeletonCard view="headerRight" />;
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-[var(--spacing-400)]">
        <UserBadge user={session.user} />
        <NotificationBadge />
      </div>
    );
  }

  // Not logged in
  const isPaymentPage = pathname === "/payment";

  return (
    <div className="flex items-center gap-[var(--spacing-2400)]">
      {!isPaymentPage && <AuthButtons />}
      <NotificationBadge />
    </div>
  );
}
