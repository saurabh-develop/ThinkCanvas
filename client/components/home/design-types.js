"use client";

import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { toast } from "sonner";

function DesignTypes() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 mt-12 justify-center">
      <div className="flex cursor-pointer flex-col items-center transition-transform duration-300 hover:scale-105"></div>
    </div>
  );
}

export default DesignTypes;
