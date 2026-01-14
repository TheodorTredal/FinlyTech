import { portfolioFolderInterface, portfolioEntryInterface } from "../interfaces/stockPortfolioInterface";
import { useEffect, useState } from "react";
import { get_companyLastPrice } from "@/app/Services/yahooFinance/ApiSpecificCompany";
import { Button } from "@/components/ui/button";
import { SquarePen, Notebook } from "lucide-react";
import { toast } from "sonner";



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



interface AddToPortfolioModalProps {
  folder: portfolioFolderInterface;
  setPortfolio: (prev: any) => void;
  onClose: () => void;
}

export const AddToPortfolioModal = ({ folder, setPortfolio, onClose }: AddToPortfolioModalProps) => {

  const [ticker, setTicker] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0);


const handleAdd = () => {
  if (!ticker || price <= 0 || volume <= 0) {
    toast.error("Vennligst fyll inn alle feltene korrekt");
    return;
  }

  const exists = folder.stocks.some(s => s.ticker === ticker);
  if (exists) {
    // Bytt ut alert med toast
    toast.error(`${ticker} finnes allerede i porteføljen`);
    return;
  }

  const newStock: portfolioEntryInterface = {
    ticker,
    price,
    volum: volume
  };

  setPortfolio((prev: portfolioFolderInterface[]) =>
    prev.map(f => f.name === folder.name
      ? { ...f, stocks: [...f.stocks, newStock] }
      : f
    )
  );

  toast.success(`${ticker} ble lagt til i ${folder.name}`);
  onClose();
}


return (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="w-2/3 h-96 bg-sidebar border rounded-xl p-6 flex flex-col">
      
      {/* Header */}
      <h2 className="text-xl font-mono font-semibold mb-4">
        Legg til aksje i {folder.name}
      </h2>

      {/* Main content: input + textarea */}
      <div className="flex flex-1 gap-6">
        {/* Venstre side: inputfeltene */}
        <div className="flex flex-col flex-1 space-y-3">
          <p className="font-mono">Ticker</p>
          <input 
            type="text" 
            placeholder="Ticker" 
            value={ticker} 
            onChange={(e) => setTicker(e.target.value.toUpperCase())} 
            className="border px-3 py-2 rounded w-full"
          />

          <p className="font-mono">Pris</p>
          <input 
            type="number" 
            placeholder="Pris" 
            value={price} 
            onChange={(e) => setPrice(Number(e.target.value))} 
            className="border px-3 py-2 rounded w-full"
          />
          <p className="font-mono">Antall</p>
          <input 
            type="number" 
            placeholder="Volum" 
            value={volume} 
            onChange={(e) => setVolume(Number(e.target.value))} 
            className="border px-3 py-2 rounded w-full"
          />
        </div>

        {/* Høyre side: tekstfelt */}
        <div className="flex-1">
          <textarea
            placeholder="Notater..."
            className="w-full h-full border px-3 py-2 rounded resize-none"
          />
        </div>
      </div>

      {/* Footer: knapper nederst */}
      <div className="flex justify-end space-x-3 mt-4">
        <Button 
          variant="ghost" 
          onClick={onClose}
          className="hover:underline"
          >Avbryt</Button>
        <Button 
          className="bg-brand-button-primary hover:bg-brand-button-primary text-white-200" 
          onClick={handleAdd}
          >Legg til</Button>
      </div>

    </div>
  </div>
)

}



export const NewPortfolioFolder = 
  ({ folder, setPortfolio }: 
  { folder: portfolioFolderInterface; setPortfolio: (prev: any) => void; 
  }) => {

  const [showAddModal, setShowAddModal] = useState<boolean>(false);



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

      {showAddModal && (
        <AddToPortfolioModal
          folder={folder}
          setPortfolio={setPortfolio}
          onClose={() => setShowAddModal(false)}
        >

        </AddToPortfolioModal>
      )}

    </div>
  )
}