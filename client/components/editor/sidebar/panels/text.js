"use client";

import { Button } from "@/components/ui/button";
import { textPresets } from "@/config";
import { addTextToCanvas } from "@/fabric/fabric-utils";
import { useEditorStore } from "@/store";
import { Type } from "lucide-react";

function TextPanel() {
  const { canvas } = useEditorStore();

  const handleAddCustomTextBox = () => {
    if (!canvas) return;
    addTextToCanvas(canvas, "Enter text here", { fontSize: 24 });
  };

  const handleAddPresetText = (preset) => {
    if (!canvas) return;
    addTextToCanvas(canvas, preset.text, preset);
  };

  return (
    <div className="h-full overflow-y-auto p-4 rounded-2xl bg-[#1e1e2f]/80 backdrop-blur-xl border border-white/10 shadow-xl text-white space-y-6">
      <Button
        onClick={handleAddCustomTextBox}
        className="w-full py-3 px-4 bg-[#8b3dff] hover:bg-[#9c50ff] text-white rounded-md flex items-center justify-center transition-all"
      >
        <Type className="mr-2 h-5 w-5" />
        <span className="font-medium">Add a Text Box</span>
      </Button>

      <div>
        <h4 className="text-white/90 text-base font-semibold mb-4">
          Default Text Styles
        </h4>
        <div className="space-y-3">
          {textPresets.map((preset, index) => (
            <button
              key={index}
              onClick={() => handleAddPresetText(preset)}
              className="w-full text-left p-3 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              style={{
                fontSize: `${Math.min(preset.fontSize / 1.8, 24)}px`,
                fontWeight: preset.fontWeight,
                fontStyle: preset.fontStyle || "normal",
                fontFamily: preset.fontFamily,
                color: "white",
              }}
            >
              {preset.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TextPanel;
