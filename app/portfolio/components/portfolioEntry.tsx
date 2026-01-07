"use client";
import { useEffect, useState } from "react";
import { stockPortfolioInterface } from "../interfaces/stockPortfolioInterface";
import { get_companyLastPrice } from "@/app/Services/yahooFinance/ApiSpecificCompany";
import { PortfolioEntryOptions } from "./portfolioEntryOptions";
import { NotebookPen } from "lucide-react";
import { DeleteStockAlert } from "./deleteStockFromPortfolio";



export const PortfolioEntry = ({ portfolioEntry, setPortfolio, folderName }: { portfolioEntry: stockPortfolioInterface; setPortfolio: (prev: any) => void; folderName: string; }) => {
    const [latestStockPrice, setLatestStockPrice] = useState<number | null>(null);
    const [showOptions, setShowOptions] = useState<boolean>(false);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        const fetchLatestPrice = async () => {
            const response = await get_companyLastPrice(portfolioEntry.ticker);
            if (response?.lastPrice !== undefined) {
                setLatestStockPrice(response.lastPrice);
            }
        };

        // Initial fetch
        fetchLatestPrice();

        // Set interval (e.g. every 30 seconds)
        intervalId = setInterval(fetchLatestPrice, 30_000);

        // Cleanup when unmounting
        return () => clearInterval(intervalId);
    }, [portfolioEntry.ticker]);

    return (
        <div className="w-full h-16 bg-black text-white border border-stone-500 rounded-md shadow-md px-6 flex items-center">
        <div className="flex space-x-6 w-full text-sm">
          <div className="w-20 font-bold text-m">{portfolioEntry.ticker}</div>
      
          <div className="w-24">
            <div className="text-gray-400 font-mono">Pris</div>
            {portfolioEntry.price}
          </div>
      
          <div className="w-24">
            <div className="text-gray-400 font-mono">Volum</div>
            {portfolioEntry.volum}
          </div>
      
          <div className="w-28">
            <div className="text-gray-400 font-mono">Avkastning</div>
            {latestStockPrice !== null && portfolioEntry.price !== 0 ? (
              <span
                className={
                  latestStockPrice - portfolioEntry.price > 0
                    ? "text-green-500 font-mono"
                    : latestStockPrice - portfolioEntry.price < 0
                    ? "text-red-500 font-mono"
                    : "text-white font-mono"
                }
              >
                {((latestStockPrice - portfolioEntry.price) / portfolioEntry.price * 100).toFixed(2)} %
              </span>
            ) : (
              <span className="text-white font-mono">?</span>
            )}
          </div>
      
          <div className="w-32">
            <div className="text-gray-400 font-mono">Nåværende pris</div>
            {latestStockPrice !== null ? `${latestStockPrice} USD` : "Henter..."}
          </div>
      
          <div className="w-28">
            <div className="text-gray-400 font-mono">Verdi</div>
            {latestStockPrice !== null
              ? (latestStockPrice * portfolioEntry.volum).toFixed(2)
              : "?"}
          </div>
        </div>

        <NotebookPen size={20} onClick={() => setShowOptions(true)}></NotebookPen>
      
        {showOptions && (
            <PortfolioEntryOptions setShowOptions={setShowOptions}></PortfolioEntryOptions>
            )}

        <DeleteStockAlert setPortfolio={setPortfolio} folderName={folderName} ticker={portfolioEntry.ticker}></DeleteStockAlert>

      
      </div>
    );
};
