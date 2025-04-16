"use client";
import { useState } from "react";
import StockGraph from "./components/graph/graph";
import KeyInfo from "./components/keyInfo/keyInfo";
import BarChart from "./components/barCharts/BarChart";
import { StarStock } from "./star";
import { Insiders } from "./components/Insiders/Insiders";
import { StockNews } from "./components/News/News";
import { useSearch } from "@/app/context/SearchContext";

// Supply Chain
import { SupplyChain } from "./components/supplyChain/SupplyChain";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";




// Definer en enum for aktive komponenter
enum ActiveComponentEnum {
  Stock = "stock",
  News = "news",
  Financials = "financials",
  KPI = "kpi",
  SupplyChain = "supplyChain",
  HistoricalData = "historicalData",
  Algorithms = "algorithms",
  Competitors = "competitors",
  Insiders = "Insiders",
}


export default function StocksPage() {

  const [activeComponent, setActiveComponent] = useState<ActiveComponentEnum>(ActiveComponentEnum.Stock);
  const { searchQuery } = useSearch();

  const handleMenuClick = (component: ActiveComponentEnum) => {
    setActiveComponent(component);
}

  return (
    <div className="flex flex-col space-y-4 p-4">
      <div className="flex space-x-5">
 
      <p className="text-2xl w-40">
      {searchQuery}
      </p>

      <Menubar className="rounded-xl p-2 flex justify-start space-x-4">
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
        </MenubarMenu>
      </Menubar>
  
        <StarStock></StarStock>

  </div>

  <div className={activeComponent === ActiveComponentEnum.Stock ? "block" : "hidden"}>
        <div className="flex justify-start space-x-2 w-full">
          <StockGraph />
          <KeyInfo />
        </div>

        <div className="flex space-x-2 py-2 w-full">
        <BarChart></BarChart>
        <BarChart></BarChart>
        <BarChart></BarChart>
        </div>
      </div>
    

    {activeComponent === ActiveComponentEnum.Financials && (
      <div>Financials</div>
    )}

    {activeComponent === ActiveComponentEnum.KPI && (
      <div>KPI</div>
    )}

    {activeComponent === ActiveComponentEnum.SupplyChain && (
      <div className="w-full h-full">
        <SupplyChain />
      </div>
    )}

    <div className={activeComponent === ActiveComponentEnum.News ? "block" : "hidden"}>
      <div>
        <StockNews />
      </div>
    </div>

    {activeComponent === ActiveComponentEnum.Algorithms && (
      <div>Algorithms</div>
    )}

    {activeComponent === ActiveComponentEnum.Competitors && (
      <div>Competitors</div>
    )}

    {activeComponent === ActiveComponentEnum.HistoricalData && (
      <div></div>
    )}

    {activeComponent === ActiveComponentEnum.Insiders && (
      <div>
        <Insiders></Insiders>
      </div>
    )}
    </div>
  );
}
