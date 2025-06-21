"use client";

import { LogOut, Search, Bell, Sparkles } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function Header() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <header className="h-16 fixed top-0 left-[72px] right-0 z-20 px-6 bg-white/5 backdrop-blur-md border-b border-white/10 shadow-lg flex items-center justify-between">
      {/* Logo or App Name */}
      <div className="flex items-center gap-2">
        <Sparkles className="w-6 h-6 text-purple-400" />
        <h1 className="text-white font-bold text-lg tracking-tight">
          Think Canvas
        </h1>
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-xl mx-6">
        <Search className="absolute top-1/2 left-3 -translate-y-1/2 h-5 w-5 text-white/50" />
        <Input
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white border border-white/10 placeholder-white/60 focus:ring-2 focus:ring-[#8b3dff] transition-all"
          placeholder="Search your Projects and Think Canvas"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="text-white/70 hover:text-white transition">
          <Bell className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1 cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarFallback>
                    {session?.user?.name?.[0] || "U"}
                  </AvatarFallback>
                  <AvatarImage
                    src={session?.user?.image || "/placeholder-user.jpg"}
                  />
                </Avatar>
                <span className="text-sm font-medium hidden lg:block">
                  {session?.user?.name || "User"}
                </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-[#2c2c3e] text-white border-white/10"
            >
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer hover:bg-white/10"
              >
                <LogOut className="mr-2 w-4 h-4" />
                <span className="font-bold">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default Header;
