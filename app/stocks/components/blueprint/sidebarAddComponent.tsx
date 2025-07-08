// BluePrintSidebar.tsx - Løsning 1: Uten Sheet overlay
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

export const BluePrintSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDragStart = (e: React.DragEvent, componentType: string) => {
    console.log("🚀 Drag started:", componentType);
    e.dataTransfer.setData("component-type", componentType);
    e.dataTransfer.effectAllowed = "copy";
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => setIsOpen(!isOpen)}
      >
        Add +
      </Button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-gray-900 border border-gray-700 text-white rounded-lg shadow-lg z-50">
          <div className="p-4">
            <h3 className="font-semibold mb-3">Legg til komponent</h3>
            <div className="space-y-2">
              <div
                className="rounded-lg border border-gray-700 bg-gray-800 p-4 cursor-move hover:bg-gray-700 transition"
                draggable
                onDragStart={(e) => handleDragStart(e, "chart")}
                onDragEnd={() => console.log("🏁 Drag ended")}
              >
                📈 Aksjegraf
              </div>
              <div
                className="rounded-lg border border-gray-700 bg-gray-800 p-4 cursor-move hover:bg-gray-700 transition"
                draggable
                onDragStart={(e) => handleDragStart(e, "keyInfo")}
                onDragEnd={() => console.log("🏁 Drag ended")}
              >
                📊 Nøkkeltall
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};