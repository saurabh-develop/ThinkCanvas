"use client";

import { addShapeToCanvas } from "@/fabric/fabric-utils";
import {
  shapeDefinitions,
  shapeTypes,
} from "@/fabric/shapes/shape-definitions";
import { useEditorStore } from "@/store";
import { useEffect, useMemo, useRef, useState } from "react";

function ElementsPanel() {
  const { canvas } = useEditorStore();
  const miniCanvasRef = useRef({});
  const canvasElementRef = useRef({});
  const [isInitialized, setIsInitialized] = useState(false);

  // ✅ Generate stable canvas IDs once
  const canvasIds = useMemo(() => {
    return shapeTypes.reduce((acc, type) => {
      acc[type] = `mini-canvas-${type}-${Math.random().toString(36).slice(2)}`;
      return acc;
    }, {});
  }, []);

  useEffect(() => {
    if (isInitialized) return;

    const timer = setTimeout(async () => {
      try {
        const fabric = await import("fabric");

        for (const shapeType of shapeTypes) {
          const canvasElement = canvasElementRef.current[shapeType];
          if (!canvasElement) continue;

          canvasElement.id = canvasIds[shapeType];

          const definition = shapeDefinitions[shapeType];

          const miniCanvas = new fabric.StaticCanvas(canvasIds[shapeType], {
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
  }, [isInitialized, canvasIds]);

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
    if (!canvas) return;
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
            <span
              className="mt-2 text-xs text-white/60 capitalize"
              title={shapeType.replace("-", " ")}
            >
              {shapeType.replace("-", " ")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ElementsPanel;
