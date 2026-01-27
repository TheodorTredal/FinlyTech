import { CreateHoldingPayload, HoldingInterface, PortfolioInterface } from "../interfaces/stockPortfolioInterface";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SquarePen, Notebook } from "lucide-react";
import { toast } from "sonner";
import { Settings, Minus } from "lucide-react";
import { deletePortfolio } from "./API/portfolioAPI";
import { 
  addNewHolding, 
  deleteHoldingFromPortfolio, 
  get_latest_asset_price,
  } from "./API/portfolioAPI";

import { Input } from "@/components/ui/input";


/**
 * Det neste nå blir å få til portefølje i databasen brukeren skal kunne:
 * 1. X Lage porteføljer med navn
 * 2. X Legge til aksjer
 * 3. X Slette aksjer
 * 4. Skal kunne redigere portefølje informasjon
 * 5. Skal kunne skrive notater på aksjer
 * 6. X Slette porteføljer
 * 
 * 7. Legge til "Dummy test data" for aksje priser i database
 *   - NåværendePris (siste kjente pris)
 *   - Lage modell
 *   - Lage en serializer?
 *   - Lage backend og frontend api for å hente sist kjente pris på en aksje.
 * 
 *   - Da vil vi så å si automatisk få
 *      - Avkastning, nåværende pris og total verdi. og det er nice ;)
 * 
 * 
 */



interface AddToPortfolioModalProps {
  portfolio: PortfolioInterface;
  onClose: () => void;
  onHoldingAdded: (holding: HoldingInterface) => void;
}


/**
 * 1. Gjøre checks og error handling
 * 2. Oppdatere database via API
 * 3. Oppdatere UI (setState)
 */
export const AddToPortfolioModal = ({ portfolio, onClose, onHoldingAdded }: AddToPortfolioModalProps) => {

  const [ticker, setTicker] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [volume, setVolume] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const numericPrice = Number(price);
  const numericVolume = Number(volume);

  // Checks og error handling
  const handleAdd = async () => {
    if (!ticker || numericPrice <= 0 || numericVolume <= 0) {
      toast.error("Vennligst fyll inn alle feltene korrekt");
      return;
    }

  // Sjekk om asset'en allerede er lagt til i porteføljen
  const exists = portfolio.holdings.some(s => s.asset.symbol === ticker);
  if (exists) {
    // Bytt ut alert med toast
    toast.error(`${ticker} finnes allerede i porteføljen`);
    return;
  }

  // Lag en ny stock entry i porteføljen
  const newStock: CreateHoldingPayload = {
    symbol: ticker,
    avg_price: numericPrice,
    quantity: numericVolume,
  };


  try {

    setIsLoading(true);
    
    const response = await addNewHolding(
      ticker, 
      portfolio.title, 
      numericPrice, 
      numericVolume, 
      "USD"
    );
    
    onHoldingAdded(response); // NY
    toast.success(`${ticker} ble lagt til i ${portfolio.title}`);
    onClose();

  } catch (err: any) {
    toast.error(err.message || "Noe gikk galt");
  } finally {
    setIsLoading(false);
  }  
}


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-2/3 h-96 bg-sidebar border rounded-xl p-6 flex flex-col">

        {/* Header */}
        <h2 className="text-xl font-mono font-semibold mb-4">
          Legg til aksje i {portfolio.title}
        </h2>

        {/* Main content: input + textarea */}
        <div className="flex flex-1 gap-6">
          {/* Venstre side: inputfeltene */}
          <div className="flex flex-col flex-1 space-y-3">
            <p className="font-mono">Ticker</p>
            <Input 
              type="text" 
              placeholder="Enter a ticker" 
              value={ticker} 
              onChange={(e) => setTicker(e.target.value.toUpperCase())} 
              className="border px-3 py-2 rounded w-full"
            />

            <p className="font-mono">Pris</p>
            <Input 
              type="number" 
              placeholder="Pris" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
              className="border px-3 py-2 rounded w-full"
            />
            <p className="font-mono">Antall</p>
            <Input 
              type="number" 
              placeholder="Volum" 
              value={volume} 
              onChange={(e) => setVolume(e.target.value)} 
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
            disabled={isLoading} // skru av knappen når man legger til aksjen i portefljen
            className="bg-brand-button-primary hover:bg-brand-button-primary text-white-200" 
            onClick={handleAdd}
            >{isLoading ? "Legger til..." : "Legg til"}
          </Button>
        </div>

      </div>
    </div>
  )
}

/**
 * Må finne ut hvorfor jeg ikke kan se prisene fra APIET, mest sannsynlig så matcher ikke det jeg prøver å hente ut, med feltene som kommer fra API'et
 */


