"use client";
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Importer pluginen

// Registrer nødvendige komponenter fra Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels); // Registrer pluginen


interface PieChartData {
    labels: string[]; // Navn på sektorene
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
    }[];
  }

  interface PieChartProps {
    data: PieChartData;
    name: string;
}


// Konfigurasjon for Pie Chart
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
      display: false, // Skru av den vanlige legenden
    },
    datalabels: {
      display: true,
      color: "white", // Fargen på etikettene
      font: {
        // weight: "bold", // Skift til fet skrift
        size: 10, // Juster tekststørrelsen
    },
      formatter: (value: number, context: any) => {
        return `${context.chart.data.labels[context.dataIndex]}: ${value}%`; // Formatere etikettene som "Navn: Prosent"
      },
    },
  },
};

const PieChart: React.FC<PieChartProps> = ({ data, name }) => {
  return (
    <div className="p-8 bg-sidebar shadow-lg rounded-lg w-1/3 h-[300px]">
      <h2 className="text-sm font-semibold text-white">{name}</h2>
      <Pie
        data={data}
        options={options}
        className="w-full, h-full"
      />
    </div>
  );
};

export default PieChart;
