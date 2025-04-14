"use client";
import { stockPortfolioInterface } from "../interfaces/stockPortfolioInterface";
import { PortfolioEntry } from "./portfolioEntry";
import { PortfolioFolder } from "./portfolioFolder";


interface StockPortfolioProps {
    portfolioEntries: stockPortfolioInterface[];
}

export const StockPortfolio = ({ portfolioEntries }: StockPortfolioProps) => {
  return (
    <div className="flex flex-row w-full h-full">
      {/* Sidebar */}
      <div className="w-1/6 border-r border-gray-400">
        {/* sidebar content if any */}
        <PortfolioFolder></PortfolioFolder>
        <PortfolioFolder></PortfolioFolder>
        <PortfolioFolder></PortfolioFolder>
        <PortfolioFolder></PortfolioFolder>
        <PortfolioFolder></PortfolioFolder>
      </div>

      {/* Main content */}
      <div className="flex flex-col space-y-2 flex-1 p-4 overflow-y-auto">
        {portfolioEntries.map((entry, index) => (
          <PortfolioEntry key={index} portfolioEntry={entry} />
        ))}
      </div>
    </div>
  );
};



