"use client";
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Importer pluginen

// Registrer nødvendige komponenter fra Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels); // Registrer pluginen

// Testdata for Pie Chart
const data = {
  labels: ["Apple", "Microsoft", "Google", "Amazon", "Tesla"], // Sektorenavnene
  datasets: [
    {
      label: "Market Share",
      data: [30, 25, 20, 15, 10], // Dataene for markedandeler
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
      ], // Farger for pie chartet
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
      ], // Randfarger for pie chartet
      borderWidth: 1,
    },
  ],
};

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

const PieChart = () => {
  return (
    <div className="p-6 bg-sidebar shadow-lg rounded-lg w-1/3 h-[300px]">
      <h2 className="text-ml font-semibold text-center mb-4">Market Share of Big Tech Companies</h2>
      <Pie
        data={data}
        options={options}
        width={400} // Juster størrelse etter behov
        height={400} // Juster størrelse etter behov
      />
    </div>
  );
};

export default PieChart;
