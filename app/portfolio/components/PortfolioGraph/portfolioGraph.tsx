import { useEffect, useState } from 'react';
import { GraphSettings } from "@/app/stocks/components/graph/graphSettings";
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
import SelectTimeInterval from '@/app/stocks/components/graph/selectTimeInterval';
import { TimeInterval } from "@/app/stocks/components/graph/graphInterfaces";
import { calculateTrendLine, calculateTrendLinePercentage, sliceGraphData, calculateGrowthPercentage } from '@/app/stocks/components/graph/graphHelperFunctions';
import { CustomToolTip } from '@/app/stocks/components/graph/tooltip';

import { useCalculatePortfolioChart, portfolioChartPointInterface } from '../hooks/useLatestStockData'; // BRUK DENNE FOR Å HENTE INFO OM ENKELT AKSJER I PORTEFØLJEN



const PortfolioGraph = () => {

  const [data, setData] = useState<portfolioChartPointInterface[]>([]); // Send denne ned til graph settings
  const [currentTimeInterval, setCurrentTimeInterval] = useState<TimeInterval>("1y");
  const [growthPercentage, setGrowthPercentage] = useState<string>("");
  const [trendLinePercentage, setTrendlinePercentage] = useState<number | null>(null);
  const [latestPrice, setLatestPrice] = useState<number | null>(null);

  const newChart = useCalculatePortfolioChart({portfolio_title: "test", time_period: currentTimeInterval});




  useEffect(() => {
    // console.log("NEW CHART: ", newChart);
    
    if (newChart.length === 0) {
      return
    }
    
    setData(newChart); 

    const firstIndex = newChart[newChart.length - 1];
    setLatestPrice(firstIndex.totalValue);


    // kalkuler hvor mye porteføljen har vokst innen tidsintervallet
    const lastIndex = newChart[0];
    const growth_percentage = ((firstIndex.totalValue - lastIndex.totalValue) / lastIndex.totalValue ) * 100;
    setGrowthPercentage(String(growth_percentage.toFixed(2)) + "%");

  }, [newChart])



  const getMainLineColor = () => {
    if (growthPercentage === null) return "#047857"
    const numericValue = Number(growthPercentage.replace("%", "").trim())

    if (numericValue >= 0) {
        return "#047857"
    }
    if (numericValue < 0) {
        return "#ef4444"
    }
  }

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
        {/* <div className="ml-4 pt-4 pr-4">
          <GraphSettings 
            activeIndicators={activeIndicators}
            setActiveIndicators={setActiveIndicators} 
            setIndicatorColors={setIndicatorColors} 
            indicatorColors={indicatorColors}/>
        </div> */}
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid stroke="#505050" strokeDasharray="0 0" strokeWidth={1} />
          <XAxis dataKey="date" />
          <YAxis
            domain={["auto", "auto"]}
            tickFormatter={(value) => value.toFixed(2)}
          />
          <Tooltip content={<CustomToolTip />} />
          <Legend />

          {/* Hovedstock linje */}
          <Line
            type="monotone"
            dataKey="totalValue"
            stroke={getMainLineColor()}
            dot={false}
            strokeWidth={2}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};


export default PortfolioGraph;