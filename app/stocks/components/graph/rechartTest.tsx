import { useEffect, useState } from 'react';
import { useSearch } from "@/app/context/SearchContext";
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
import { fetchStockChart2 } from '@/app/Services/yahooFinance/ApiSpecificCompany';
import SelectTimeInterval from './selectTimeInterval';
import { TimeInterval } from "./graphInterfaces";
import { 
    StockDataItem,
    ChartDataPoint,
 } from './graphInterfaces';
import { calculateTrendLine, calculateTrendLinePercentage } from './trendline';
import { CustomToolTip } from './tooltip';
  


const MyChart = () => {
  const { searchQuery } = useSearch();
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const [selectedPoints, setSelectedPoints] = useState<ChartDataPoint[]>([]);
  const [currentTimeInterval, setCurrentTimeInterval] = useState<TimeInterval>("1y");
  const [growthPercentage, setGrowthPercentage] = useState<string>("")
  const [trendLinePercentage, setTrendlinePercentage] = useState<number | null>(null);
  

  const handleChartClick = (event: any) => {
    if (event && event.activePayload && event.activePayload[0]) {
      const clickedData = event.activePayload[0].payload;
      
      setSelectedPoints(prev => {
        const newPoints = [...prev, clickedData];
        if (newPoints.length > 2) {
          return newPoints.slice(-2);
        }
        return newPoints;
      });
    }
  };

  useEffect(() => {
    if (selectedPoints.length === 2) {
        const growthPercentage: number = calculateTrendLinePercentage(data, selectedPoints);
        setTrendlinePercentage(growthPercentage)
    }
  }, [selectedPoints])

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchStockChart2(searchQuery, currentTimeInterval);
        const chartWithIndex = response.chart.map((item: StockDataItem, index: number) => ({ ...item, index }));
        setData(chartWithIndex);
        setGrowthPercentage(response.growth_percentage);
        setSelectedPoints([]);
        setTrendlinePercentage(null);
      } catch (err) {
        console.error("Kunne ikke hente data", err);
      }
    };
    getData();
  }, [searchQuery, currentTimeInterval]);


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
    <div>
        <SelectTimeInterval 
        currentTimeInterval={currentTimeInterval} 
        setCurrentTimeInterval={setCurrentTimeInterval} 
        growthPercentage={growthPercentage}
        trendLinePercentage={trendLinePercentage}
        />
    
        <ResponsiveContainer width="80%" height={400}>
          <LineChart data={calculateTrendLine(data, selectedPoints)} onClick={handleChartClick}>
            <CartesianGrid stroke="#505050" strokeDasharray="0 0" strokeWidth={1} />
            <XAxis dataKey="date" />
            <YAxis domain={['dataMin - 10', 'dataMax + 10']} />
            <Tooltip  content={<CustomToolTip />}/>
            <Legend />

            {/* Main stock price line */}
            <Line
              type="monotone"
              dataKey="close"
            //   stroke="#047857"
              stroke={getMainLineColor()}
              dot={false}
              strokeWidth={2}
              isAnimationActive={false}
            />

            {/* Trend line - no separate data prop! */}
            {selectedPoints.length === 2 && (
              <Line
                type="linear"
                dataKey="trendValue"
                stroke="#fbbf24"
                strokeWidth={3}
                strokeDasharray="8 4"
                dot={false}
                isAnimationActive={false}
                connectNulls={false}>
              </Line>
            )}
          </LineChart>
        </ResponsiveContainer>

    </div>
  );
};

export default MyChart;