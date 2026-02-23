"use client";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import UserBadge from "./UserBadge";
import AuthButtons from "./AuthButtons";
import NotificationBadge from "./NotificationBadge";
import BellBadge from "./BellBadge";
import { SkeletonCard } from "../SkeletonCard";
import type { HeaderProps } from "./Header";

export default function HeaderRight({ variant = "default" }: HeaderProps) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  if (status === "loading") {
    return <SkeletonCard view="headerRight" />;
  }

  // Partner dashboard: only user badge + bell, no auth buttons, no logo context needed
  if (variant === "partner-dashboard") {
    if (!session?.user) return null;
    return (
      <div className="flex items-center gap-400">
        <UserBadge user={session.user} />
        <BellBadge />
      </div>
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-400">
        <UserBadge user={session.user} />
        <NotificationBadge />
      </div>
    );
  }

  // Not logged in
  const isPaymentPage = pathname === "/payment";
  return (
    <div className="flex items-center gap-[var(--spacing-2400)]">
      {!isPaymentPage && <AuthButtons variant={variant} />}
      {variant !== "partner" && <NotificationBadge />}
    </div>
  );
}