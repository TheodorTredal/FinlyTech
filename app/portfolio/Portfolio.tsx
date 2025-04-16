"use client";
import { StockPortfolio } from "./components/stockPortfolio";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { useEffect, useState } from "react";
import { AddToPortfolio } from "./components/addToPortfolio";
import { Button } from "@/components/ui/button";

import { portfolioFolderInterface } from "./interfaces/stockPortfolioInterface";



enum ActiveComponentEnum {
    portefølje = "portefølje",
    utvikling = "utvikling",
    likteAksjer = "likteAksjer",
  }




  export const portfolioData: portfolioFolderInterface[] = [
    {
      name: "Dividend",
      stocks: [
        { ticker: "O", price: 60, volum: 10 },
        { ticker: "T", price: 15, volum: 20 },
      ],
    },
    {
      name: "Growth",
      stocks: [
        { ticker: "TSLA", price: 200, volum: 5 },
        { ticker: "AAPL", price: 150, volum: 8 },
      ],
    },
    {
      name: "Nordic",
      stocks: [
        { ticker: "EQNR.OL", price: 300, volum: 15 },
      ],
    },
  ];
  

const Portfolio = () => {

    const [activeComponent, setActiveComponent] = useState<ActiveComponentEnum>(ActiveComponentEnum.portefølje);
    const [portfolioList, setPortfolioList] = useState<portfolioFolderInterface[]>([]);
    const [showAddToPortfolio, setShowAddToPortfolio] = useState<boolean>(false);


    useEffect(() => {
      setPortfolioList(portfolioData);
    }, [])

    const handleMenuClick = (component: ActiveComponentEnum) => {
        setActiveComponent(component);
    }

    return (
    <div>
      <Menubar className="rounded-xl p-2 flex justify-start space-x-4 mb-4 mt-4">
        <MenubarMenu>
          {Object.values(ActiveComponentEnum).map((component) => (
            <MenubarTrigger
              key={component}
              onClick={() => handleMenuClick(component)}
              className={`relative px-4 py-2 transition-all duration-200 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] ${
              activeComponent === component
              ? "after:bg-white text-white"
              : "after:bg-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
          {component.charAt(0).toUpperCase() + component.slice(1)}
        </MenubarTrigger>
        ))}
        <MenubarTrigger onClick={() => setShowAddToPortfolio(true)} className="ml-auto"> + </MenubarTrigger>

        </MenubarMenu>
      </Menubar>

        {showAddToPortfolio && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <AddToPortfolio setcloseWindow={setShowAddToPortfolio} setPortfolioList={setPortfolioList} portfolioList={portfolioList}></AddToPortfolio>
            </div>
        )}

        {activeComponent === ActiveComponentEnum.portefølje && (
            <StockPortfolio folders={portfolioList} setPortfolio={setPortfolioList}></StockPortfolio>
        )}

        {activeComponent === ActiveComponentEnum.utvikling && (
            <div>Utvikling</div>
            
        )}

        {activeComponent === ActiveComponentEnum.likteAksjer && (
            <div>Likte aksjer</div>
        )}
        
        </div>

    )
}

export default Portfolio;