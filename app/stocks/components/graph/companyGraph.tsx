import { useEffect, useState } from 'react';
import { useSearch } from "@/app/context/SearchContext";
import { GraphSettings } from "./graphSettings";
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
  const [indicatorsData, setIndicatorData] = useState<ChartDataPoint[]>([]); // Liste med indikator grafer
  const [data, setData] = useState<ChartDataPoint[]>([]); // Send denne ned til graph settings
  const [selectedPoints, setSelectedPoints] = useState<ChartDataPoint[]>([]);
  const [currentTimeInterval, setCurrentTimeInterval] = useState<TimeInterval>("1y");
  const [growthPercentage, setGrowthPercentage] = useState<string>("");
  const [trendLinePercentage, setTrendlinePercentage] = useState<number | null>(null);
  const [latestPrice, setLatestPrice] = useState<number | null>(null);
  const [trendLineData, setTrendLineData] = useState<ChartDataPoint[] | null>(null);


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

    console.log("indicatorsData: ", indicatorsData);


  }, [indicatorsData]);


  useEffect(() => {
    if (selectedPoints.length === 2) {
        const growthPercentage: number = calculateTrendLinePercentage(data, selectedPoints);
        setTrendlinePercentage(growthPercentage)
    }

    const trendline = calculateTrendLine(data, selectedPoints);
    setTrendLineData(trendline);

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
        setLatestPrice(data.length > 0 ? data[data.length - 1].close : null)
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

  // Kombiner data og indikatorer (kun indikatorfelt, ingen dobbel close)
  const combinedData = data.map(item => {
    const indicatorItem = indicatorsData.find(ind => ind.date === item.date) || {};
    return { ...item, ...indicatorItem };
  });

  return (
    <div className="bg-black" style={{ width: 700, height: 470 }}>
      <div className='flex'>
        <SelectTimeInterval 
          currentTimeInterval={currentTimeInterval} 
          setCurrentTimeInterval={setCurrentTimeInterval} 
          growthPercentage={growthPercentage}
          trendLinePercentage={trendLinePercentage}
          price={latestPrice}
        />
        <div className="ml-4 pt-4 pr-4">
          <GraphSettings originalChartData={data} setIndicatorData={setIndicatorData}/>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={combinedData} onClick={handleChartClick}>
          <CartesianGrid stroke="#505050" strokeDasharray="0 0" strokeWidth={1} />
          <XAxis dataKey="date" />
          <YAxis
            domain={[
              (dataMin: number) => Math.min(...data.map(d => d.close)) - 10,
              (dataMax: number) => Math.max(...data.map(d => d.close)) + 10
            ]}
            tickFormatter={(value) => value.toFixed(2)}
          />
          <Tooltip content={<CustomToolTip />} />
          <Legend />

          {/* Hovedstock linje */}
          <Line
            type="monotone"
            dataKey="close"
            stroke={getMainLineColor()}
            dot={false}
            strokeWidth={2}
            isAnimationActive={false}
          />

          {/* Trendline */}
          {selectedPoints.length === 2 && trendLineData && (
            <Line
              type="linear"
              data={trendLineData}
              dataKey="trendValue"
              stroke="#fbbf24"
              strokeWidth={3}
              strokeDasharray="8 4"
              dot={false}
              isAnimationActive={false}
            />
          )}

          {/* Dynamiske indikator-linjer */}
          {indicatorsData.length > 0 &&
            Object.keys(indicatorsData[0])
              .filter(key => key !== "date" && key !== "close" && key !== "index" && key !== "open" && key !== "high" && key !== "low" && key !== "volume")
              .map(indicatorKey => (
                <Line
                  key={indicatorKey}
                  type="monotone"
                  dataKey={indicatorKey} // finnes nå i combinedData når date matcher
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              ))
            }

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};


export default MyChart;