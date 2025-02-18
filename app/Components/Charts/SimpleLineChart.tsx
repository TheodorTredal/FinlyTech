"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
import { ChartData } from "chart.js";

// Registrer nødvendige komponenter fra Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);


interface LineChartProps {
    data: ChartData<'line'>;
    name: string;
}


const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
};
const LineChart: React.FC<LineChartProps> = ({data, name}) => {
    return (
      <div className="p-6 bg-sidebar shadow-lg rounded-lg w-1/2 h-[300px]">
        <h2 className="text-2xl font-semibold text-center mb-4">{name}</h2>
        <div className="h-[calc(100%-2.5rem)]"> {/* Justerer for overskriften */}
          <Line data={data} options={options} />
        </div>
      </div>
    );
  };
  
  
export default LineChart;
