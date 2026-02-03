import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface BluePrintSidebarProps {
  setEdit: (edit: boolean) => void;
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
}

const COMPONENTS = [
    { type: "keyInfo", icon: "🧾", label: "Nøkkeltall om Porteføljen" },
    { type: "pieChart", icon: "p", label: "Portefølje fordeling" },
    { type: "portfolioChart", icon: "G", label: "Portefølje graf" },
];

export const BluePrintSidebarPortfolio = ({ setEdit, setIsOpen, isOpen }: BluePrintSidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent, componentType: string) => {
    e.dataTransfer.setData("component-type", componentType);
    e.dataTransfer.effectAllowed = "copy";
    console.log("component-type", componentType);
    setEdit(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 right-0 z-50 h-screen w-72 bg-black border-l border-gray-700/50 text-white shadow-lg rounded-l-lg overflow-y-auto transition-transform duration-500 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ willChange: "transform" }}
    >
      <Button
        className="absolute right-4 top-4 w-6 h-6 p-0 bg-black/60 border-2 border-stone-500 text-stone-300 rounded-md hover:bg-black/80 flex items-center justify-center transition"
        onClick={() => setIsOpen(false)}
      >
        <X className="w-3 h-3" />
      </Button>

      <div className="p-6 pt-16">
        <h4 className="text-white font-mono font-semibold mb-6">➕ Legg til komponenter</h4>

        <div className="space-y-4">
          {COMPONENTS.map(({ type, icon, label }) => (
            <div
              key={type}
              className="flex items-center gap-3 rounded-xl border border-gray-700 bg-gray-900/70 p-4 cursor-move hover:bg-gray-800 transition duration-200"
              draggable
              onDragStart={(e) => handleDragStart(e, type)}
            >
              <span className="text-2xl">{icon}</span>
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
