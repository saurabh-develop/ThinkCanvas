"use client";

import { LogOut, Search, Bell, Sparkles } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Input } from "../ui/input";

function Header() {
  return (
    <header className="h-16 fixed top-0 left-[72px] right-0 z-20 px-6 bg-white/5 backdrop-blur-md border-b border-white/10 shadow-lg flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Sparkles className="w-6 h-6 text-purple-400" />
        <h1 className="text-white font-bold text-lg tracking-tight">
          Think Canvas
        </h1>
      </div>

      <div className="relative w-full max-w-xl mx-6">
        <Search className="absolute top-1/2 left-3 -translate-y-1/2 h-5 w-5 text-white/50" />
        <Input
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white border border-white/10 placeholder-white/60 focus:ring-2 focus:ring-[#8b3dff] transition-all"
          placeholder="Search your Projects and Think Canvas"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="text-white/70 hover:text-white transition">
          <Bell className="w-5 h-5" />
        </button>
        <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center font-semibold text-sm shadow-inner hover:bg-white/30 transition">
          U
        </div>
      </div>
    </header>
  );
}

export default Header;
