"use client";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale, ChartData } from "chart.js";
import { BarChartDropDown } from "./Dropdown";
import { 
  get_companyEbitda, 
  get_companyIncome,
  get_companyExpenses,
  get_companyNetIncome,
  get_companyGrossProfit,

} from "@/app/Services/yahooFinance/ApiSpecificCompany";
// import { get_companyExpenses } from "@/app/Services/yahooFinance/ApiSpecificCompany";
import { useSearch } from "@/app/context/SearchContext";

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

interface BarChartProps {
  data: ChartData<"bar">; // Bruk ChartData for korrekt typing
  name: string;
}




const BarChart = () => {

  const { searchQuery } = useSearch();
  const [graphData, setGraphData] = useState<ChartData<'bar'>>();
  // const [dropdownState, setDropdownState] = useState<string>("income");

  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([])

  const colorMap: Record<string, string> = {
    income: "#10b981", 
    ebitda: "#0284c7", 
    expenses: "#ef4444", 
    gross_profit: "#f59e0b", // Oransje
    net_income: "#115e59",
    "cash-flow": "#8b5cf6",  // Lilla
    "gross-profit-margin": "#ec4899", // Rosa
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = selectedMetrics.map(metric => {
          switch (metric) {
            case "income":
              return get_companyIncome(searchQuery);
            case "expenses":
              return get_companyExpenses(searchQuery);
            case "ebitda":
              return get_companyEbitda(searchQuery);
            case "gross_profit":
              return get_companyGrossProfit(searchQuery);
            case "net_income":
              return get_companyNetIncome(searchQuery);
            default:
              return null;
            }
          });

        const results = await Promise.all(promises);

        const labels = results[0]?.labels || [];

        const datasets = results.map((res, i) => ({
          ...res?.datasets[0],
          label: selectedMetrics[i],
          backgroundColor: colorMap[selectedMetrics[i]] || "#94a3b8",
        }));
        
        
        setGraphData({ labels, datasets });


        // console.log("Fetched data:", data);
      } catch (error) {
        console.log(`Error fetching ${selectedMetrics}: `, error);
      }
    }

    fetchData()
  }, [selectedMetrics, searchQuery])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: number | string) {
            if (typeof value === "number") {
              if (value >= 1_000_000_000) return `${value / 1_000_000_000}B`;
              if (value >= 1_000_000) return `${value / 1_000_000}M`;
              if (value >= 1_000) return `${value / 1_000}K`;
              return value;
            }
            return value;
          },
        },
      },
    },
  };
  

  return (
<div className="p-4 bg-sidebar shadow-lg rounded-lg flex-1 min-w-[280px] max-w-[400px] h-[350px]">
  <div className="flex items-center justify-between mb-2">
    {/* <h2 className="text-xl font-semibold">{selectedMetrics}</h2> */}
    <h2 className="text-xl font-semibold"></h2>
    <BarChartDropDown setState={setSelectedMetrics} />
  </div>
  { graphData && (
  <div className="relative h-[93%]">

    <Bar data={graphData} options={options} />
  </div>

  )}
</div>

  );
};

export default BarChart;
