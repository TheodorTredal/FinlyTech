import { portfolioFolderInterface, portfolioEntryInterface } from "../interfaces/stockPortfolioInterface";
import { useEffect, useState } from "react";
import { get_companyLastPrice } from "@/app/Services/yahooFinance/ApiSpecificCompany";
import { Button } from "@/components/ui/button";
import { SquarePen, Notebook } from "lucide-react";



export const useLatestStockData = (
  ticker: string,
  avgPrice: number,
  volume: number
) => {

  const [latestPrice, setLatestPrice] = useState<number | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const fetchLatestPrice = async () => {
      const response = await get_companyLastPrice(ticker); // Dette API Kallet må fjernes DEPRECATED
      if (response?.lastPrice !== undefined) {
        setLatestPrice(response.lastPrice);
      }
    }

    fetchLatestPrice();
    intervalId = setInterval(fetchLatestPrice, 30_000); // 30 sek

    return () => clearInterval(intervalId);
  }, [ticker])


  // Kalkuerer hvor mye prosent enkelt aksjen har økt.
  const returnPercent =
  latestPrice !== null && avgPrice > 0 
  ? ((latestPrice - avgPrice) / avgPrice) * 100
  : null;


  const totalValue =
    latestPrice !== null ? latestPrice * volume : null;

    return {
      latestPrice,
      returnPercent,
      totalValue
    }
}


export const PortfolioTableRow = ({stock}: {stock: portfolioEntryInterface}) => {

  const { latestPrice, returnPercent, totalValue } =
    useLatestStockData(stock.ticker, stock.price, stock.volum);


  return (
    <tr className="border-t hover:bg-muted/40 transition">
      <td className="px-4 py-3 font-mono font-medium">
        {stock.ticker}
      </td>

      <td className="px-4 py-3 font-mono">
        {stock.price}
      </td>

      <td className="px-4 py-3 font-mono">
        {stock.volum}
      </td>

      <td
        className={`px-4 py-3 font-mono ${
          returnPercent === null
            ? ""
            : returnPercent > 0
            ? "text-green-500"
            : "text-red-500"
        }`}
      >
        {returnPercent !== null ? `${returnPercent.toFixed(2)} %` : "—"}
      </td>

      <td className="px-4 py-3 font-mono">
        {latestPrice !== null ? `${latestPrice} USD` : "Henter..."}
      </td>

      <td className="px-4 py-3 font-mono">
        {totalValue !== null ? totalValue.toFixed(2) : "—"}
      </td>

      <td className="px-4 py-3">
        <Button
          variant="ghost"
          >
            <Notebook/>
        </Button>
      </td>
      
      <td className="px-4 py-3">
        <Button
          variant="ghost"
        >
          <SquarePen />
        </Button>
      </td>
    </tr>
  );
}





export const NewPortfolioFolder = 
  ({ folder, setPortfolio }: 
  { folder: portfolioFolderInterface; setPortfolio: (prev: any) => void; 
  }) => {

  const [shoAddModal, setShowAddModal] = useState<boolean>(false);



  return (
    <div className="w-full h-full p-6">
      {/** Header */}
     <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">{folder.name}</h1>
        <Button 
        onClick={() => setShowAddModal(true)}
        variant="ghost"
        >Legg til aksje +</Button>
      </div>

      <div className="rounded-xl border overflow-y-auto">
        <table className="w-full table-fixed border-collapse text-sm">
          <thead className="bg-muted/40">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Ticker</th>
              <th className="px-4 py-3 text-left font-medium">AVG Pris</th>
              <th className="px-4 py-3 text-left font-medium">Volum</th>
              <th className="px-4 py-3 text-left font-medium">Avkastning</th>
              <th className="px-4 py-3 text-left font-medium">Nåværende pris</th>
              <th className="px-4 py-3 text-left font-medium">Total verdi</th>
              <th className="px-4 py-3 text-left font-medium">Notat</th>
              <th className="px-4 py-3 text-left font-medium">Edit</th>
            </tr>
          </thead>

          <tbody>
            {folder.stocks.map((stock) => (
              <PortfolioTableRow
               key={stock.ticker}
               stock={stock}
              />
            ))}

          </tbody>
        </table>
      </div>
    </div>
  )
}