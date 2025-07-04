"use client";

import {
  ArrowLeft,
  ChevronLeft,
  Grid,
  Pencil,
  Settings,
  Sparkle,
  Type,
  Upload,
} from "lucide-react";
import { useState } from "react";
import ElementsPanel from "./panels/elements";
import TextPanel from "./panels/text";
import UploadPanel from "./panels/upload";
import DrawingPanel from "./panels/draw";
import SettingsPanel from "./panels/settings";
import AiPanel from "./panels/ai";

const sidebarItems = [
  { id: "elements", icon: Grid, label: "Elements", panel: ElementsPanel },
  { id: "text", icon: Type, label: "Text", panel: TextPanel },
  { id: "uploads", icon: Upload, label: "Uploads", panel: UploadPanel },
  { id: "draw", icon: Pencil, label: "Draw", panel: DrawingPanel },
  { id: "ai", icon: Sparkle, label: "AI", panel: AiPanel },
  { id: "settings", icon: Settings, label: "Settings", panel: SettingsPanel },
];

function Sidebar() {
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState(null);

  const handleItemClick = (id) => {
    if (id === activeSidebar && !isPanelCollapsed) return;
    setActiveSidebar(id);
    setIsPanelCollapsed(false);
  };

  const closeSecondaryPanel = () => setActiveSidebar(null);
  const togglePanelCollapse = (e) => {
    e.stopPropagation();
    setIsPanelCollapsed((prev) => !prev);
  };

  const activeItem = sidebarItems.find((item) => item.id === activeSidebar);
  const PanelComponent = activeItem?.panel;

  return (
    <div className="flex h-full">
      {/* Primary Vertical Sidebar */}
      <aside
        className="flex flex-col gap-2 w-16 bg-[#1e1e2f]/80 backdrop-blur-xl 
                   border-r border-white/10 p-2 text-white shadow-xl"
        role="navigation"
        aria-label="Sidebar Navigation"
      >
        {sidebarItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => handleItemClick(id)}
            className={`flex flex-col items-center justify-center rounded-xl p-2 transition-all 
                        hover:bg-[#8b3dff]/20 ${
                          activeSidebar === id ? "bg-[#8b3dff]/30" : ""
                        }`}
            aria-label={`Open ${label} panel`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </aside>

      {/* Slide-out Panel */}
      {activeSidebar && (
        <div
          className={`relative transition-all duration-300 ease-in-out ${
            isPanelCollapsed ? "w-0 opacity-0" : "w-[320px] opacity-100"
          }`}
        >
          <div className="absolute inset-0 bg-[#1e1e2f]/80 backdrop-blur-xl border-l border-white/10 shadow-xl flex flex-col">
            {/* Panel Header */}
            <div className="flex items-center justify-between p-3 border-b border-white/10">
              <button
                onClick={closeSecondaryPanel}
                className="p-2 rounded hover:bg-white/10 transition"
                aria-label="Close panel"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <span className="text-white font-medium text-sm">
                {activeItem.label}
              </span>
              <button
                onClick={togglePanelCollapse}
                className="p-2 rounded hover:bg-white/10 transition"
                aria-label="Collapse panel"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {PanelComponent && <PanelComponent />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
