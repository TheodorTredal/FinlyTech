"use client";
import { stockPortfolioInterface } from "../interfaces/stockPortfolioInterface";
import { PortfolioEntry } from "./portfolioEntry";


interface StockPortfolioProps {
    portfolioEntries: stockPortfolioInterface[];
}

export const StockPortfolio = ({ portfolioEntries }: StockPortfolioProps) => {
    return (
      <div className="space-y-2">
        {portfolioEntries.map((entry, index) => (
          <PortfolioEntry key={index} portfolioEntry={entry} />
        ))}
      </div>
    );
  };


