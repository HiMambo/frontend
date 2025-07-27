import Image from "next/image";
import Link from "next/link";
import { User, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export default function UserBadge() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const handleSignOut = () => {
    signOut();
  };

  const renderUserAvatar = (size: number) => {
    if (session?.user?.image) {
      return (
        <Image
          src={session.user.image}
          alt={session.user.name || "User"}
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

  if (session?.user) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 rounded-full py-2 px-3 transition-colors">
            {renderUserAvatar(32)}
            <span className="text-sm font-medium text-gray-700 hidden sm:block">
              {session.user.name}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          sideOffset={10}
          className="inline-block max-w-xs p-4 bg-white rounded-xl shadow-xl border break-words"
        >
          <div className="flex items-center space-x-3 mb-4">
            {renderUserAvatar(40)}
            <div className="min-w-0">
              <p className="font-medium text-gray-900 truncate">{session.user.name}</p>
              <p className="text-sm text-gray-600 break-all">{session.user.email}</p>
            </div>
          </div>

          <div className="border-t pt-3">
            <Button
              variant="ghost"
              className="w-full justify-start text-left p-2 hover:bg-gray-50"
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

  return (
    <Link
      href="/signup"
      className="bg-primary text-white shadow-lg py-2 px-12 rounded-md text-center hover:bg-[#e18533] text-lg"
    >
      {loading ? "Loading..." : "Sign up"}
    </Link>
  );
}