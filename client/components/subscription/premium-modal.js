"use client";

import { useEditorStore } from "@/store";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import {
  CheckCircle,
  Clock,
  Crown,
  Loader2,
  Palette,
  Sparkles,
} from "lucide-react";
import { Button } from "../ui/button";
import { createPaypalOrder } from "@/services/subscription-service";
import { useState } from "react";

function SubscriptionModal({ isOpen, onClose }) {
  const { userSubscription } = useEditorStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async () => {
    setIsLoading(true);
    const response = await createPaypalOrder();

    if (response.success) {
      window.location.href = response.data.approvalLink;
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={
          "sm:max-w-[900px] p-0 gap-0 overflow-hidden border border-white/10 bg-[#1e1e2f]/80 backdrop-blur-xl shadow-2xl text-white"
        }
      >
        <div className="flex flex-col md:flex-row">
          <div className="p-6 flex-1">
            {userSubscription?.isPremium ? (
              <>
                {/* Premium Header */}
                <DialogTitle className="text-2xl font-bold mb-4 flex items-center">
                  <Sparkles className="h-6 w-6 text-yellow-400 mr-2" />
                  You're a Premium Member!
                </DialogTitle>

                {/* Active Subscription Info */}
                <div className="bg-green-600/10 border border-green-400/20 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                    <p className="text-green-300 font-medium">
                      Premium active since{" "}
                      {new Date(
                        userSubscription?.premiumSince
                      ).toLocaleDateString() || "recently"}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-white/70 mb-6">
                  Enjoy all premium features and benefits!
                </p>

                {/* Premium Benefits */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                    <Crown className="h-5 w-5 text-purple-400" />
                    <div>
                      <p className="font-medium text-white">Premium Content</p>
                      <p className="text-sm text-white/60">
                        Access to all premium templates and assets
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                    <Palette className="h-5 w-5 text-purple-400" />
                    <div>
                      <p className="font-medium text-white">Brand Tools</p>
                      <p className="text-sm text-white/60">
                        Create and maintain consistent brand identity
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                    <Clock className="h-5 w-5 text-purple-400" />
                    <div>
                      <p className="font-medium text-white">Advanced Editing</p>
                      <p className="text-sm text-white/60">
                        Time-saving tools for professional designs
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Upgrade Header */}
                <DialogTitle className="text-2xl font-bold mb-4 flex items-center">
                  <Crown className="h-6 w-6 text-purple-400 mr-2" />
                  Upgrade to Think Canvas Premium
                </DialogTitle>

                <p className="text-sm text-white/70 mb-6">
                  Unlock unlimited design possibilities by upgrading to{" "}
                  <span className="text-white font-semibold">Premium</span>
                </p>

                {/* Feature List */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                    <Crown className="h-5 w-5 text-purple-400" />
                    <div>
                      <p className="font-medium text-white">Premium Content</p>
                      <p className="text-sm text-white/60">
                        Access to all premium templates and assets
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                    <Palette className="h-5 w-5 text-purple-400" />
                    <div>
                      <p className="font-medium text-white">Brand Tools</p>
                      <p className="text-sm text-white/60">
                        Create and maintain consistent brand identity
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                    <Clock className="h-5 w-5 text-purple-400" />
                    <div>
                      <p className="font-medium text-white">Advanced Editing</p>
                      <p className="text-sm text-white/60">
                        Time-saving tools for professional designs
                      </p>
                    </div>
                  </div>
                </div>

                {/* Upgrade Button */}
                <div className="mt-6 space-y-2">
                  <Button
                    className="w-full bg-[#8b3dff] hover:bg-[#9b50ff] transition-colors"
                    onClick={handleUpgrade}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Upgrade Now"
                    )}
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Illustration */}
          <div className="hidden md:block md:w-[450px] relative">
            <div className="absolute inset-0 z-10 rounded-r-xl" />
            <img
              src="/subscription.png"
              alt="Premium Illustration"
              className="w-full h-full object-cover rounded-r-xl"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SubscriptionModal;
