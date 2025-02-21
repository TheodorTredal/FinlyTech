"use client";
import { useState } from "react";
import StockGraph from "./components/graph";
import KeyInfo from "./components/keyInfo";
import BarChart from "./components/BarChart";



import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "@/components/ui/menubar";

// TestData
import BarChartData from "../testdata/BarChartData";
import NettoInntektData from "../testdata/BarchartNetIncomeData";


let ticker = "nvda";




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
}


export default function StocksPage() {

  const [activeComponent, setActiveComponent] = useState<ActiveComponentEnum>(ActiveComponentEnum.Stock)

  const handleMenuClick = (component: ActiveComponentEnum) => {
    setActiveComponent(component);
}

  return (
    <div className="flex flex-col space-y-4 p-4">
      <Menubar className="rounded-xl p-2 flex justify-start">
        <MenubarMenu>
          <MenubarTrigger onClick={() => handleMenuClick(ActiveComponentEnum.Stock)}>Stock</MenubarTrigger>
          <MenubarTrigger onClick={() => handleMenuClick(ActiveComponentEnum.Financials)}>Financials</MenubarTrigger>
          <MenubarTrigger onClick={() => handleMenuClick(ActiveComponentEnum.KPI)}>KPI</MenubarTrigger>
          <MenubarTrigger onClick={() => handleMenuClick(ActiveComponentEnum.SupplyChain)}>Supply Chain</MenubarTrigger>
          <MenubarTrigger onClick={() => handleMenuClick(ActiveComponentEnum.News)}>News</MenubarTrigger>
          <MenubarTrigger onClick={() => handleMenuClick(ActiveComponentEnum.HistoricalData)}>Historical Data</MenubarTrigger>
          <MenubarTrigger onClick={() => handleMenuClick(ActiveComponentEnum.Algorithms)}>Algorithms</MenubarTrigger>
          <MenubarTrigger onClick={() => handleMenuClick(ActiveComponentEnum.Competitors)}>Competitors</MenubarTrigger>
        </MenubarMenu>
      </Menubar>
      

    {activeComponent === ActiveComponentEnum.Stock && (
      
      <div>

        <div className="flex justify-start space-x-2">
          <StockGraph ticker={ticker}>
          </StockGraph>
          <KeyInfo></KeyInfo>
        </div>

        <div className="flex space-x-2 py-2">
        <BarChart data={BarChartData} name="income"></BarChart>
        <BarChart data={NettoInntektData} name="Net income"></BarChart>
        <BarChart data={BarChartData} name="Units Sold"></BarChart>
        </div>
      </div>
    )}

    {activeComponent === ActiveComponentEnum.Financials && (
      <div>Financials</div>
    )}

    {activeComponent === ActiveComponentEnum.KPI && (
      <div>KPI</div>
    )}

    {activeComponent === ActiveComponentEnum.SupplyChain && (
      <div>SupplyChain</div>
    )}

    {activeComponent === ActiveComponentEnum.News && (
      <div>News</div>
    )}

    {activeComponent === ActiveComponentEnum.Algorithms && (
      <div>Algorithms</div>
    )}

    {activeComponent === ActiveComponentEnum.Competitors && (
      <div>Competitors</div>
    )}

    {activeComponent === ActiveComponentEnum.HistoricalData && (
      <div>HistoricalData</div>
    )}



    </div>
  );
}
