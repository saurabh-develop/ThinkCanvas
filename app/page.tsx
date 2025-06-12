"use client";
import { Button } from "@/components/ui/button";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import { useState } from "react";
export default function Home() {
  const [theme, setTheme] = useState("light");
  return (
    <div className="min-h-screen bg-gray-100 w-full absolute top-0 z-50 dark:bg-gray-900 transition-colors duration-300">
      <Header theme={theme} setTheme={setTheme} />
      <Hero theme={theme} />
    </div>
  );
}
