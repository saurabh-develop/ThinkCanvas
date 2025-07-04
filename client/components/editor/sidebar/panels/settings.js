"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { colorPresets } from "@/config";
import { centerCanvas } from "@/fabric/fabric-utils";
import { useEditorStore } from "@/store";
import { Check, Palette, RotateCcw } from "lucide-react";

function SettingsPanel() {
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const { canvas, markAsModified } = useEditorStore();

  useEffect(() => {
    const savedColor = localStorage.getItem("backgroundColor");
    if (savedColor) setBackgroundColor(savedColor);
  }, []);

  const handleColorChange = (event) => {
    setBackgroundColor(event.target.value);
  };

  const handleColorPresetApply = (color) => {
    setBackgroundColor(color);
  };

  const handleApplyChanges = () => {
    if (!canvas) return;
    canvas.set("backgroundColor", backgroundColor);
    canvas.renderAll();
    centerCanvas(canvas);
    markAsModified();
    localStorage.setItem("backgroundColor", backgroundColor);
  };

  const handleResetToDefault = () => {
    setBackgroundColor("#ffffff");
  };

  const isDisabled = !canvas || backgroundColor === canvas?.backgroundColor;

  return (
    <div className="p-4 space-y-6 rounded-2xl bg-[#1e1e2f]/80 backdrop-blur-xl border border-white/10 shadow-xl text-white">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="w-5 h-5 text-[#8b3dff]" />
        <h3 className="text-lg font-semibold text-white">Background Color</h3>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-6 gap-2">
          {colorPresets.map((color) => (
            <TooltipProvider key={color}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className={`w-8 h-8 rounded-md border border-white/10 transition-transform hover:scale-110 ${
                      color === backgroundColor
                        ? "ring-2 ring-offset-2 ring-[#8b3dff]"
                        : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorPresetApply(color)}
                  >
                    {color === backgroundColor && (
                      <Check className="w-4 h-4 text-white mx-auto drop-shadow" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">{color}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        <div className="flex mt-4 space-x-2">
          <Input
            type="color"
            value={backgroundColor}
            onChange={handleColorChange}
            className="w-12 h-10 p-1 border border-white/10 rounded cursor-pointer bg-transparent"
          />
          <Input
            type="text"
            value={backgroundColor}
            onChange={handleColorChange}
            className="flex-1 bg-transparent border border-white/10 text-white"
            placeholder="#FFFFFF"
          />
        </div>

        <Separator className="my-4 bg-white/10" />

        <div className="flex flex-col gap-2">
          <Button
            disabled={isDisabled}
            onClick={handleApplyChanges}
            className="w-full bg-[#8b3dff] hover:bg-[#9b50ff] text-white disabled:opacity-50"
          >
            Apply Changes
          </Button>

          <Button
            onClick={handleResetToDefault}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 text-white/70 hover:bg-white/10"
          >
            <RotateCcw className="w-4 h-4" />
            Reset to Default
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPanel;
