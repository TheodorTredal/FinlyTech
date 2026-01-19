"use client";
import { PortfolioView } from "./portfolioFolder";
import { PortfolioInterface } from "../interfaces/stockPortfolioInterface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react";
import { createPortfolio } from "./API/portfolioAPI";



interface AddPortfolioProps {
  setPortfolioList: React.Dispatch<React.SetStateAction<PortfolioInterface[]>>;
}


export const AddPortfolio = ({ setPortfolioList }: AddPortfolioProps) => {

  const [showAddPortfolio, setShowAddPortfolio] = useState<boolean>(false);  
  const [newPortfolioName, setNewPortfolioName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleOpenAddPortfolio = () => {
    setShowAddPortfolio(true);
  }

  const handleAbort = () => {
    setShowAddPortfolio(false);
  }
  
  const handleConfirmAdd = async () => {

    if (newPortfolioName.trim() === "") {
      setError("Porteføljenavn kan ikke være tomt");
      return;
    }

    setError(null);


    try {
      const data = await createPortfolio(newPortfolioName, "USD");
      console.log("Portefølje opprettet:", data);

      // Legg til ny portefølhe i listen
      setPortfolioList(prev => [...prev, data]);

      setNewPortfolioName("");
      setShowAddPortfolio(false);

    } catch (err: any) {
      setError(err.message || "Noe gikk galt ved opprettelse av portefølje");
    }

  }

  return (
  <div>
    {!showAddPortfolio ? (
      <Button 
        onClick={handleOpenAddPortfolio} 
        variant="outline"
        className="text-white text-xl font-semibold px-6 py-3 border-2 border-white rounded-lg hover:bg-white hover:text-black transition-colors duration-200"
      >
        Add portfolio +
      </Button>

    ) : (
      <div className="flex w-1/4 gap-2">
        <Input
          placeholder="Ny portefølje..."
          value={newPortfolioName}
          onChange={(e) => setNewPortfolioName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleConfirmAdd();
          }}
        />
        <Button 
          onClick={handleConfirmAdd} 
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
        >
          Opprett
        </Button>
        
        <Button 
          onClick={handleAbort} 
          variant="ghost" 
          className="text-red-700 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors duration-200"
        >
          Avbryt
        </Button>
      </div>
    )}
  </div>
)

}


interface stockPortfolioInterface {
  portfolios: PortfolioInterface[];
  setPortfolioList: React.Dispatch<React.SetStateAction<PortfolioInterface[]>>


}

export const StockPortfolio = ({ portfolios, setPortfolioList }: stockPortfolioInterface) => {

  return (
    <div className="flex flex-col gap-6">
      {portfolios.map((portfolio, i) => (
        <PortfolioView key={i} portfolio={portfolio}/>
      ))}
      <AddPortfolio setPortfolioList={setPortfolioList}/>
    </div>
  );
};