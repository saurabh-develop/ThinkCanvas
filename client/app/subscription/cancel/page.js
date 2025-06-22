"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button.js";
import Link from "next/link";

function SubscriptionCancel() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e1e2f] via-[#2c2c3e] to-[#1e1e2f] text-white p-6">
      <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-8 max-w-md w-full shadow-lg text-center space-y-6">
        <div className="flex flex-col items-center">
          <AlertTriangle className="w-12 h-12 text-yellow-400 mb-2" />
          <h1 className="text-2xl font-bold">Payment Failed</h1>
          <p className="text-sm text-white/70">
            Something went wrong while processing your payment.
            <br /> Please try again later.
          </p>
        </div>

        <Link href="/">
          <Button className="bg-[#8b3dff] hover:bg-[#9b50ff] w-full">
            Go Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default SubscriptionCancel;