export const useLatestStockData = (
  symbol: string,
  avgPrice: number,
  quantity: number
) => {

  const [latestPrice, setLatestPrice] = useState<number | null>(null);

  // DETTE LEGGES TIL NÅR VI HAR KJØPT API TILGANG 
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const fetchLatestPrice = async () => {
      const response = await get_latest_asset_price(symbol);
      console.log(response);
      if (response) {
        setLatestPrice(response.price);
      }
    }

    fetchLatestPrice();
    intervalId = setInterval(fetchLatestPrice, 30_000); // 30 sek

    return () => clearInterval(intervalId);
  }, [])


  useEffect(() => {
    console.log("LATEST PRICE: ", latestPrice);

  }, [latestPrice])


  // Kalkuerer hvor mye prosent enkelt aksjen har økt.
  const returnPercent =
  latestPrice !== null && avgPrice > 0 
  ? ((latestPrice - avgPrice) / avgPrice) * 100
  : null;


  const totalValue =
    latestPrice !== null ? latestPrice * quantity : null;

    return {
      latestPrice,
      returnPercent,
      totalValue
    }
}


export const PortfolioTableRow = ({ 
  holding, 
  portfolio_title, 
  showSettings,
  onHoldingDeleted,
}: { 
  holding: HoldingInterface, 
  portfolio_title: string,  
  showSettings: boolean
  onHoldingDeleted: (holding: HoldingInterface) => void;
}) => {

  const { latestPrice, returnPercent, totalValue } =
    useLatestStockData(holding.asset.symbol, Number(holding.avg_price), Number(holding.quantity));


  const handleDeleteHolding = async () => {
      
    const confirmed = window.confirm(
    `Er du sikker på at du vil ${holding.asset.symbol} fra ${portfolio_title}?`
    );

    if (!confirmed) return;

    try {
      const response = await deleteHoldingFromPortfolio(holding.asset.symbol, portfolio_title);

      onHoldingDeleted(holding);
      toast.success(`${holding.asset.symbol} ble fjernet fra ${portfolio_title}`);

      } catch (error: any) {
        toast.error(error.message || `Kunne ikke fjerne ${holding.asset.symbol}`);
      }
    }

  return (
    <tr className="border-t hover:bg-muted/40 transition">
      <td className="px-4 py-3 font-mono font-medium">
        {holding.asset.symbol}
      </td>

      <td className="px-4 py-3 font-mono">
        {holding.avg_price}
      </td>

      <td className="px-4 py-3 font-mono">
        {holding.quantity}
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
      
      {/* If settings is clicked */}
      <td className="text-right">
        <div
          className={`
            transition-all duration-200 ease-out
            ${showSettings ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"}
          `}
        >
          <Button
            variant="ghost"
            className="text-red-600"
            onClick={handleDeleteHolding}
          >
            <Minus size={16} />
          </Button>
        </div>
      </td>
    </tr>
  );
}

interface portfolioViewInterface {
  portfolio: PortfolioInterface;
  setPortfolioList: React.Dispatch<React.SetStateAction<PortfolioInterface[]>>;
}


export const PortfolioView = ({ portfolio, setPortfolioList }: portfolioViewInterface) => {

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);


  const handleDeletePortfolio = async () => {
    const confirmed = window.confirm(
      `Er du sikker på at du vil slette porteføljen "${portfolio.title}"?`
    );

    if (!confirmed) return;

    try {
      await deletePortfolio(portfolio.title);
      toast.success(`Porteføljen "${portfolio.title}" ble slettet`);

      // Fjern porteføljen fra selve interface til brukeren.
      setPortfolioList(prev => 
        prev.filter(p => p.title !== portfolio.title)
      );


    } catch (error: any) {
      toast.error(error.message || "Kunne ikke slette porteføljen");
    }
  };




  const handleHoldingAdded = (newHolding: HoldingInterface) => {
    setPortfolioList(prev =>
      prev.map(p => 
        p.title === portfolio.title
        ? {...p, holdings: [...p.holdings, newHolding] }
        : p
      )
    )
  }

  const handleHoldingDeleted = (holdingToRemove: HoldingInterface) => {
    setPortfolioList(prev =>
      prev.map(p =>
        p.title === portfolio.title
          ? {
              ...p,
              holdings: p.holdings.filter(
                h => h.asset.symbol !== holdingToRemove.asset.symbol
              ),
            }
          : p
      )
    );
  };



  return (
    <div className="w-full p-6">
      {/** Header */}
     <div className="flex justify-between items-center mb-6">
        <h1 className="flex items-center gap-2 text-2xl font-semibold">
          <span>
            {portfolio.title}
          </span>
          {showSettings && (
              <Button 
                className="text-red-600" 
                variant="ghost"
                onClick={handleDeletePortfolio}>
                <Minus />
              </Button>
            )}
        </h1>
        
        <Button 
        onClick={() => setShowAddModal(true)}
        variant="ghost"
        >Legg til aksje +</Button>
      </div>

      <div className="rounded-xl border">
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
              <th className="py-2 text-right font-medium">
              <Button variant="ghost" onClick={() => setShowSettings(!showSettings)}>
                <Settings size={16} />
              </Button>
            </th>
            </tr>
          </thead>

          <tbody>
            {portfolio.holdings.map((holding) => (
              <PortfolioTableRow
               key={holding.asset.symbol}
               holding={holding}
               portfolio_title={portfolio.title}
               showSettings={showSettings}
               onHoldingDeleted={handleHoldingDeleted}
              />
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <AddToPortfolioModal
          portfolio={portfolio}
          onClose={() => setShowAddModal(false)}
          onHoldingAdded={handleHoldingAdded}
        />
      )}
    </div>
  )
}