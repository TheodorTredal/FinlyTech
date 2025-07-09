import React from "react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { X } from 'lucide-react';

interface BluePrintSidebarProps {
  setEdit: (edit: boolean) => void;
  setIsOpen: (sidebarIsOpen: boolean) => void;
  isOpen: boolean;
}

export const BluePrintSidebar = ({ setEdit, setIsOpen, isOpen }: BluePrintSidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  const handleDragStart = (e: React.DragEvent, componentType: string) => {
    e.dataTransfer.setData("component-type", componentType);
    e.dataTransfer.effectAllowed = "copy";
    setEdit(true) // skru på edit modus
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [setIsOpen]);

  return (
<div
  ref={sidebarRef}
  className={`fixed top-0 right-0 h-screen w-72 z-50 overflow-y-auto
    bg-black border-l border-gray-700/50
    text-white shadow-lg rounded-l-lg
    transition-transform duration-500 ease-in-out
    transform ${isOpen ? "translate-x-0" : "translate-x-full"}
  `}
  style={{ willChange: "transform" }}
>
<Button
  className="absolute right-4 top-4 bg-black/60 border border-2 border-stone-500 text-stone-300 rounded-md hover:bg-black/80 transition w-6 h-6 p-0 flex items-center justify-center"
  onClick={() => setIsOpen(false)}
>
  <X className="h-3 w-3" />
</Button>

  <div className="p-6 pt-16">
    <h3 className="text-lg font-semibold mb-6 text-white">➕ Legg til komponent</h3>

    <div className="space-y-4">
      <div
        className="flex items-center gap-3 rounded-xl border border-gray-700 bg-gray-900/70 p-4 cursor-move hover:bg-gray-800 transition duration-200"
        draggable
        onDragStart={(e) => handleDragStart(e, "chart")}
      >
        <span className="text-2xl">📈</span>
        <span className="text-sm font-medium">Aksjegraf</span>
      </div>

      <div
        className="flex items-center gap-3 rounded-xl border border-gray-700 bg-gray-900/70 p-4 cursor-move hover:bg-gray-800 transition duration-200"
        draggable
        onDragStart={(e) => handleDragStart(e, "keyInfo")}
      >
        <span className="text-2xl">📊</span>
        <span className="text-sm font-medium">Nøkkeltall</span>
      </div>
    </div>
  </div>
</div>

  );
}