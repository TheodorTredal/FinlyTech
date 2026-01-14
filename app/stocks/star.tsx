import { Toaster } from "@/components/ui/sonner";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSearch } from "../context/SearchContext";
import { likedStock, unlikeStock, get_all_liked_stock_from_user } from "../portfolio/components/API/likeService";



/**
 *  Vi må hente fra databasen om aksjen er likt eller ikke
 * Stjernen skal være gul om aksjen er likt
 * Vi må fikse buggen med å fjerne likte aksjer.
 */

export const StarStock = () => {

    const [favorite, setFavorite] = useState<boolean>(false);
    const [likedStocks, setLikedStocks] = useState<any[]>([]);
    const { searchQuery } = useSearch();


    useEffect(() => {

        const fetchLikedStocks = async () => {
            const result = await get_all_liked_stock_from_user();
            setLikedStocks(result);
        }

        fetchLikedStocks();

    }, [searchQuery])



    useEffect(() => {
        console.log("Liked STOCKS: ", likedStocks);

        const isLiked = likedStocks.some(
            (stock: any) => stock.ticker === searchQuery
        );        

        setFavorite(isLiked)

    }, [likedStocks])

    useEffect(() => {
    
        if (favorite) {
            likedStock(searchQuery);
            console.log(`Liked stock: ${searchQuery}`);
        }

        if (!favorite) {
            unlikeStock(searchQuery);
            console.log(`Unliked stock: ${searchQuery}`);
        }

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
