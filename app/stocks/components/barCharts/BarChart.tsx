"use client";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale, ChartData } from "chart.js";
import { BarChartDropDown } from "./Dropdown";
import { get_companyIncome } from "@/app/Services/yahooFinance/ApiSpecificCompany";
import { get_companyExpenses } from "@/app/Services/yahooFinance/ApiSpecificCompany";
import { useSearch } from "@/app/context/SearchContext";

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

interface BarChartProps {
  data: ChartData<"bar">; // Bruk ChartData for korrekt typing
  name: string;
}




const BarChart: React.FC<BarChartProps> = () => {

  const { searchQuery } = useSearch();
  const [graphData, setGraphData] = useState<ChartData<'bar'>>();
  const [dropdownState, setDropdownState] = useState<string>("Income");


  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (dropdownState == "income") {
          data = await get_companyIncome(searchQuery);
        }
        if (dropdownState == "expenses") {
          data = await get_companyExpenses(searchQuery);
        }
        setGraphData(data);
        console.log("Fetched data:", data);
      } catch (error) {
        console.log(`Error fetching ${dropdownState}: `, error);
      }
    }

    fetchData()

  }, [dropdownState, searchQuery])


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
      x: { grid: { display: false } },
      y: { beginAtZero: true },
    },
  };

  return (
<div className="p-4 bg-sidebar shadow-lg rounded-lg flex-1 min-w-[280px] max-w-[400px] h-[350px]">
  <div className="flex items-center justify-between mb-2">
    <h2 className="text-xl font-semibold">{dropdownState}</h2>
    <BarChartDropDown setState={setDropdownState} />
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
