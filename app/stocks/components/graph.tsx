"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
import { ChartData } from "chart.js";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "@/components/ui/menubar";

// Registrer nødvendige komponenter fra Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);


interface LineChartProps {
    data: ChartData<'line'>;
    name: string;
}


const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
};


// Denne ser ikkje bra ut. Denne må gjøres penere
const DateComponent = () => {
    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger>
                1 day
                </MenubarTrigger>
                <MenubarTrigger>
                1 week
                </MenubarTrigger>
                <MenubarTrigger>
                1 month
                </MenubarTrigger>
                <MenubarTrigger>
                6 months
                </MenubarTrigger>
                <MenubarTrigger>
                1 year
                </MenubarTrigger>
                <MenubarTrigger>
                YTD
                </MenubarTrigger>
            </MenubarMenu>
        </Menubar>
    )
}


const StockGraph: React.FC<LineChartProps> = ({data, name}) => {
    return (
      <div className="p-6 bg-sidebar shadow-lg rounded-lg w-1/2 h-[300px]">
        <h2 className="flex text-2xl justify-around font-semibold mb-4">{name} 
            <DateComponent></DateComponent>

        </h2>
        {/* <div className="h-[calc(100%-2.5rem)]">  Justerer for overskriften */}
        <div className="h-[calc(100%-2.5rem)]"> {/* Justerer for overskriften */}
          <Line data={data} options={options} />
        </div>
      </div>
    );
  };
  
  
export default StockGraph;
