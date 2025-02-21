"use client";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale, ChartData } from "chart.js";
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
    <div className="p-6 bg-sidebar shadow-lg rounded-lg w-1/3 h-[350px]">
      <h2 className="text-2xl font-semibold text-center mb-4">{name}</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
