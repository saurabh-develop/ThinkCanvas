"use client";

import { useParams, useRouter } from "next/navigation";
import Canvas from "./canvas";
import Header from "./header";
import Sidebar from "./sidebar";
import { useCallback, useEffect, useState } from "react";
import { useEditorStore } from "@/store";
import { getUserDesignByID } from "@/services/design-service";
import Properties from "./properties";
import SubscriptionModal from "../subscription/premium-modal";

function MainEditor() {
  const params = useParams();
  const router = useRouter();
  const designId = params?.slug;

  const [isLoading, setIsLoading] = useState(!!designId);
  const [loadAttempted, setLoadAttempted] = useState(false);
  const [error, setError] = useState(null);

  const {
    canvas,
    setDesignId,
    resetStore,
    setName,
    setShowProperties,
    showProperties,
    isEditing,
    setShowPremiumModal,
    showPremiumModal,
  } = useEditorStore();

  useEffect(() => {
    resetStore();
    if (designId) setDesignId(designId);
    return () => resetStore();
  }, []);

  useEffect(() => {
    setLoadAttempted(false);
    setError(null);
  }, [designId]);

  useEffect(() => {
    if (isLoading && !canvas && designId) {
      const timer = setTimeout(() => {
        if (isLoading) {
          console.log("Canvas init timeout");
          setIsLoading(false);
        }
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, canvas, designId]);

  const loadDesign = useCallback(async () => {
    if (!canvas || !designId || loadAttempted) return;

    try {
      setIsLoading(true);
      setLoadAttempted(true);

      const response = await getUserDesignByID(designId);
      const design = response.data;

      if (design) {
        setName(design.name);
        setDesignId(designId);

        if (design.canvasData) {
          canvas.clear();
          if (design.width && design.height) {
            canvas.setDimensions({
              width: design.width,
              height: design.height,
            });
          }

          const canvasData =
            typeof design.canvasData === "string"
              ? JSON.parse(design.canvasData)
              : design.canvasData;

          canvas.backgroundColor = canvasData.background || "#ffffff";

          const hasObjects = canvasData.objects?.length > 0;
          if (!hasObjects) {
            canvas.renderAll();
            return;
          }

          canvas.loadFromJSON(canvasData).then(() => canvas.requestRenderAll());
        } else {
          canvas.clear();
          canvas.setWidth(design.width);
          canvas.setHeight(design.height);
          canvas.backgroundColor = "#ffffff";
          canvas.renderAll();
        }
      }
    } catch (e) {
      console.error("Failed to load design", e);
      setError("Failed to load design");
    } finally {
      setIsLoading(false);
    }
  }, [canvas, designId, loadAttempted, setDesignId]);

  useEffect(() => {
    if (designId && canvas && !loadAttempted) {
      loadDesign();
    } else if (!designId) {
      router.replace("/");
    }
  }, [canvas, designId, loadDesign, loadAttempted, router]);

  useEffect(() => {
    if (!canvas) return;

    const handleSelectionCreated = () => {
      const activeObject = canvas.getActiveObject();
      if (activeObject) setShowProperties(true);
    };

    const handleSelectionCleared = () => setShowProperties(false);

    canvas.on("selection:created", handleSelectionCreated);
    canvas.on("selection:updated", handleSelectionCreated);
    canvas.on("selection:cleared", handleSelectionCleared);

    return () => {
      canvas.off("selection:created", handleSelectionCreated);
      canvas.off("selection:updated", handleSelectionCreated);
      canvas.off("selection:cleared", handleSelectionCleared);
    };
  }, [canvas]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#1e1e2f] text-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {isEditing && <Sidebar />}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <main className="flex-1 overflow-hidden flex items-center justify-center">
            <Canvas />
          </main>
        </div>
      </div>
      {showProperties && isEditing && <Properties />}
      <SubscriptionModal
        isOpen={showPremiumModal}
        onClose={setShowPremiumModal}
      />
    </div>
  );
}

export default MainEditor;
