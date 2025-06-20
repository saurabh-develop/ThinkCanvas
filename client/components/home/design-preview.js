"use client";

import { useEffect, useRef, useState } from "react";

function DesignPreview({ design }) {
  const [canvasId] = useState(`canvas-${design._id}-${Date.now()}`);
  const fabricCanvasRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        if (
          fabricCanvasRef.current &&
          typeof fabricCanvasRef.current.dispose === "function"
        ) {
          try {
            fabricCanvasRef.current.dispose();
            fabricCanvasRef.current = null;
          } catch (e) {
            console.error("Error while disposing canvas");
          }
        }

        const fabric = await import("fabric");
        const canvasElement = document.getElementById(canvasId);
        if (!canvasElement) return;

        const designPreviewCanvas = new fabric.StaticCanvas(canvasId, {
          width: 300,
          height: 300,
          renderOnAddRemove: true,
        });

        fabricCanvasRef.current = designPreviewCanvas;

        let canvasData;

        try {
          canvasData =
            typeof design.canvasData === "string"
              ? JSON.parse(design.canvasData)
              : design.canvasData;
        } catch (innerErr) {
          console.error("Error parsing canvas data");
          return;
        }

        if (
          canvasData === undefined ||
          canvasData === null ||
          canvasData?.objects?.length === 0
        ) {
          // fallback styling if there's no content
          designPreviewCanvas.backgroundColor = "#1e1e2f";
          designPreviewCanvas.requestRenderAll();
          return;
        }

        if (canvasData.background) {
          designPreviewCanvas.backgroundColor = canvasData.background;
          designPreviewCanvas.requestRenderAll();
        }

        designPreviewCanvas.loadFromJSON(canvasData, () => {
          designPreviewCanvas.requestRenderAll();
        });
      } catch (e) {
        console.error("Error rendering design preview data");
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (
        fabricCanvasRef.current &&
        typeof fabricCanvasRef.current.dispose === "function"
      ) {
        try {
          fabricCanvasRef.current.dispose();
          fabricCanvasRef.current = null;
        } catch (e) {
          console.error("Error while disposing canvas");
        }
      }
    };
  }, [design?._id, canvasId]);

  return (
    <div
      className="rounded-xl overflow-hidden shadow-lg backdrop-blur-lg bg-white/5 border border-white/10 transition-all duration-300"
      style={{ width: 300, height: 300 }}
    >
      <canvas
        id={canvasId}
        width="300"
        height="300"
        className="h-full w-full object-contain"
      />
    </div>
  );
}

export default DesignPreview;
