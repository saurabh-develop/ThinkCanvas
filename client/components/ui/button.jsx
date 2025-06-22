import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium transition-all duration-150 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#8b3dff]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e1e2f]",
  {
    variants: {
      variant: {
        default: "bg-[#8b3dff] text-white shadow-md hover:bg-[#9c50ff]",
        destructive:
          "bg-red-500 text-white shadow-md hover:bg-red-600 focus-visible:ring-red-400",
        outline:
          "bg-transparent border border-white/10 text-white hover:bg-white/10",
        secondary: "bg-white/10 text-white hover:bg-white/20",
        ghost: "bg-transparent text-white hover:bg-white/5",
        link: "text-[#8b3dff] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-xl px-3 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "size-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
