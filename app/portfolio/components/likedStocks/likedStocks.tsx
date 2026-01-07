import { useEffect, useState } from "react"
import { get_all_liked_stock_from_user } from "../API/likeService"


const likedStocksUI = [
  {
    ticker: "AAPL",
    name: "Apple Inc.",
    price: "$189.12",
    change: "+1.42%",
    positive: true,
  },
  {
    ticker: "TSLA",
    name: "Tesla Inc.",
    price: "$248.33",
    change: "-2.13%",
    positive: false,
  },
  {
    ticker: "NVDA",
    name: "NVIDIA",
    price: "$492.55",
    change: "+3.87%",
    positive: true,
  },
  {
    ticker: "EQNR.OL",
    name: "Equinor ASA",
    price: "312.40 kr",
    change: "+0.84%",
    positive: true,
  },
];




export const LikedStocksComponent = () => {
    const [likedStocks, setLikedStocks] = useState<any[]>([]);


    useEffect(() => {

        const fetchLikedStocks = async () => {
            const result = await get_all_liked_stock_from_user();
            setLikedStocks(result)
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
                <table className="w-full border-collapse text-sm">
                    <thead className="bg-muted/40">
                        <th className="px-4 py-3 text-left font-medium">Ticker</th>
                        <th className="px-4 py-3 text-left font-medium">Navn</th>
                        <th className="px-4 py-3 text-left font-medium">Pris</th>
                        <th className="px-4 py-3 text-left font-medium">Endring</th>
                    </thead>
                </table>
            </div>

            <tbody>
                {likedStocks.map((stock: any) => (
                    <tr
                    key={stock.ticker}
                    className="border-t hover:bg-muted/40 transition"
                    >
                        <td className="px-4 py-3 font-medium font-mono">
                            {stock.ticker}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground font-mono">
                            {stock.name}
                        </td>
                        {/* <td className="px-4 py-3 text-right">
                            {stock.ticker}
                        </td>
                        <td className={`px-4 py-3 font-medium font-mono ${
                            stock.positive ? "text-green-500": "text-red-500"
                        }`}>
                            {stock.price}
                        </td> */}
                    </tr>
                ))}
            </tbody>
        </div>
    )
}