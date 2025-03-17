"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
import { Menubar, MenubarMenu, MenubarTrigger} from "@/components/ui/menubar";
import { useSearch } from "@/app/context/SearchContext";
import SkeletonGraph from "./SkeletonGraph";

// Registrer nødvendige komponenter fra Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);


import { fetchStockChart } from "@/app/Services/yahooFinance/ApiSpecificCompany";

interface LineChartProps {
    searchQuery: string;
}

import { ChartOptions } from "chart.js";



const options: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: {
      type: "category",
      display: false,
    },
    
    y: {
      display: true, // Dette skjuler hele Y-aksen, inkludert tall og grid-linjer
      position: "right",
    },
    y1: {
      display: false, // Dette skjuler hele Y-aksen, inkludert tall og grid-linjer
    },
    y2: {
      display: true, // Dette skjuler hele Y-aksen, inkludert tall og grid-linjer
    },
  },
  elements: {
    point: {
      radius: 3,
    },
  },
};




const StockGraph = () => {
  
  const [chartData, setChartData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [dateInterval, setDateInterval] = useState<string>("1y");
  const [selectedDateInterval, setSelectedDateInterval] = useState<string>("1y");


  const { searchQuery } = useSearch();


  const handleDateChange = (date: string) => {
    setDateInterval(date);
    setSelectedDateInterval(date);
  }


  // Denne ser ikkje bra ut. Denne må gjøres penere
  const DateComponent = () => {
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
    )
}
  
useEffect(() => {
  if (!searchQuery) return;

  setError(null);

  fetchStockChart(searchQuery, dateInterval)
    .then(setChartData)
    .catch((err) => {
      console.error("Failed", err);
      setError(err.message);
    })
}, [searchQuery, dateInterval]); // Lukker arrayen riktig



  if (error) {
      return <p className="text-red-500">Failed: {error}</p>;
  }

  if (!chartData) {
      return <SkeletonGraph></SkeletonGraph>;
  }


    return (
      <div className="p-6 bg-sidebar shadow-lg rounded-lg w-2/3 h-[300px]">
        <h2 className="flex text-2xl justify-around font-semibold mb-4">
          <div className="flex w-1/4 justify-between">
          {searchQuery.toUpperCase()} 
        <p
        className={`${
          parseFloat(chartData.growthPercentage.replace('%', '')) < 0
          ? 'text-red-500'
          : 'text-green-500'
        }`}
        >
        {chartData.growthPercentage}
      </p>
          </div>  

        <DateComponent></DateComponent>
        </h2>
        <div className="h-[calc(100%-2.5rem)]"> {/* Justerer for overskriften */}
          <Line data={chartData} options={options}/>
        </div>
      </div>
    );
  };
  
  
export default StockGraph;
