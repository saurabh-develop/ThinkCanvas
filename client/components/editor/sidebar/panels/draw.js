"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { brushSizes, drawingPanelColorPresets } from "@/config";
import {
  toggleDrawingMode,
  toggleEraseMode,
  updateDrawingBrush,
} from "@/fabric/fabric-utils";
import { useEditorStore } from "@/store";
import {
  Droplets,
  EraserIcon,
  Minus,
  Paintbrush,
  Palette,
  PencilIcon,
  Plus,
} from "lucide-react";
import { useState } from "react";

function DrawingPanel() {
  const { canvas } = useEditorStore();
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [drawingColor, setDrawingColor] = useState("#8b3dff");
  const [brushWidth, setBrushWidth] = useState(5);
  const [drawingOpacity, setDrawingOpacity] = useState(100);
  const [activeTab, setActiveTab] = useState("colors");

  const handleToggleDrawingMode = () => {
    if (!canvas) return;
    const newMode = !isDrawingMode;
    setIsDrawingMode(newMode);
    if (newMode && isErasing) setIsErasing(false);
    toggleDrawingMode(canvas, newMode, drawingColor, brushWidth);
  };

  const handleDrawingColorChange = (color) => {
    setDrawingColor(color);
    if (canvas && isDrawingMode && !isErasing) {
      updateDrawingBrush(canvas, { color });
    }
  };

  const handleBrushWidthChange = (width) => {
    setBrushWidth(width);
    if (canvas && isDrawingMode) {
      updateDrawingBrush(canvas, { width: isErasing ? width * 2 : width });
    }
  };

  const handleDrawingOpacityChange = (value) => {
    const opacity = value[0];
    setDrawingOpacity(opacity);
    if (canvas && isDrawingMode) {
      updateDrawingBrush(canvas, { opacity: opacity / 100 });
    }
  };

  const handleToggleErasing = () => {
    if (!canvas && !isDrawingMode) return;
    const newErasing = !isErasing;
    setIsErasing(newErasing);
    toggleEraseMode(canvas, newErasing, drawingColor, brushWidth * 2);
  };

  return (
    <div className="p-4 rounded-2xl bg-[#1e1e2f]/80 backdrop-blur-xl border border-white/10 text-white space-y-5 shadow-lg">
      <Button
        variant={isDrawingMode ? "default" : "outline"}
        className={`w-full py-6 transition-all font-semibold rounded-xl ${
          isDrawingMode
            ? "bg-[#8b3dff] hover:bg-[#9b50ff]"
            : "bg-transparent border-white/10 text-white/80 hover:bg-white/10"
        }`}
        size="lg"
        onClick={handleToggleDrawingMode}
      >
        <PencilIcon className="mr-2 h-5 w-5" />
        {isDrawingMode ? "Exit Drawing Mode" : "Enter Drawing Mode"}
      </Button>

      {isDrawingMode && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 bg-white/5 border border-white/10 rounded-xl mb-4">
            {[
              { value: "colors", icon: Palette, label: "Colors" },
              { value: "brush", icon: Paintbrush, label: "Brush" },
              { value: "tools", icon: EraserIcon, label: "Tools" },
            ].map(({ value, icon: Icon, label }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="text-white/80 data-[state=active]:bg-[#8b3dff]/80 data-[state=active]:text-white font-medium"
              >
                <Icon className="mr-2 h-4 w-4" />
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="colors">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-white/70">Selected Color</Label>
                <div
                  className="w-6 h-6 rounded-full border border-white/20 shadow-sm"
                  style={{ backgroundColor: drawingColor }}
                />
              </div>
              <div className="grid grid-cols-5 gap-2">
                {drawingPanelColorPresets.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleDrawingColorChange(color)}
                    style={{ backgroundColor: color }}
                    className={`w-10 h-10 rounded-full border border-white/10 transition-transform hover:scale-110 ${
                      color === drawingColor
                        ? "ring-2 ring-offset-2 ring-[#8b3dff]"
                        : ""
                    }`}
                  />
                ))}
              </div>
              <div className="flex mt-4 space-x-2">
                <Input
                  type="color"
                  value={drawingColor}
                  onChange={(e) => handleDrawingColorChange(e.target.value)}
                  className="w-12 h-10 p-1 rounded border border-white/10 bg-transparent"
                  disabled={isErasing}
                />
                <Input
                  type="text"
                  value={drawingColor}
                  onChange={(e) => handleDrawingColorChange(e.target.value)}
                  className="flex-1 rounded border border-white/10 bg-transparent text-white"
                  disabled={isErasing}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="brush">
            <div className="space-y-5">
              <div>
                <Label className="text-sm font-semibold text-white/80 mb-1 block">
                  Brush Size
                </Label>
                <div className="flex items-center space-x-3">
                  <Minus className="w-4 h-4 text-white/60" />
                  <Slider
                    value={[brushWidth]}
                    min={1}
                    max={30}
                    step={1}
                    onValueChange={(value) => setBrushWidth(value[0])}
                    className="flex-1"
                  />
                  <Plus className="w-4 h-4 text-white/60" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {brushSizes.map((size) => (
                  <Button
                    key={size.value}
                    variant={size.value === brushWidth ? "default" : "outline"}
                    className="w-full px-2 py-1 rounded-lg border-white/10 bg-white/10 text-white/90 hover:bg-white/20"
                    onClick={() => handleBrushWidthChange(size.value)}
                  >
                    {size.label}
                  </Button>
                ))}
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label className="flex items-center gap-2 text-white font-medium">
                    <Droplets className="w-4 h-4" />
                    Opacity
                  </Label>
                  <span className="text-sm font-medium">{drawingOpacity}%</span>
                </div>
                <Slider
                  value={[drawingOpacity]}
                  min={1}
                  max={100}
                  step={1}
                  onValueChange={handleDrawingOpacityChange}
                  className="text-[#8b3dff]"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tools">
            <Button
              onClick={handleToggleErasing}
              variant={isErasing ? "destructive" : "outline"}
              className={`w-full py-6 rounded-xl font-semibold ${
                isErasing
                  ? "bg-red-500/20 hover:bg-red-500/30"
                  : "bg-transparent border-white/10 text-white/80 hover:bg-white/10"
              }`}
              size="lg"
            >
              <EraserIcon className="mr-2 w-5 h-5" />
              {isErasing ? "Stop Erasing" : "Eraser Mode"}
            </Button>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

export default DrawingPanel;
