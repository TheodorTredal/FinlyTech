"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
// import { ChartData } from "chart.js";
import { Menubar, MenubarMenu, MenubarTrigger} from "@/components/ui/menubar";

// Registrer nødvendige komponenter fra Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);


import { fetchStockChart } from "@/app/Services/yahooFinance/ApiSpecificCompany";

interface LineChartProps {
    ticker: string;
}


const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: {
      type: "category",
      display: false, // Skru av datoene på x-aksen
    },
    y1: {
      beginAtZero: true,
      position: "left",
      ticks: {
        display: true,
      },
      grid: {
        display: true,
      },
    },
    
    y2: {
      type: "linear",
      position: "right",
      grid: {
        drawOnChartArea: false, // Ikke tegn rutenett på sekundær y-akse
        display: false,  // Skru av gridlinjene på høyre y-akse
      },
      ticks: {
        display: true,  // Skru av visning av tallene på høyre y-akse (volum)
      },
    },
  },
  elements: {
    bar: {
      borderRadius: 4, // Rundere kanter på barene
      barThickness: 4,  // Redusert tykkelse på barene
    },
  },
};




const StockGraph: React.FC<LineChartProps> = ({ticker}) => {
  
  const [chartData, setChartData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [dateInterval, setDateInterval] = useState<string>("1y");
  const [selectedDateInterval, setSelectedDateInterval] = useState<string>("1y");

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
            </MenubarMenu>
        </Menubar>
    )
}
  
  useEffect(() => {
      fetchStockChart(ticker, dateInterval)
      .then(setChartData)
      .catch((err) => {
          console.error("Failed", err);
          setError(err.message)
      })
  }, [ticker, dateInterval])



  if (error) {
      return <p className="text-red-500">Failed: {error}</p>;
  }

  if (!chartData) {
      return <p>Fetching chart data from {ticker}</p>;
  }


    return (
      <div className="p-6 bg-sidebar shadow-lg rounded-lg w-2/3 h-[300px]">
        <h2 className="flex text-2xl justify-around font-semibold mb-4">
          <div className="flex w-1/4 justify-between">
          {ticker.toUpperCase()} 
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
        {/* <div className="h-[calc(100%-2.5rem)]">  Justerer for overskriften */}
        <div className="h-[calc(100%-2.5rem)]"> {/* Justerer for overskriften */}
          <Line data={chartData} options={options} />
        </div>
      </div>
    );
  };
  
  
export default StockGraph;
