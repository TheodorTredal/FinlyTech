"use client";
import { StockPortfolio } from "./components/stockPortfolio";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { useEffect, useState } from "react";

import { PortfolioInterface } from "./interfaces/stockPortfolioInterface";

import { LikedStocksComponent } from "./components/likedStocks/likedStocks";
import { JWTTestTokenButton } from "../login/tempLogin";
import { getUserPortfolio } from "./components/API/portfolioAPI";
import { AddPortfolio } from "./components/stockPortfolio";
import { MainPortfolioDevelopmentAndDevelopment } from "./components/portfolioCompositionAndDevelopment/mainPortfolioCompAndDev";

/**
 * IMORGEN
 * 
 * 1. POST og DELETE på Porteføljer (Legg til flere portefølher)
 * 
 * 2. POST og Delete på Assets inne i porteføljer
 * 
 * 3. Få til notat på hver enkelt aksje
 */

enum ActiveComponentEnum {
    portefølje = "portefølje",
    utvikling = "utvikling",
    likteAksjer = "likteAksjer", // skal kanksje ikke være en del av porteføljen
    // targets = "targets",
    // health = "health",
  }



const Portfolio = () => {

    const [activeComponent, setActiveComponent] = useState<ActiveComponentEnum>(ActiveComponentEnum.portefølje);
    const [portfolioList, setPortfolioList] = useState<PortfolioInterface[]>([]);


    useEffect(() => {

        const fetchPortfolios = async () => {
          const response = await getUserPortfolio();
          setPortfolioList(response);
        }
        fetchPortfolios();
    }, [])

    const handleMenuClick = (component: ActiveComponentEnum) => {
        setActiveComponent(component);
    }

  return (
    <div className="w-screen h-[calc(100vh-50px)] flex flex-col">
      
      <Menubar className="w-1/2 rounded-xl p-2 space-x-4 mb-4 mt-4 border-2">
        <MenubarMenu>
          {Object.values(ActiveComponentEnum).map(component => (
            <MenubarTrigger
              key={component}
              onClick={() => handleMenuClick(component)}
              className={`px-4 py-2 transition-all duration-200 ${
                activeComponent === component
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {component.charAt(0).toUpperCase() + component.slice(1)}
            </MenubarTrigger>
          ))}
        </MenubarMenu>
      </Menubar>

    {/* SCROLL-CONTAINER */}
      <div className="flex-1 overflow-y-auto px-4">
        {activeComponent === ActiveComponentEnum.portefølje && (
          <>
            <AddPortfolio
              setPortfolioList={setPortfolioList}
              portfolioList={portfolioList}
            />

            <StockPortfolio
              portfolios={portfolioList}
              setPortfolioList={setPortfolioList}
            />
          </>
        )}

        {activeComponent === ActiveComponentEnum.utvikling && (
          <>
            <MainPortfolioDevelopmentAndDevelopment></MainPortfolioDevelopmentAndDevelopment>
          </>
        )}

        {activeComponent === ActiveComponentEnum.likteAksjer && (
          <>
            <JWTTestTokenButton />
            <LikedStocksComponent />
          </>
        )}
      </div>
    </div>
  );
}

export default Portfolio;