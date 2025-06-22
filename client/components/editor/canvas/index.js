"use client";

import { customizeBoundingBox, initializeFabric } from "@/fabric/fabric-utils";
import { useEditorStore } from "@/store";
import { useEffect, useRef } from "react";

function Canvas() {
  const canvasRef = useRef < HTMLCanvasElement > null;
  const canvasContainerRef = useRef < HTMLDivElement > null;
  const fabricCanvasRef = useRef < any > null;
  const initAttemptedRef = useRef(false);

  const { setCanvas, markAsModified } = useEditorStore();

  useEffect(() => {
    const cleanUpCanvas = () => {
      if (fabricCanvasRef.current) {
        try {
          fabricCanvasRef.current.off("object:added");
          fabricCanvasRef.current.off("object:modified");
          fabricCanvasRef.current.off("object:removed");
          fabricCanvasRef.current.off("path:created");
        } catch (e) {
          console.error("Error removing event listeners", e);
        }

        try {
          fabricCanvasRef.current.dispose();
        } catch (e) {
          console.error("Error disposing canvas", e);
        }

        fabricCanvasRef.current = null;
        setCanvas(null);
      }
    };

    cleanUpCanvas();
    initAttemptedRef.current = false;

    const initCanvas = async () => {
      if (
        typeof window === "undefined" ||
        !canvasRef.current ||
        initAttemptedRef.current
      ) {
        return;
      }

      initAttemptedRef.current = true;

      try {
        const fabricCanvas = await initializeFabric(
          canvasRef.current,
          canvasContainerRef.current
        );

        if (!fabricCanvas) {
          console.error("Failed to initialize Fabric.js canvas");
          return;
        }

        fabricCanvasRef.current = fabricCanvas;
        setCanvas(fabricCanvas);

        customizeBoundingBox(fabricCanvas);

        const handleCanvasChange = () => markAsModified();

        fabricCanvas.on("object:added", handleCanvasChange);
        fabricCanvas.on("object:modified", handleCanvasChange);
        fabricCanvas.on("object:removed", handleCanvasChange);
        fabricCanvas.on("path:created", handleCanvasChange);
      } catch (err) {
        console.error("Failed to initialize canvas", err);
      }
    };

    const timer = setTimeout(() => initCanvas(), 50);

    return () => {
      clearTimeout(timer);
      cleanUpCanvas();
    };
  }, []);

  return (
    <div
      ref={canvasContainerRef}
      className="relative w-full h-[600px] overflow-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-inner"
    >
      <canvas ref={canvasRef} className="block max-w-full h-auto mx-auto" />
    </div>
  );
}

export default Canvas;
