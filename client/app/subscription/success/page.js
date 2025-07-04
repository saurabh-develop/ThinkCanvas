"use client";

import { capturePaypalOrder } from "@/services/subscription-service";
import { Loader2, CheckCircle, AlertTriangle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button.js";
import Link from "next/link";

function SubscriptionSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("processing");

  useEffect(() => {
    const orderId = searchParams.get("token");

    const processPayment = async () => {
      try {
        const response = await capturePaypalOrder(orderId);
        if (response.success) {
          setStatus("success");
          setTimeout(() => router.push("/"), 2000); // auto-redirect
        } else {
          setStatus("error");
        }
      } catch (e) {
        setStatus("error");
      }
    };

    if (orderId) processPayment();
    else setStatus("error");
  }, [searchParams, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#1e1e2f] via-[#2c2c3e] to-[#1e1e2f] p-6 text-white">
      <div className="w-full max-w-md rounded-xl backdrop-blur-lg bg-white/5 border border-white/10 p-8 shadow-lg text-center space-y-4">
        {status === "processing" && (
          <>
            <Loader2 className="h-16 w-16 animate-spin text-purple-400 mx-auto" />
            <h1 className="text-2xl font-bold">Processing Payment</h1>
            <p className="text-white/70">
              Please wait while we confirm your payment...
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto" />
            <h1 className="text-2xl font-bold">Payment Successful</h1>
            <p className="text-white/70">Redirecting to your dashboard...</p>
          </>
        )}

        {status === "error" && (
          <>
            <AlertTriangle className="h-16 w-16 text-yellow-400 mx-auto" />
            <h1 className="text-2xl font-bold">Payment Failed</h1>
            <p className="text-white/70">
              Something went wrong. Please try again.
            </p>
            <Link href="/">
              <Button className="mt-4 w-full bg-[#8b3dff] hover:bg-[#9b50ff] transition-colors">
                Go Back Home
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default SubscriptionSuccess;
