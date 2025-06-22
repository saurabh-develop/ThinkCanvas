"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@/lib/utils";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-gradient-to-r from-purple-500/30 to-purple-500/10 backdrop-blur-sm",
        "data-[orientation=horizontal]:h-[1px] data-[orientation=horizontal]:w-full",
        "data-[orientation=vertical]:w-[1px] data-[orientation=vertical]:h-full",
        className
      )}
      {...props}
    />
  );
}

export { Separator };
