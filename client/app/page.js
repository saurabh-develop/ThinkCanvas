"use client";

import AiFeatures from "@/components/home/ai-features";
import Banner from "@/components/home/banner";
import DesignTypes from "@/components/home/design-types";
import DesignModal from "@/components/home/designs-modal";
import Header from "@/components/home/header";
import RecentDesigns from "@/components/home/recent-designs";
import SideBar from "@/components/home/sidebar";
import SubscriptionModal from "@/components/subscription/premium-modal";
import { getUserDesigns } from "@/services/design-service";
import { getUserSubscription } from "@/services/subscription-service";
import { useEditorStore } from "@/store";
import { useEffect } from "react";

export default function Home() {
  const {
    setUserSubscription,
    setUserDesigns,
    showPremiumModal,
    setShowPremiumModal,
    showDesignsModal,
    setShowDesignsModal,
    userDesigns,
    setUserDesignsLoading,
    userDesignsLoading,
  } = useEditorStore();

  const fetchUserSubscription = async () => {
    const response = await getUserSubscription();

    if (response.success) setUserSubscription(response.data);
  };

  async function fetchUserDesigns() {
    setUserDesignsLoading(true);
    const result = await getUserDesigns();

    if (result?.success) {
      setUserDesigns(result?.data);
      setUserDesignsLoading(false);
    }
  }

  useEffect(() => {
    fetchUserSubscription();
    fetchUserDesigns();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#1e1e2f] via-[#2c2c3e] to-[#1e1e2f] text-white">
      <SideBar />
      <div className="flex-1 flex flex-col ml-[72px]">
        <Header />
        <main className="flex-1 p-6 pt-20 overflow-y-auto space-y-6">
          <section className="backdrop-blur-lg bg-white/10 border border-white/10 rounded-xl p-6 shadow-md">
            <Banner />
          </section>
          <section className="backdrop-blur-lg bg-white/10 border border-white/10 rounded-xl p-6 shadow-md">
            <DesignTypes />
          </section>
          <section className="backdrop-blur-lg bg-white/10 border border-white/10 rounded-xl p-6 shadow-md">
            <AiFeatures />
          </section>
          <section className="backdrop-blur-lg bg-white/10 border border-white/10 rounded-xl p-6 shadow-md">
            <RecentDesigns />
          </section>
        </main>
      </div>

      <SubscriptionModal
        isOpen={showPremiumModal}
        onClose={setShowPremiumModal}
      />

      <DesignModal
        isOpen={showDesignsModal}
        onClose={setShowDesignsModal}
        userDesigns={userDesigns}
        setShowDesignsModal={setShowDesignsModal}
        userDesignsLoading={userDesignsLoading}
      />
    </div>
  );
}
