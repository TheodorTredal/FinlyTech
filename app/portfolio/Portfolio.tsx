"use client";
import { StockPortfolio } from "./components/stockPortfolio";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { useState } from "react";

import { stockPortfolioInterface } from "./interfaces/stockPortfolioInterface";
import { AddToPortfolio } from "./components/addToPortfolio";
import { Button } from "@/components/ui/button";


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
        <MenubarTrigger onClick={() => setShowAddToPortfolio(true)} className="ml-auto">+</MenubarTrigger>

        </MenubarMenu>
      </Menubar>

        {showAddToPortfolio && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                {/* <div className="bg-sidebar text-black rounded-xl p-8 w-1/3"> */}
                    <AddToPortfolio setcloseWindow={setShowAddToPortfolio} setPortfolioList={setPortfolioList}></AddToPortfolio>

                {/* <Button className="mr-auto mt-4 px-4 bg-gray-800 text-white rounded hover:bg-slate-400" onClick={() => setShowAddToPortfolio(false)}>Lukk</Button> */}

                {/* </div> */}


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