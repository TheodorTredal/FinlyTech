"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import { useSearch } from "@/app/context/SearchContext";
import SkeletonGraph from "../graph/SkeletonGraph";
import { fetchStockChartNews } from "@/app/Services/yahooFinance/ApiSpecificCompany";
import { DateComponent } from "@/app/Components/StockGraphDates";
import { DisplayNewsFromDate } from "./displayNewsOnDate";
import { parseArticleDate, adjustToNearestFriday, filterNewsBasedOnDate  } from "./HelperFunctions";


interface NewsArticle {
  date: string;
  Summary: string;
}

/**
 * Sender ned alle artiklene, når grafen blir klikket på så sjekker vi om datoene er fra den datoen man klikket på
 * Deretter sender vi det ned i dlikkedNewsFromDate
 */

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler, annotationPlugin);

const NewsStockGraph = ({ articleDate, articles }: { articleDate: string, articles: any[] }) => {
  const [chartData, setChartData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { searchQuery } = useSearch();
  const [dateInterval, setDateInterval] = useState<string>("1y");
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [clickedPrice, setClickedPrice] = useState<number | null>(null);

  const [newsFromDate, setNewsFromDate] = useState<NewsArticle[] | null>(null);

  const [hoverX, setHoverX] = useState<number | null>(null);
  const [hoverY, setHoverY] = useState<number | null>(null);


  // Hente ut aksje data fra API'et
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


  // Når man trykker på nyhetene så endrer grafen seg tilsvarende
  useEffect(() => {
    if (!chartData || !chartData.labels) return;

    const formattedDate = parseArticleDate(articleDate) || "";
    const adjustedDate = adjustToNearestFriday(formattedDate);

    const verticalLineIndex = chartData.labels.findIndex((date: string) => {
        const parsedDate = new Date(date).toISOString().split("T")[0];
        
        return parsedDate === adjustedDate;
      });

    const verticalLinePrice = verticalLineIndex !== -1 ? chartData.datasets[0].data[verticalLineIndex] : null;
    setClickedIndex(verticalLineIndex);
    setClickedPrice(verticalLinePrice);

    }, [articleDate])


    const handleGraphClick = (event: any, elements: any) => {
      if (elements.length > 0) {
        const dataIndex = elements[0].index;
        setClickedIndex(dataIndex);
        setClickedPrice(chartData.datasets[0].data[dataIndex]); // Henter Y-verdi
      
        const clickedLabel = chartData.labels[dataIndex];
        setNewsFromDate(filterNewsBasedOnDate(articles, clickedLabel));
      }
    };
    
    

  const handleGraphHover = (event: any, elements: any) => {
    console.log("elements.length", elements.length);
    if (elements.length > 0) {
      const dataIndex = elements[0].index;
      const hoveredPrice = chartData.datasets[0].data[dataIndex];
  
      setHoverX(dataIndex);
      setHoverY(hoveredPrice);
    } 
  };
  
  

  // Error handling
  if (error) {
    return <p className="text-red-500">Failed: {error}</p>;
  }

  if (!chartData) {
    return <SkeletonGraph />;
  }
  

const options = {
  responsive: true,
  maintainAspectRatio: false,
  onClick: handleGraphClick,
  onHover: handleGraphHover,
  animation: {
    duration: 0,
  },
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
    annotation: {
      animations: {
        numbers: { duration: 0 },
        colors: { duration: 0 },
      },
      annotations: {
        ...(hoverX !== null &&
          hoverY !== null && {
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
          }),
        ...(clickedIndex !== null && {
          clickedLine: {
            type: "line",
            xMin: clickedIndex,
            xMax: clickedIndex,
            borderColor: "#b91c1c",
            borderWidth: 2,
            borderDash: [5, 5],
            animation: { duration: 0 },
          },
          clickedPriceLine: {
            type: "line",
            yMin: clickedPrice,
            yMax: clickedPrice,
            borderColor: "#3730a3",
            borderWidth: 2,
            borderDash: [5, 5],
            animation: { duration: 0 },
          },
        }),
      },
    },
  },
  interaction: {
    mode: "index",
    intersect: false,
    axis: "xy",
  },
  scales: {
    x: { type: "category", display: true },
    y: { display: true },
  },
};

  
  

  return (
    <div className="p-6 bg-sidebar shadow-lg rounded-lg w-2/3 h-[20rem] ml-auto">
      <h2 className="flex justify-around font-semibold mb-4">
        <div className="flex w-1/4 justify-between mr-auto text-xl">
          {searchQuery.toUpperCase()} 
          <p className={`mr-auto pl-4 ${
            parseFloat(chartData.growthPercentage.replace('%', '')) < 0
            ? 'text-red-500'
            : 'text-green-500'
          }`}>
            {chartData.growthPercentage}
          </p>
        </div>
            <DateComponent setDateInterval={setDateInterval} />
      </h2>
      
      <div
        className="h-[calc(100%-2.5rem)]"
        onMouseLeave={() => {
          setHoverX(null);
          setHoverY(null);
        }}
      >
        <Line data={chartData} options={options} />
      </div>


      
          <div className="mt-6 h-[calc(100%+50px)]">
      <DisplayNewsFromDate news={newsFromDate}></DisplayNewsFromDate>

          </div>
    </div>
  );
};

export default NewsStockGraph;
