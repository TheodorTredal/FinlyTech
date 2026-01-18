"use client";
import { PortfolioView } from "./portfolioFolder";
import { PortfolioInterface } from "../interfaces/stockPortfolioInterface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { useState } from "react";





export const AddPortfolio = ({ folders, setPortfolio }: {folders: PortfolioInterface[]; setPortfolio: (prev: any) => void;}) => {

  const [showAddPortfolio, setShowAddPortfolio] = useState<boolean>(false);  
  const [newPortfolioName, setNewPortfolioName] = useState<string | null>(null);

  const handleAddPortfolio = () => {
    setShowAddPortfolio(true);
  }

  const handleAbort = () => {
    setShowAddPortfolio(false);
  }
  
  const handleConfirmAdd = () => {
    
    
    const nameExists = folders.some(
      (folder) => folder.title.toLowerCase() === newPortfolioName?.trim().toLowerCase()
    );
    
    if (nameExists) {
      // vis feilmelding
      return;
    }

    if (!newPortfolioName?.trim()) {
      // eventuelt sett en feilmelding
      return;
    }

    setPortfolio((prev: PortfolioInterface[])=> [
      ...prev,
      {name: newPortfolioName?.trim(), stocks: []}
    ])

    setShowAddPortfolio(false);
  }

    return (
      <div>
        {!showAddPortfolio ? (
          <Button onClick={handleAddPortfolio} variant={"outline"} className="space-y-6 text-gray-300 text-2xl w-12">+</Button>
        ) : (
          <div className="flex w-1/4">
            <Input
            placeholder="Ny portefølje..."
            onChange={(e) => setNewPortfolioName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleConfirmAdd();
            }}
            />
            <Button onClick={handleConfirmAdd} className="bg-green-600 hover:bg-green-700 text-white px-6">Opprett</Button>
            <Button onClick={handleAbort} variant={"ghost"} className="text-red-700">Avbryt</Button>
          </div>
          )}
      </div>
    )
}



export const StockPortfolio = ({ portfolios }: { portfolios: PortfolioInterface[] }) => {

  return (
    <div className="flex flex-col gap-6">
      {portfolios.map((portfolio, i) => (
        <PortfolioView key={i} portfolio={portfolio}/>
      ))}
      {/* <AddPortfolio folders={folders} setPortfolio={setPortfolio}></AddPortfolio> */}
    </div>
  );
};