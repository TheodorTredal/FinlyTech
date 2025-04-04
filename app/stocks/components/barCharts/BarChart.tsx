"use client";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale, ChartData } from "chart.js";
import { BarChartDropDown } from "./Dropdown";


ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

interface BarChartProps {
  data: ChartData<"bar">; // Bruk ChartData for korrekt typing
  name: string;
}




const BarChart: React.FC<BarChartProps> = ({ data, name}) => {

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
    <h2 className="text-xl font-semibold">{name}</h2>
    <BarChartDropDown />
  </div>
  <div className="relative h-[93%]">
    <Bar data={data} options={options} />
  </div>
</div>

  );
};

export default BarChart;
