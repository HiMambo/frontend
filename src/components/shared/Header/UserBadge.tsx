"use client";
import Image from "next/image";
import { useState } from "react";
import { User, ChevronUp, ChevronDown, LogOut, CircleUserRound, Settings, Lock } from "lucide-react";
import { signOut } from "next-auth/react";
import { type Session } from "next-auth";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

interface UserBadgeProps {
  user?: Session["user"];
}

export default function UserBadge({ user }: UserBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const handleSignOut = () => signOut();

  const renderUserAvatar = (size: number) => {
    if (user.image) {
      return (
        <Image
          src={user.image}
          alt={user.name || "User"}
          width={size}
          height={size}
          className="rounded-full"
        />
      );
    }
    return (
      <div
        className={`w-[${size}px] h-[${size}px] bg-primary rounded-full flex items-center justify-center`}
      >
        <User className={`w-[${size / 2}px] h-[${size / 2}px] text-white`} />
      </div>
    );
  };

  const menuItems = [
    { label: "Profile Settings", icon: CircleUserRound, onClick: () => console.log("Profile clicked") },
    { label: "Account Settings", icon: Settings, onClick: () => console.log("Account clicked") },
    { label: "Security", icon: Lock, onClick: () => console.log("Security clicked") },
  ];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild className="cursor-pointer">
        <button
          className={`flex items-center rounded-200 min-w-[var(--spacing-4000)] gap-[var(--spacing-200)] px-[var(--spacing-200)] py-[var(--spacing-100)] transition-colors ${
            isOpen ? "shadow-elevation-1" : "hover:shadow-elevation-1"
          }`}
        >
          {renderUserAvatar(32)}
          <div className="flex flex-col w-full items-start justify-start gap-[var(--spacing-050)]">
            <span className="body-xs text-primary">{user.name}</span>
            <span className="body-xxs-light text-tertiary">Placeholder: UserID</span>
          </div>

          {isOpen ? (
            <ChevronUp className="icon-xs text-tertiary" />
          ) : (
            <ChevronDown className="icon-xs text-tertiary" />
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={10}
        className="inline-block bg-surface w-[var(--radix-popover-trigger-width)] px-[var(--spacing-200)] py-[var(--spacing-100)] flex flex-col gap-[var(--spacing-250)] shadow-elevation-1 rounded-200 border-none"
      >
        {/* Client Account + email */}
        <div className="flex flex-col px-[var(--spacing-200)] py-[var(--spacing-150)] gap-[var(--spacing-050)] border-b border-[var(--text-disabled)]">
          <span className="body-xs text-secondary">Client Account</span>
          <span className="body-xxs-light text-tertiary">{user.email}</span>
        </div>

        {/* Middle section */}
        {menuItems.map(({ label, icon: Icon, onClick }) => (
          <button
            key={label}
            className="flex items-center px-[var(--spacing-200)] py-[var(--spacing-100)] gap-[var(--spacing-200)] text-tertiary body-xs hover:bg-neutral-200 rounded-100 transition-colors cursor-pointer"
            onClick={onClick}
          >
            <Icon className="icon-size-xs" />
            {label}
          </button>
        ))}
        {/* Sign out section with spacing divs */}
        <div className="flex flex-col gap-0">
          {/* Top spacer + border */}
          <div className="h-[var(--spacing-150)] border-t border-[var(--text-disabled)]" />

          {/* Sign out button */}
          <button
            className="flex items-center px-[var(--spacing-200)] py-[var(--spacing-100)] gap-[var(--spacing-200)] text-destructive rounded-100 hover:bg-destructive hover:text-[var(--text-inverted)] transition-colors cursor-pointer"
            onClick={handleSignOut}
          >
            <LogOut className="icon-size-xs" />
            <span className="body-xs">Sign out</span>
          </button>

          {/* Bottom spacer */}
          <div className="h-[var(--spacing-150)]" />
        </div>
      </PopoverContent>
    </Popover>
  );
}
