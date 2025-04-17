"use client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface PortfolioEntryOptionsInterface {
  setShowOptions: (show: boolean) => void;
}

export const PortfolioEntryOptions = ({ setShowOptions }: PortfolioEntryOptionsInterface) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#1e1e1e] w-1/2 h-1/2 rounded-lg shadow-lg p-4 text-black flex flex-col">
        
        {/* Textarea */}
        <Textarea
          className="text-white resize-none flex-grow"
          placeholder="Thoughts about the stock, why you bought it, etc..."
        />

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="ghost" className="text-gray-300">
            Rediger
          </Button>
          <Button
            className="text-gray-300 bg-green-600"
            onClick={() => setShowOptions(false)}
          >
            Lukk
          </Button>
        </div>
      </div>
    </div>
  );
};
