"use client";

import { Crown, Loader } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { saveDesign } from "@/services/design-service";
import { useRouter } from "next/navigation";
import { useEditorStore } from "@/store";
import { toast } from "sonner";

function Banner() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { userSubscription, userDesigns } = useEditorStore();

  const handleCreateNewDesign = async () => {
    if (userDesigns?.length >= 5 && !userSubscription.isPremium) {
      toast.error("Please upgrade to premium!", {
        description: "You need to upgrade to premium to create more designs",
      });
      return;
    }
    if (loading) return;
    try {
      setLoading(true);
      const initialDesignData = {
        name: "Untitled design - Youtube Thumbnail",
        canvasData: null,
        width: 825,
        height: 465,
        category: "youtube_thumbnail",
      };
      const newDesign = await saveDesign(initialDesignData);
      if (newDesign?.success) {
        router.push(`/editor/${newDesign?.data?._id}`);
        setLoading(false);
      } else {
        throw new Error("Failed to create new design");
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl backdrop-blur-lg bg-white/10 border border-white/10 p-6 sm:p-8 md:p-10 text-white shadow-xl text-center transition-all duration-300">
      <div className="flex flex-col sm:flex-row justify-center items-center mb-4 gap-3 sm:gap-5">
        <Crown className="h-10 w-10 md:h-12 md:w-12 text-yellow-300" />
        <span className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-white">
          Unleash Ideas with Think Canvas
        </span>
      </div>
      <h2 className="text-base sm:text-lg md:text-xl font-medium text-white/80 mb-6 max-w-2xl mx-auto">
        Sketch, create, and collaborate — powered by AI and crafted for
        creativity.
      </h2>
      <Button
        onClick={handleCreateNewDesign}
        className="bg-[#8b3dff] hover:bg-[#a564ff] text-white font-semibold rounded-xl px-6 py-3 transition-all duration-300"
      >
        {loading && <Loader className="w-4 h-4 mr-2 animate-spin" />}
        Start Designing
      </Button>
    </div>
  );
}

export default Banner;
