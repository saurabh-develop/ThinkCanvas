"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

function Switch({ className, ...props }) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-[1.3rem] w-10 shrink-0 items-center rounded-full border border-purple-500/30",
        "bg-[#2a1f4d]/40 backdrop-blur-md shadow-inner transition-colors duration-200 ease-in-out",
        "data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-600 data-[state=checked]:to-purple-400",
        "focus-visible:ring-[3px] focus-visible:ring-purple-500/50 focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block size-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out",
          "data-[state=checked]:translate-x-[calc(100%-1.1rem)] data-[state=unchecked]:translate-x-1"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
