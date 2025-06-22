"use client";

import { addShapeToCanvas } from "@/fabric/fabric-utils";
import {
  shapeDefinitions,
  shapeTypes,
} from "@/fabric/shapes/shape-definitions";
import { useEditorStore } from "@/store";
import { useEffect, useRef, useState } from "react";

function ElementsPanel() {
  const { canvas } = useEditorStore();
  const miniCanvasRef = useRef({});
  const canvasElementRef = useRef({});
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isInitialized) return;

    const timer = setTimeout(async () => {
      try {
        const fabric = await import("fabric");

        for (const shapeType of shapeTypes) {
          const canvasElement = canvasElementRef.current[shapeType];
          if (!canvasElement) continue;

          const canvasId = `mini-canvas-${shapeType}-${Date.now()}`;
          canvasElement.id = canvasId;

          const definition = shapeDefinitions[shapeType];

          const miniCanvas = new fabric.StaticCanvas(canvasId, {
            width: 100,
            height: 100,
            backgroundColor: "transparent",
            renderOnAddRemove: true,
          });

          miniCanvasRef.current[shapeType] = miniCanvas;
          definition.thumbnail(fabric, miniCanvas);
          miniCanvas.renderAll();
        }

        setIsInitialized(true);
      } catch (e) {
        console.error("Canvas init failed", e);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isInitialized]);

  useEffect(() => {
    return () => {
      Object.values(miniCanvasRef.current).forEach((miniCanvas) => {
        if (miniCanvas && typeof miniCanvas.dispose === "function") {
          try {
            miniCanvas.dispose();
          } catch (e) {
            console.error("Dispose error", e);
          }
        }
      });

      miniCanvasRef.current = {};
      setIsInitialized(false);
    };
  }, []);

  const setCanvasRef = (el, shapeType) => {
    if (el) {
      canvasElementRef.current[shapeType] = el;
    }
  };

  const handleShapeClick = (type) => {
    addShapeToCanvas(canvas, type);
  };

  return (
    <div className="h-full overflow-y-auto p-4 bg-[#1e1e2f]/80 rounded-2xl border border-white/10 backdrop-blur-xl text-white shadow-xl">
      <h2 className="text-lg font-semibold mb-4 text-white/90">Elements</h2>
      <div className="grid grid-cols-3 gap-3">
        {shapeTypes.map((shapeType) => (
          <div
            key={shapeType}
            className="cursor-pointer flex flex-col items-center justify-center border border-white/10 bg-white/5 rounded-xl p-2 hover:ring-2 hover:ring-[#8b3dff] hover:scale-105 transition-all"
            onClick={() => handleShapeClick(shapeType)}
          >
            <canvas
              width="80"
              height="80"
              ref={(el) => setCanvasRef(el, shapeType)}
              className="rounded"
            />
            <span className="mt-2 text-xs text-white/60 capitalize">
              {shapeType.replace("-", " ")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ElementsPanel;
