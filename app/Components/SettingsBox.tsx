
import { ModeToggle } from "@/components/ui/ModeToggle";

export const SettingsBox = ({ onClose }: { onClose: () => void }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div className="bg-slate-800 text-white p-6 rounded-lg shadow-lg relative 
                        w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto">
          
          {/* Lukk-knapp */}
          <button 
            className="absolute top-3 right-3 text-white bg-neutral-700 px-3 py-1 rounded hover:bg-red-700" 
            onClick={onClose}>
            x
          </button>

          <h2 className="text-xl font-bold mb-4">Settings</h2>
          <p className="text-sm">Her kan du endre innstillinger</p>
          
          {/* Responsiv ModeToggle */}
          <div className="mt-4">
            <ModeToggle />
          </div>

            <p>Username</p>
        </div>
      </div>
    );
  };
