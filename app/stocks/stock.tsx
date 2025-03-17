"use client";
import { useState } from "react";
import StockGraph from "./components/graph/graph";
import KeyInfo from "./components/keyInfo/keyInfo";
import BarChart from "./components/BarChart";


// Supply Chain
import { SupplyChain } from "./components/supplyChain/SupplyChain";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

// TestData
import BarChartData from "../testdata/BarChartData";
import NettoInntektData from "../testdata/BarchartNetIncomeData";


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
          <StockGraph />
          <KeyInfo />
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
      <div className="w-full h-full">
        <SupplyChain />
      </div>
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
      <div className="underline decoration-white">HistoricalData</div>
    )}





    </div>
  );
}
