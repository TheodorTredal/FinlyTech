"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
import { useSearch } from "@/app/context/SearchContext";
import SkeletonGraph from "./SkeletonGraph";
import { DateComponent } from "@/app/Components/StockGraphDates";
import annotationPlugin from 'chartjs-plugin-annotation';


// Registrer nødvendige komponenter fra Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, annotationPlugin);


import { fetchStockChart } from "@/app/Services/yahooFinance/ApiSpecificCompany";
import { ChartOptions } from "chart.js";







const StockGraph = () => {
  
  const [chartData, setChartData] = useState<any>(null);
  const [dateInterval, setDateInterval] = useState<string>("1y");
  const { searchQuery } = useSearch();
  const RETRY_DELAY_MS = 3000;

  const [hoverX, setHoverX] = useState<number | null>(null);
  const [hoverY, setHoverY] = useState<number | null>(null);



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
  const lastPrice = chartData.datasets?.[0]?.data?.slice(-1)[0]; // Hent siste close-pris


  const handleGraphHover = (event: any, _: any, chart: any) => {
    const elements = chart.getElementsAtEventForMode(
      event.native, // Viktig! Bruk native event
      "index",      // Snap til samme index for alle datasett
      { intersect: false },
      true
    );
  
    if (elements.length > 0) {
      const dataIndex = elements[0].index;
      const hoveredPrice = chartData.datasets[0].data[dataIndex];
  
      setHoverX(dataIndex);
      setHoverY(hoveredPrice);
    } else {
      setHoverX(null);
      setHoverY(null);
    }
  };
  

  const annotationPluginOptions =
  hoverX !== null && hoverY !== null
    ? {
        annotations: {
          hoverLineX: {
            type: "line",
            xMin: hoverX,
            xMax: hoverX,
            borderColor: "#6b7280",
            borderWidth: 2,
            borderDash: [5, 5],
          },
          hoverLineY: {
            type: "line",
            yMin: hoverY,
            yMax: hoverY,
            borderColor: "#6b7280",
            borderWidth: 2,
            borderDash: [5, 5],
          },
        },
      }
    : undefined;

    const options: ChartOptions<"line"> = {
      responsive: true,
      maintainAspectRatio: false,
      onHover: handleGraphHover,
      plugins: {
        legend: { display: true },
        annotation: annotationPluginOptions as any, // bruk "as any" hvis du ikke har types definert
      },
      scales: {
        x: {
          type: "category",
          display: false,
        },
        y: {
          display: true,
          position: "right",
        },
        y1: {
          display: false,
        },
        y2: {
          display: true,
          position: "left",
          beginAtZero: true,
          suggestedMax: 1000,
          grid: {
            drawOnChartArea: false,
          },
          ticks: {
            callback: (value) => `${Number(value) / 1000}K`,
          },
        },
      },
      elements: {
        point: {
          radius: 3,
        },
      },
    };
    

    return (
      <div className="p-6 bg-sidebar shadow-lg rounded-lg w-2/3 h-[300px]">
        <h2 className="flex text-2xl justify-around font-semibold mb-4">
          <div className="flex flex-col w-1/4 justify-between">
          <div
              className={`flex space-x-6 ${
                parseFloat(chartData.growthPercentage.replace('%', '')) < 0
                  ? 'text-red-500'
                  : 'text-green-500'
              }`}
            >
              <span>{lastPrice?.toFixed(2)}</span>
              <span>{chartData.growthPercentage}</span>
            </div>
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
