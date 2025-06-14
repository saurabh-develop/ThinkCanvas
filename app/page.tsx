"use client";

import Header from "./_components/Header";
import Hero from "./_components/Hero";
import { useEffect, useState } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function Home() {
  const [theme, setTheme] = useState("light");
  const { user } = useKindeBrowserClient();

  useEffect(() => { 
    console.log(user);
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 w-full absolute top-0 z-50 dark:bg-gray-900 transition-colors duration-300">
      <Header theme={theme} setTheme={setTheme} />
      <Hero theme={theme} />
    </div>
  );
}
