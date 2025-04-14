"use client";
import { Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";


interface PortfolioEntryOptionsInterface {
    setShowOptions: (show: boolean) => void;
}

export const PortfolioEntryOptions = ({ setShowOptions }: PortfolioEntryOptionsInterface) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-[#1e1e1e] w-1/2 h-1/2 rounded-lg shadow-lg p-4 text-black relative">
          <button
            className="absolute top-2 right-2 text-gray-400"
            onClick={() => setShowOptions(false)}
          >
            Lukk
          </button>
          <Trash2 className="text-gray-400"></Trash2>
            <Textarea className="text-white" placeholder="Thougts about the stock, why you bought it, etc.."></Textarea>
        </div>
      </div>
    )
}