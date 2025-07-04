"use client";

import { useEffect, useMemo, useRef } from "react";

function DesignPreview({ design }) {
  const canvasId = useMemo(() => `canvas-${design._id}`, [design._id]);
  const fabricCanvasRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        if (
          fabricCanvasRef.current &&
          typeof fabricCanvasRef.current.dispose === "function"
        ) {
          fabricCanvasRef.current.dispose();
          fabricCanvasRef.current = null;
        }

        const fabric = await import("fabric");
        const canvasElement = document.getElementById(canvasId);
        if (!canvasElement) return;

        const designPreviewCanvas = new fabric.StaticCanvas(canvasId, {
          renderOnAddRemove: true,
        });

        // Set dimensions explicitly
        designPreviewCanvas.setWidth(300);
        designPreviewCanvas.setHeight(300);

        fabricCanvasRef.current = designPreviewCanvas;

        let canvasData;
        try {
          canvasData =
            typeof design.canvasData === "string"
              ? JSON.parse(design.canvasData)
              : design.canvasData;
        } catch {
          console.error("Error parsing canvas data");
          return;
        }

        if (
          !canvasData ||
          !canvasData.objects ||
          canvasData.objects.length === 0
        ) {
          designPreviewCanvas.setBackgroundColor("#1e1e2f", () =>
            designPreviewCanvas.renderAll()
          );
          return;
        }

        if (canvasData.background) {
          designPreviewCanvas.setBackgroundColor(canvasData.background, () =>
            designPreviewCanvas.renderAll()
          );
        }

        designPreviewCanvas.loadFromJSON(canvasData, () => {
          designPreviewCanvas.renderAll();
        });
      } catch (e) {
        console.error("Error rendering design preview data", e);
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
  }, [canvasId, design._id, design.canvasData]);

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
