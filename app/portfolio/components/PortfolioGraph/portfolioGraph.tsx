"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import SkeletonGraph from "@/app/stocks/components/graph/SkeletonGraph";
import { DateComponent } from "@/app/Components/StockGraphDates";
import { portfolioFolderInterface } from "../../interfaces/stockPortfolioInterface";
import { fetchStockChart } from "@/app/Services/yahooFinance/ApiSpecificCompany";
import { get_companyLastPrice } from "@/app/Services/yahooFinance/ApiSpecificCompany";







const fetchAllHistoricalData = async (portfolio: portfolioFolderInterface, dateInterval: string) => {

    const result: { [ticker: string]: number[] } = {};
    const labels: string[] = [];

    for (const stock of portfolio.stocks) {
        try {
            const data = await fetchStockChart(stock.ticker, dateInterval);

            if (labels.length === 0) {
                data.labels.forEach((label: string) => labels.push(label));
            }

            result[stock.ticker] = data.datasets[0].data
        } catch (error) {
            console.error(`feil ved henting av ${stock.ticker}`);
        }
    }
    return {result, labels}
}

const calculateHistoricalWeightedAverage = ( historicalData: { [ticker: string]: number[] }, portfolio: portfolioFolderInterface) => {
  
  
  const months = historicalData[Object.keys(historicalData)[0]].length;
  const weightedAverages: number[] = [];

  for (let i = 0; i < months; i++) {
    let totalValue = 0;
    let totalVolume = 0;

    portfolio.stocks.forEach(stock => {
      const prices = historicalData[stock.ticker];
      if (prices && prices[i] != null) {
        totalValue += prices[i] * stock.volum;
        totalVolume += stock.volum;
      }
    });

    const avg = totalVolume > 0 ? totalValue / totalVolume : 0;
    weightedAverages.push(avg);
  }

  return weightedAverages;
};






ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler, annotationPlugin);

const PortfolioGraph = ({ portfolio }: {portfolio: portfolioFolderInterface}) => {
  const [chartData, setChartData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [dateInterval, setDateInterval] = useState<string>("1y");

  const [markedValue, setMarkedValue] = useState<number | null>(null);

  const [hoverX, setHoverX] = useState<number | null>(null);
  const [hoverY, setHoverY] = useState<number | null>(null);

  useEffect(() => {

    const calculatePortfolioValue = async (portfolio: portfolioFolderInterface) => {

      let volumTimesPrice = 0
    
      for (const stock of portfolio.stocks) { 
        const response = await get_companyLastPrice(stock.ticker);
        if (response?.lastPrice !== undefined && response.lastPrice !== -1) {
          volumTimesPrice += response.lastPrice * stock.volum;
        }
      }
      console.log("total portefølje verdi: ", volumTimesPrice);
      setMarkedValue(volumTimesPrice);
    }
    calculatePortfolioValue(portfolio);
  }, [portfolio])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { result, labels } = await fetchAllHistoricalData(portfolio, dateInterval);
        const weightedAverages = calculateHistoricalWeightedAverage(result, portfolio);
  
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        
        let gradient: CanvasGradient | string = "#0369a1";

        
        if (ctx) {
          gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "rgba(3, 105, 161, 0.6)");  // mørk blå top
          gradient.addColorStop(1, "rgba(3, 105, 161, 0)");    // transparent bunn
        }
        
        setChartData({
          labels,
          datasets: [
            {
              label: "Vektet porteføljeverdi",
              data: weightedAverages,
              borderColor: "rgb(3, 105, 161)",
              backgroundColor: gradient,
              fill: true,
              tension: 0.4,
              pointRadius: 0,
            },
          ],
        });
        
      } catch (error) {
        console.error("Feil ved generering av grafdata:", error);
        setError("Kunne ikke laste inn data.");
      }
    };
  
    fetchData();
  }, [portfolio, dateInterval]);



  const handleGraphHover = (event: any, elements: any) => {
    console.log("elements.length", elements.length);
    if (elements.length > 0) {
      const dataIndex = elements[0].index;
      const hoveredPrice = chartData.datasets[0].data[dataIndex];
  
      setHoverX(dataIndex);
      setHoverY(hoveredPrice);
    } 
  };
  

  if (!chartData) {
    return <SkeletonGraph />;
  }
  
  
const options = {
  responsive: true,
  maintainAspectRatio: false,
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
    <div className="p-6 bg-sidebar shadow-lg rounded-lg w-full h-1/2">
      <h2 className="flex justify-around font-semibold mb-4">
        <div className="flex w-1/4 justify-between mr-auto text-xl">
        <h2 className="ml-auto">Marked value:  {(markedValue * 100) / 100} </h2>
          {/* <p className={`mr-auto pl-4 ${
            parseFloat(chartData.growthPercentage.replace('%', '')) < 0
            ? 'text-red-500'
            : 'text-green-500'
          }`}>
            {chartData.growthPercentage}
          </p> */}
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

          </div>
    </div>
  );
};

export default PortfolioGraph;
