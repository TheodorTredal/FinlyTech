import { useEffect, useState } from "react"
import { get_all_liked_stock_from_user } from "../API/likeService"
import { fetchStockChart2 } from "@/app/Services/yahooFinance/ApiSpecificCompany";


export const LikedStocksComponent = () => {
    const [likedStocks, setLikedStocks] = useState<any[]>([]);

    useEffect(() => {

        const fetchLikedStocks = async () => {
            const result = await get_all_liked_stock_from_user();
            setLikedStocks(result)
        }

        fetchLikedStocks();
    }, [])
    
    useEffect(() => {
        
        console.log(likedStocks);
        if (!likedStocks) {
            return
        }

        const fetchStockPrice = async () => {
            for (let i: number = 0; i < likedStocks.length; i ++) {
                const ticker = likedStocks[i].ticker;

                console.log("TICKER", ticker);
                try {
                    const result = await fetchStockChart2(ticker, "1d")
                    console.log("RESULT: ",  result);

                } catch (err) {
                    console.log(`Could not fetch data for ${ticker}`);
                }
            }
        }

        fetchStockPrice();

    }, [likedStocks])


    return (
        <div className="w-full h-full p-6">
            {/** Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold">Likte aksjer</h1>
                <p className="text-sm text-muted-foreground">
                    oversikt over aksjer du følger
                </p>
            </div>

            {/** Table */}
            <div className="rounded-xl border overflow-hidden">
                <table className="w-full table-fixed border-collapse text-sm">
                    <thead className="bg-muted/40">
                        <tr>
                            <th className="px-4 py-3 text-left font-medium">Ticker</th>
                            <th className="px-4 py-3 text-left font-medium">Navn</th>
                            <th className="px-4 py-3 text-left font-medium">Pris</th>
                            <th className="px-4 py-3 text-left font-medium">Endring</th>
                        </tr>
                    </thead>

                    <tbody>
                        {likedStocks.map((stock: any) => (
                            <tr
                            key={stock.ticker}
                            className="border-t hover:bg-muted/40 transition"
                            >
                                <td className="px-4 py-3 font-medium font-mono">
                                    {stock.ticker ?? "Loading..."}
                                </td>
                                <td className="px-4 py-3 text-muted-foreground font-mono">
                                    {stock.name ?? "Loading..."}
                                </td>
                                 <td className="px-4 py-3">
                                    {stock.price ?? "Loading..."}
                                </td>
                                <td className={`px-4 py-3 font-medium font-mono ${
                                    stock.positive ? "text-green-500": "text-red-500"
                                    }`}>
                                    {stock.price ?? "-"}
                                    </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}