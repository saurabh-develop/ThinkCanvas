"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={{
        "--normal-bg": "rgba(30, 30, 47, 0.6)", // translucent dark background
        "--normal-text": "white", // bright text for contrast
        "--normal-border": "rgba(139, 61, 255, 0.4)", // soft purple border
        "--toaster-blur": "blur(10px)", // strong blur for glass effect
      }}
      toastOptions={{
        classNames: {
          toast: "backdrop-blur-md border rounded-xl shadow-lg",
          description: "text-sm text-muted",
          actionButton: "text-sm text-purple-400 hover:underline",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
