import { Button } from "@/components/ui/button";
import { IndicatorKey } from "./graphInterfaces";
import { useState } from "react";

interface ColorPalleteProps {
    selectedColor: string;
    onSelectColor: (color: string) => void;
}

const colors = [
  "#b91c1c", // red-700
  "#f97316", // orange-500
  "#f59e0b", // amber-400
  "#65a30d", // lime-600
  "#0d9488", // teal-600
  "#1d4ed8", // blue-700
  "#86198f", // fuchsia-800
];

export const ColorPallete = ({
  selectedColor,
  onSelectColor,
}: ColorPalleteProps) => {

  const [currentColor, setCurrentColor] = useState<string>("");

  const handleColorChange = (color: string) => {
    onSelectColor(color);
    setCurrentColor(color);
  }


  return (
    <div className="flex gap-2">
      {colors.map((color) => (
        <Button
          key={color}
          onClick={() => handleColorChange(color)}
          className={`p-0 min-h-0 w-4 h-4 rounded-none ${color} ${
            currentColor === color ? "ring-2 ring-white" : ""
          }`}
          style={{backgroundColor: color}}
        />
      ))}
    </div>
  );
};