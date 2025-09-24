"use client";
import Image from "next/image";
import { User, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { type Session } from "next-auth";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface UserBadgeProps {
  user?: Session["user"];
}

export default function UserBadge({ user }: UserBadgeProps) {
  if (!user) return null; 

  const handleSignOut = () => {
    signOut();
  };

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
      <div className={`w-${size/4} h-${size/4} bg-primary rounded-full flex items-center justify-center`}>
        <User className={`w-${size/8} h-${size/8} text-white`} />
      </div>
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center space-x-2 hover:shadow-elevation-1 rounded-200 py-2 px-3 transition-colors">
          {renderUserAvatar(32)}
          <span className="body-xs text-gray-700 hidden sm:block">
            {user.name}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={10}
        className="inline-block max-w-xs p-4 bg-surface rounded-200 shadow-elevation-1 border-none break-words"
      >
        <div className="flex items-center space-x-3 mb-4">
          {renderUserAvatar(40)}
          <div className="min-w-0">
            <p className="font-medium text-gray-900 truncate">{user.name}</p>
            <p className="text-sm text-gray-600 break-all">{user.email}</p>
          </div>
        </div>
        <div className="border-t pt-3 text-destructive body-xs">
          <Button
            variant="ghost"
            className="w-full justify-start text-left p-2 hover:bg-destructive hover:text-[var(--text-inverted)]"
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}