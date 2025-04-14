"use client";
import { StockPortfolio } from "./components/stockPortfolio";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { useState } from "react";

import { stockPortfolioInterface } from "./interfaces/stockPortfolioInterface";
import { AddToPortfolio } from "./components/addToPortfolio";



enum ActiveComponentEnum {
    portefølje = "portefølje",
    utvikling = "utvikling",
    likteAksjer = "likteAksjer",
  }


const Portfolio = () => {

    const [activeComponent, setActiveComponent] = useState<ActiveComponentEnum>(ActiveComponentEnum.portefølje);
    const [portfolioList, setPortfolioList] = useState<stockPortfolioInterface[]>([]);
    const [showAddToPortfolio, setShowAddToPortfolio] = useState<boolean>(false);


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
                    <AddToPortfolio setcloseWindow={setShowAddToPortfolio} setPortfolioList={setPortfolioList}></AddToPortfolio>
            </div>
        )}

        {activeComponent === ActiveComponentEnum.portefølje && (
            <StockPortfolio portfolioEntries={portfolioList}></StockPortfolio>
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