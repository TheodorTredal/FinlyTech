import { Toaster } from "@/components/ui/sonner";
import { Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";



export const StarStock = () => {
    const [favorite, setFavorite] = useState<boolean>(false);

    // Funksjon for håndtering av favorittklikk og visning av toast
    const handleFavoriteClick = () => {
        setFavorite(!favorite);

        // Vis en toast basert på om favoritten er aktivert eller ikke
        if (!favorite) {
            toast.success("Aksje er lagt til som favoritt!");
        } else {
            toast.error("Aksje er fjernet fra favoritter");
        }
    }

    return (
        <div className="ml-auto">
            {/* Stjerne som kan klikkes på */}
            <Star
                onClick={handleFavoriteClick}
                className={`ml-auto ${favorite ? 'fill-yellow-500' : "fill-gray-300"} stroke-none`}
            />

            {/* Toaster-komponenten for å vise toast-meldinger */}
            <Toaster className="flex justify-center"/>
        </div>
    );
};
