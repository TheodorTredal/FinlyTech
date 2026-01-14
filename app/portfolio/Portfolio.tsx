"use client";
import { StockPortfolio } from "./components/stockPortfolio";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { useEffect, useState } from "react";
import { AddToPortfolio } from "./components/addToPortfolio";
import { portfolioFolderInterface } from "./interfaces/stockPortfolioInterface";
import { PortfolioDevelopment } from "./components/portfolioDevelopment";
import { LikedStocksComponent } from "./components/likedStocks/likedStocks";
import { JWTTestTokenButton } from "../login/tempLogin";

enum ActiveComponentEnum {
    portefølje = "portefølje",
    utvikling = "utvikling",
    likteAksjer = "likteAksjer", // skal kanksje ikke være en del av porteføljen
    // targets = "targets",
    // health = "health",
  }


  const portfolioData2: portfolioFolderInterface = {
    name: "Dividend",
    stocks: [
      { ticker: "O", price: 60, volum: 10 },
      { ticker: "T", price: 15, volum: 20 },
      { ticker: "gme", price: 1000, volum: 100 },
    ],
  }


  export const portfolioData: portfolioFolderInterface[] = [
    {
      name: "Dividend",
      stocks: [
        { ticker: "O", price: 60, volum: 10 },
        { ticker: "T", price: 15, volum: 20 },
        { ticker: "TSLA", price: 200, volum: 5 },
        { ticker: "AAPL", price: 150, volum: 8 },
        { ticker: "NVDA", price: 150, volum: 8 },
        { ticker: "INTC", price: 150, volum: 8 },
        { ticker: "AMD", price: 150, volum: 8 },
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
    const [currentPortfolio, setCurrentPortfolio] = useState<string>("Dividend");


    useEffect(() => {
      setPortfolioList(portfolioData);
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
                folders={portfolioList} 
                setPortfolio={setPortfolioList} />
        )}

        {activeComponent === ActiveComponentEnum.utvikling && (
          <PortfolioDevelopment 
              currentPortfolio={currentPortfolio} 
              portfolioList={portfolioList} 
              setCurrentPortfolio={setCurrentPortfolio} />            
        )}


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