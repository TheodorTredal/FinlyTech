"use client";
import { StockPortfolio } from "./components/stockPortfolio";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { useEffect, useState } from "react";
import { AddToPortfolio } from "./components/addToPortfolio";
import { PortfolioInterface } from "./interfaces/stockPortfolioInterface";
import { PortfolioDevelopment } from "./components/portfolioDevelopment";
import { LikedStocksComponent } from "./components/likedStocks/likedStocks";
import { JWTTestTokenButton } from "../login/tempLogin";
import { getUserPortfolio } from "./components/API/portfolioAPI";


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
    const [showAddToPortfolio, setShowAddToPortfolio] = useState<boolean>(false);
    const [currentPortfolio, setCurrentPortfolio] = useState<string>("Dividend");


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
      <div className="w-screen h-screen flex flex-col overflow-y-auto">


      <Menubar className="w-1/2 rounded-xl p-2 space-x-4 mb-4 mt-4 border-2">
        <MenubarMenu>
          {Object.values(ActiveComponentEnum).map((component) => (
            <MenubarTrigger
              key={component}
              onClick={() => handleMenuClick(component)}
              // className={`relative px-4 py-2 transition-all duration-200 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] ${
              className={`px-4 py-2 transition-all duration-200 ${
              activeComponent === component
              ? "after:bg-white text-white"
              : "after:bg-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
          {component.charAt(0).toUpperCase() + component.slice(1)}
          </MenubarTrigger>
          ))}
          <MenubarTrigger onClick={() => setShowAddToPortfolio(true)} className="border-2"> Add stock + </MenubarTrigger>
        </MenubarMenu>
      </Menubar>

        {showAddToPortfolio && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <AddToPortfolio 
                        setcloseWindow={setShowAddToPortfolio} 
                        setPortfolioList={setPortfolioList} 
                        portfolioList={portfolioList} />
            </div>
        )}

        {activeComponent === ActiveComponentEnum.portefølje && (
            <StockPortfolio 
                portfolios={portfolioList} 
            />
        )}

        {/* {activeComponent === ActiveComponentEnum.utvikling && (
          <PortfolioDevelopment 
              currentPortfolio={currentPortfolio} 
              portfolioList={portfolioList} 
              setCurrentPortfolio={setCurrentPortfolio} />            
        )} */}


        {activeComponent === ActiveComponentEnum.likteAksjer && (

          <div className="w-full"> 

            <JWTTestTokenButton></JWTTestTokenButton>
            <LikedStocksComponent>

            </LikedStocksComponent>
          </div>
        )}
      </div>

    )
}

export default Portfolio;