"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation"; // Nytt plugin for linjer
import { useSearch } from "@/app/context/SearchContext";
import SkeletonGraph from "../graph/SkeletonGraph";
import { fetchStockChartNews } from "@/app/Services/yahooFinance/ApiSpecificCompany";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler, annotationPlugin); // Registrer plugin

const NewsStockGraph = ({ articleDate }: { articleDate: string }) => {
  const [chartData, setChartData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [dateInterval, setDateInterval] = useState<string>("1mo");
  const { searchQuery } = useSearch();
  const [selectedDateInterval, setSelectedDateInterval] = useState<string>("1y");

  const handleDateChange = (date: string) => {
    setDateInterval(date);
    setSelectedDateInterval(date);
  };

  console.log("Raw articleDate:", articleDate);

  useEffect(() => {
    if (!searchQuery) return;

    setError(null);

    fetchStockChartNews(searchQuery, dateInterval)
      .then(setChartData)
      .catch((err) => {
        console.error("Failed", err);
        setError(err.message);
      });
  }, [searchQuery, dateInterval]);

  if (error) {
    return <p className="text-red-500">Failed: {error}</p>;
  }

  if (!chartData) {
    return <SkeletonGraph />;
  }

  // ✅ **Konvertering av dato**
  const parseArticleDate = (dateStr: string) => {
    const match = dateStr.match(/(\d{4})(\d{2})(\d{2})T/); // Trekker ut YYYYMMDD
    return match ? `${match[1]}-${match[2]}-${match[3]}` : null;
  };

  const formattedDate = parseArticleDate(articleDate) || "";
  console.log("Formatted articleDate:", formattedDate);

  // ✅ **Finn indeks for `articleDate` i dataene**
  const verticalLineIndex = chartData.labels.findIndex((date: string) => {
    const parsedDate = new Date(date).toISOString().split("T")[0]; // Konverter til YYYY-MM-DD
    return parsedDate === formattedDate;
  });

  // Finn prisen på aksjen på denne datoen
  const verticalLinePrice = verticalLineIndex !== -1 ? chartData.datasets[0].data[verticalLineIndex] : null;

  // ✅ **Legg til vertikal og horisontal linje i `options`**
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false},
      annotation: {
        annotations: verticalLineIndex !== -1 ? {
          // Vertikal linje
          line1: {
            type: "line",
            xMin: verticalLineIndex,
            xMax: verticalLineIndex,
            borderColor: "red",
            borderWidth: 2,
            borderDash: [5, 5],
            label: {
              content: "News",
              enabled: true,
              position: "top",
            },
          },
          // Horisontal linje (den prisen ved den vertikale linjen)
          line2: {
            type: "line",
            yMin: verticalLinePrice,
            yMax: verticalLinePrice,
            borderColor: "#3730a3",
            borderWidth: 2,
            borderDash: [5, 5],
            label: {
              content: `Price: ${verticalLinePrice}`,
              enabled: true,
              position: "right",
            },
          },
        } : {},
      },
    },
    interaction: {
        mode: "nearest",
        intersect: false,
        axis: "xy",
      },
    scales: {
      x: {
        type: "category",
        display: true,
      },
      y: {
        display: true,
      },
    },
  };

  // Custom plugin for crosshair lines
  const crosshairPlugin = {
    id: "crosshair",
    afterDatasetsDraw(chart: any) {
      if (!chart.tooltip || !chart.tooltip._active || chart.tooltip._active.length === 0) return;
  
      const ctx = chart.ctx;
      const { chartArea } = chart;
      const tooltip = chart.tooltip;
      const activePoint = tooltip._active[0].element;
  
      if (!activePoint) return;
  
      ctx.save();
      ctx.beginPath();
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
  
      // Draw vertical line
      ctx.moveTo(activePoint.x, chartArea.top);
      ctx.lineTo(activePoint.x, chartArea.bottom);
      ctx.stroke();
  
      // Draw horizontal line
      ctx.moveTo(chartArea.left, activePoint.y);
      ctx.lineTo(chartArea.right, activePoint.y);
      ctx.stroke();
  
      ctx.restore();
    },
  };
  
  // Registrer tilpasset plugin
  ChartJS.register(crosshairPlugin);



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
    );
  };



  return (
    <div className="p-6 bg-sidebar shadow-lg rounded-lg w-2/3 h-[20rem]">
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

export default NewsStockGraph;
