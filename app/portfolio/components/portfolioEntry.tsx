"use client";
import { useEffect, useState } from "react";
import { stockPortfolioInterface } from "../interfaces/stockPortfolioInterface";
import { get_companyLastPrice } from "@/app/Services/yahooFinance/ApiSpecificCompany";
import { PortfolioEntryOptions } from "./portfolioEntryOptions";
import { Ellipsis } from "lucide-react";



export const PortfolioEntry = ({ portfolioEntry }: { portfolioEntry: stockPortfolioInterface }) => {
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
        console.log(intervalId);

        // Cleanup when unmounting
        return () => clearInterval(intervalId);
    }, [portfolioEntry.ticker]);

    return (
        <div className="w-full h-16 bg-gradient-to-r from-slate-800 to-gray-900 text-white border border-sidebar rounded-md shadow-md px-6 flex items-center">
        <div className="flex space-x-6 w-full text-sm">
          <div className="w-20 font-bold text-m">{portfolioEntry.ticker}</div>
      
          <div className="w-24">
            <div className="text-gray-400">Pris</div>
            {portfolioEntry.price}
          </div>
      
          <div className="w-24">
            <div className="text-gray-400">Volum</div>
            {portfolioEntry.volum}
          </div>
      
          <div className="w-28">
            <div className="text-gray-400">Avkastning</div>
            {latestStockPrice !== null && portfolioEntry.price !== 0 ? (
              <span
                className={
                  latestStockPrice - portfolioEntry.price > 0
                    ? "text-green-500"
                    : latestStockPrice - portfolioEntry.price < 0
                    ? "text-red-500"
                    : "text-white"
                }
              >
                {((latestStockPrice - portfolioEntry.price) / portfolioEntry.price * 100).toFixed(2)} %
              </span>
            ) : (
              <span className="text-white">?</span>
            )}
          </div>
      
          <div className="w-32">
            <div className="text-gray-400">Nåværende pris</div>
            {latestStockPrice !== null ? `${latestStockPrice} USD` : "Henter..."}
          </div>
      
          <div className="w-28">
            <div className="text-gray-400">Verdi</div>
            {latestStockPrice !== null
              ? (latestStockPrice * portfolioEntry.volum).toFixed(2)
              : "?"}
          </div>
        </div>

        <Ellipsis size={20} onClick={() => setShowOptions(true)}></Ellipsis>
      
        {showOptions && (
            <PortfolioEntryOptions setShowOptions={setShowOptions}></PortfolioEntryOptions>
            )}

      
      </div>
    );
};
