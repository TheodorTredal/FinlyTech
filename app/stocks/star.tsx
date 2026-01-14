import { Toaster } from "@/components/ui/sonner";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSearch } from "../context/SearchContext";
import { likedStock, unlikeStock, get_all_liked_stock_from_user } from "../portfolio/components/API/likeService";



export const StarStock = () => {
    const [favorite, setFavorite] = useState<boolean>(false);

    const { searchQuery } = useSearch();

    useEffect(() => {
    
        if (favorite) {
            likedStock(searchQuery);
            console.log(`Liked stock: ${searchQuery}`);
        }

        // if (!favorite) {
        //     unlikeStock(searchQuery);
        //     console.log(`Unliked stock: ${searchQuery}`);
        // }

    }, [favorite]);


    // Funksjon for håndtering av favorittklikk og visning av toast
    const handleFavoriteClick = () => {
        setFavorite(!favorite);

        // Vis en toast basert på om favoritten er aktivert eller ikke
        if (!favorite) {
            toast.success(`${searchQuery} er lagt til som favoritt!`);
        } else {
            toast.error(`${searchQuery} er fjernet fra favoritter`);
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
