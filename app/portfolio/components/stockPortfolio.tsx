"use client";
import { PortfolioFolder } from "./portfolioFolder";
import { portfolioFolderInterface } from "../interfaces/stockPortfolioInterface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { useState } from "react";

export const AddPortfolio = ({ folders, setPortfolio }: {folders: portfolioFolderInterface[]; setPortfolio: (prev: any) => any;}) => {

  const [showAddPortfolio, setShowAddPortfolio] = useState<boolean>(false);  
  const [newPortfolioName, setNewPortfolioName] = useState<string | null>(null);

  const handleAddPortfolio = () => {
    setShowAddPortfolio(true);
  }

  
  
  const handleConfirmAdd = () => {
    
    
    const nameExists = folders.some(
      (folder) => folder.name.toLowerCase() === newPortfolioName?.trim().toLowerCase()
    );
    
    if (nameExists) {
      // vis feilmelding
      return;
    }

    if (!newPortfolioName?.trim()) {
      // eventuelt sett en feilmelding
      return;
    }

    setPortfolio(prev => [
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
            />
            <Button onClick={handleConfirmAdd} className="bg-green-600 hover:bg-green-700 text-white px-6">Opprett</Button>
          </div>
          )}
      </div>
    )
}

export const StockPortfolio = ({ folders, setPortfolio }: { folders: portfolioFolderInterface[]; setPortfolio: (prev: any) => void;}) => {


  return (
    <div className="flex flex-col gap-6">
      {folders.map((folder, i) => (
        <PortfolioFolder key={i} folder={folder} />
      ))}
      <AddPortfolio folders={folders} setPortfolio={setPortfolio}></AddPortfolio>
    </div>
  );
};