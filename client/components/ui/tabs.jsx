"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

function Tabs({ className, ...props }) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    />
  );
}

function TabsList({ className, ...props }) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "inline-flex w-fit items-center justify-center gap-2 p-1",
        "bg-[#1e1e2f]/60 backdrop-blur-md rounded-2xl border border-purple-500/30 shadow-inner",
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex items-center justify-center px-4 py-2 text-sm font-medium",
        "rounded-xl transition-all duration-200 ease-in-out",
        "text-white/70 hover:text-white",
        "data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-600 data-[state=active]:to-purple-400",
        "data-[state=active]:text-white data-[state=active]:shadow-lg",
        "focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        "mt-4 rounded-xl bg-[#1e1e2f]/40 backdrop-blur-md p-6 shadow-inner border border-purple-500/20 text-white",
        className
      )}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
