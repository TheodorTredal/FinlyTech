"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
import { useSearch } from "@/app/context/SearchContext";
import SkeletonGraph from "./SkeletonGraph";
import { DateComponent } from "@/app/Components/StockGraphDates";

// Registrer nødvendige komponenter fra Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);


import { fetchStockChart } from "@/app/Services/yahooFinance/ApiSpecificCompany";
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
  const [dateInterval, setDateInterval] = useState<string>("1y");
  const { searchQuery } = useSearch();
  


  const RETRY_DELAY_MS = 3000;
  useEffect(() => {
    if (!searchQuery) return;
  
    let retryTimeout: ReturnType<typeof setTimeout> | null = null;
    let isCancelled = false;
  
    const fetchData = () => {
  
      fetchStockChart(searchQuery, dateInterval)
        .then((data) => {
          if (!isCancelled) {
            setChartData(data);
          }
        })
        .catch((err) => {
          console.error("Failed", err);
          if (!isCancelled) {
            // Prøv på nytt etter X millisekunder
            retryTimeout = setTimeout(fetchData, RETRY_DELAY_MS);
          }
        });
    };
  
    fetchData();
  
    // Cleanup når komponenten unmountes eller dependencies endres
    return () => {
      isCancelled = true;
      if (retryTimeout) clearTimeout(retryTimeout);
    };
  }, [searchQuery, dateInterval]);


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

        <DateComponent setDateInterval={setDateInterval}></DateComponent>
        </h2>
        <div className="h-[calc(100%-2.5rem)]"> {/* Justerer for overskriften */}
          <Line data={chartData} options={options}/>
        </div>
      </div>
    );
  };
  
  
export default StockGraph;
