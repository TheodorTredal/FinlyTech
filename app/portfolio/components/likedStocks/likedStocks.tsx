import { useEffect, useState } from "react"
import { get_all_liked_stock_from_user } from "../API/likeAPI"
import { useLatestStockPrice } from "../hooks/useLatestStockData";

const LikedStockRow = ({ stock }: {stock: any}) => {
    const {latestPrice, isLoading } = useLatestStockPrice(stock.symbol);

    return (
        <tr className="border-t hover:bg-muted/40 transition">
            <td className="px-4 py-3 font-medium font-mono">
                {stock.symbol ?? "Loading..."}
            </td>
            <td className="px-4 py-3 text-muted-foreground font-mono">
                {stock.name ?? "Loading..."}
            </td>
             <td className="px-4 py-3">
                {isLoading ? "Henter..." : latestPrice ?? "—"}
            </td>
            <td className={`px-4 py-3 font-medium font-mono ${
                stock.positive ? "text-green-500": "text-red-500"
                }`}>
                {stock.price ?? "-"}
            </td>
        </tr>
    )
}


export const LikedStocksComponent = () => {
    const [likedAssets, setLikedAssets] = useState<any[]>([]);

    useEffect(() => {

        const fetchLikedStocks = async () => {
            const result = await get_all_liked_stock_from_user();
            setLikedAssets(result)
        }

        fetchLikedStocks();
    }, [])

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
                        {likedAssets.map((stock: any) => (
                            <LikedStockRow key={stock.symbol} stock={stock}></LikedStockRow>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}