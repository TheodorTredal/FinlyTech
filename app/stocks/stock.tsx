"use client";
import { useState } from "react";
import { StarStock } from "./star";
import { useSearch } from "@/app/context/SearchContext";
import MyChart from "./components/graph/companyGraph";

// Supply Chain
import { SupplyChain } from "./components/supplyChain/SupplyChain";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { CompanyKeyInfo } from "./components/keyInfo/companyKeyInfo";

import { BluePrintTemplateTest } from "./components/blueprint/customTemplate";
import { BluePrintSidebar } from "./components/blueprint/sidebarAddComponent";
import { EditTemplateButton } from "./components/blueprint/editTemplateButton";
import { SidebarAddComponentButton } from "./components/blueprint/addComponentButton";
import { CompanyAboutInformation } from "./components/keyInfo/companyAboutInformation";
import { JWTTestTokenButton } from "../login/tempLogin";


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

  const [edit, setEdit] = useState<boolean>(false);
  const [SidebarIsOpen, setSidebarIsOpen] = useState<boolean>(false);


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

        <div className={`${activeComponent === ActiveComponentEnum.Stock ? "block" : "hidden"} relative flex justify-between space-x-4`} >

          <EditTemplateButton edit={edit} setEdit={setEdit}></EditTemplateButton>
          <SidebarAddComponentButton setIsOpen={setSidebarIsOpen} isOpen={SidebarIsOpen}></SidebarAddComponentButton>
          <BluePrintSidebar setEdit={setEdit} setIsOpen={setSidebarIsOpen} isOpen={SidebarIsOpen}></BluePrintSidebar>
        </div>
      </div>

    <div className={activeComponent === ActiveComponentEnum.Stock ? "block" : "hidden"}>
      <BluePrintTemplateTest edit={edit} />
    </div>
    

    <div className={`${activeComponent === ActiveComponentEnum.Financials  ? "block" : "hidden" }`} >

      <CompanyAboutInformation></CompanyAboutInformation>
    </div>
    

    {activeComponent === ActiveComponentEnum.KPI && (
      <CompanyKeyInfo></CompanyKeyInfo>
    )}

    {activeComponent === ActiveComponentEnum.SupplyChain && (
      <div className="w-full h-full">
        <SupplyChain />
      </div>
    )}

    <div className={activeComponent === ActiveComponentEnum.News ? "block" : "hidden"}>
      <JWTTestTokenButton></JWTTestTokenButton>
    </div>

    {activeComponent === ActiveComponentEnum.Algorithms && (
      <div>Algorithms</div>
    )}

    {activeComponent === ActiveComponentEnum.Competitors && (
      <div>Competitors</div>
    )}

    {activeComponent === ActiveComponentEnum.HistoricalData && (
      <div className="flex space-x-6">
        <div className="w-2/3">
          <MyChart></MyChart>

        </div>
          <CompanyKeyInfo></CompanyKeyInfo>
      </div>
    )}

    {activeComponent === ActiveComponentEnum.Insiders && (
      <div>

      </div>
    )}
    </div>
  );
}
