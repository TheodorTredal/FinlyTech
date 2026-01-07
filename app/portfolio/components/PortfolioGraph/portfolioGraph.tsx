"use client";
import React, { useEffect, useState } from "react";
import annotationPlugin from "chartjs-plugin-annotation";
import SkeletonGraph from "@/app/stocks/components/graph/SkeletonGraph";
import { DateComponent } from "@/app/Components/StockGraphDates";
import { portfolioFolderInterface } from "../../interfaces/stockPortfolioInterface";
import { fetchStockChart } from "@/app/Services/yahooFinance/ApiSpecificCompany";
import { get_companyLastPrice } from "@/app/Services/yahooFinance/ApiSpecificCompany";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import SelectTimeInterval from "@/app/stocks/components/graph/selectTimeInterval";
import { TimeInterval } from "@/app/stocks/components/graph/graphInterfaces";
import { CustomToolTip } from "@/app/stocks/components/graph/tooltip";



const PortfolioGraph = ({ portfolio }: {portfolio: portfolioFolderInterface}) => {
  const [chartData, setChartData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [dateInterval, setDateInterval] = useState<string>("1y");

  const [currentTimeInterval, setCurrentTimeInterval] = useState<TimeInterval>("1y");
  const [growthPercentage, setGrowthPercentage] = useState<string>("");
  const [trendLinePercentage, setTrendlinePercentage] = useState<number | null>(null);
  const [latestPrice, setLatestPrice] = useState<number | null>(null);

  const [data, setData] = useState<any>([]); // Send denne ned til graph settings


  return (
    <div className="bg-black" style={{ width: 700, height: 480 }}>
      <div className='flex'>
        <SelectTimeInterval 
          currentTimeInterval={currentTimeInterval} 
          setCurrentTimeInterval={setCurrentTimeInterval} 
          growthPercentage={growthPercentage}
          trendLinePercentage={trendLinePercentage}
          price={latestPrice}
        />
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} >
          <CartesianGrid stroke="#505050" strokeDasharray="0 0" strokeWidth={1} />
          <XAxis dataKey="date" />
          <YAxis
            domain={["auto", "auto"]}
            tickFormatter={(value) => value.toFixed(2)}
          />
              <Tooltip content={<CustomToolTip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="close"
            stroke={"#ffffff"}
            dot={false}
            strokeWidth={2}
            isAnimationActive={false}
          />

        </LineChart>
      </ResponsiveContainer>
      </div>
    )

}


export default PortfolioGraph;