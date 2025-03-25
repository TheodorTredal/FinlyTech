import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import React, { useState } from "react";



export const DateComponent = ({ setDateInterval }: {setDateInterval: React.Dispatch<React.SetStateAction<string>> }) => {
    
  const [selectedDateInterval, setSelectedDateInterval] = useState<string>("1y");


  const handleDateChange = (date: string) => {
    setDateInterval(date);
    setSelectedDateInterval(date);
  };

    
    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger onClick={() => handleDateChange("1d")}
            className={selectedDateInterval === "1d" ? "border-[0.5px] border-white" : ""}>
            1d
          </MenubarTrigger>
          <MenubarTrigger onClick={() => handleDateChange("5d")}
            className={selectedDateInterval === "5d" ? "border-[0.5px] border-white" : ""}>
            5d
          </MenubarTrigger>
          <MenubarTrigger onClick={() => handleDateChange("1mo")}
            className={selectedDateInterval === "1mo" ? "border-[0.5px] border-white" : ""}>
            1 mo
          </MenubarTrigger>
          <MenubarTrigger onClick={() => handleDateChange("6mo")}
            className={selectedDateInterval === "6mo" ? "border-[0.5px] border-white" : ""}>
            6 mo
          </MenubarTrigger>
          <MenubarTrigger onClick={() => handleDateChange("ytd")}
            className={selectedDateInterval === "ytd" ? "border-[0.5px] border-white" : ""}>
            YTD
          </MenubarTrigger>
          <MenubarTrigger onClick={() => handleDateChange("1y")}
            className={selectedDateInterval === "1y" ? "border-[0.5px] border-white" : ""}>
            1 yr
          </MenubarTrigger>
          <MenubarTrigger onClick={() => handleDateChange("3y")}
            className={selectedDateInterval === "3y" ? "border-[0.5px] border-white" : ""}>
            3 yr
          </MenubarTrigger>
          <MenubarTrigger onClick={() => handleDateChange("5y")}
            className={selectedDateInterval === "5y" ? "border-[0.5px] border-white" : ""}>
            5 yr
          </MenubarTrigger>
          <MenubarTrigger onClick={() => handleDateChange("max")}
            className={selectedDateInterval === "max" ? "border-[0.5px] border-white" : ""}>
            max
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    );
  };