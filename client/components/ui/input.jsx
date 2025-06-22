import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type = "text", ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full h-10 px-3 py-1.5 rounded-md border bg-[#1e1e2f]/60 text-white placeholder:text-white/40 text-sm shadow-sm",
        "backdrop-blur-md border-white/10 transition-all duration-200",
        "focus-visible:ring-2 focus-visible:ring-purple-500/60 focus-visible:border-purple-500/60 outline-none",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "file:bg-transparent file:border-0 file:text-sm file:font-medium file:text-white/70 file:h-7 file:ml-2",
        "aria-invalid:border-red-500 aria-invalid:ring-red-500/20",
        className
      )}
      {...props}
    />
  );
}

export { Input };
