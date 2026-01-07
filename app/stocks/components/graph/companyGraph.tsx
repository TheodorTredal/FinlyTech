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
    SelectedPoint,
 } from './graphInterfaces';
import { calculateTrendLine, calculateTrendLinePercentage, sliceGraphData, calculateGrowthPercentage } from './graphHelperFunctions';
import { CustomToolTip } from './tooltip';
import { IndicatorKey } from './graphInterfaces';
import { INDICATOR_CONFIG } from './indicatorConfig';
import { calculateSMA } from './IndicatorFunctions/calculateSMA';

const MyChart = () => {
  const { searchQuery } = useSearch();
  const [data, setData] = useState<ChartDataPoint[]>([]); // Send denne ned til graph settings
  const [fullData, setFullData] = useState<ChartDataPoint[]>([]);   // 5y + SMA
  const [rawFullData, setRawFullData] = useState<ChartDataPoint[]>([]);
  const [selectedPoints, setSelectedPoints] = useState<SelectedPoint[]>([]);
  const [currentTimeInterval, setCurrentTimeInterval] = useState<TimeInterval>("1y");
  const [growthPercentage, setGrowthPercentage] = useState<string>("");
  const [trendLinePercentage, setTrendlinePercentage] = useState<number | null>(null);
  const [latestPrice, setLatestPrice] = useState<number | null>(null);


  const [indicatorColors, setIndicatorColors] = useState<Record<IndicatorKey, string>>({
    sma30: "#14b8a6",
    sma90: "#f97316",
    sma180: "#8b5cf6",
  });


  const [activeIndicators, setActiveIndicators] = useState<Record<IndicatorKey, boolean>>({
    sma30: false,
    sma90: false,
    sma180: false,
  });


const handleChartClick = (event: any) => {
  if (!event || !Array.isArray(event.activePayload)) return;

  const graphPayload = event.activePayload.find(
    (p: any) => p.dataKey === "close"
  );

  if (!graphPayload) return;

  const { index, close } = graphPayload.payload;

  setSelectedPoints((prev) => {
    // unngå samme punkt
    if (prev.some(p => p.index === index)) return prev;

    const next = [...prev, { index, close }];
    return next.length > 2 ? next.slice(-2) : next;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchStockChart2(searchQuery, "5y");
      setRawFullData(
        response.chart.map((item: any, i: any) => ({ ...item, index: i }))
      );
    };

    fetchData();
  }, [searchQuery]);


  useEffect(() => {
    if (!rawFullData.length) return;

    let next = [...rawFullData];

    (Object.keys(activeIndicators) as IndicatorKey[]).forEach((key) => {
      if (!activeIndicators[key]) return;

      const config = INDICATOR_CONFIG[key];

      next = calculateSMA({
        originalChartData: next,
        window: config.window,
        field: config.field,
      });
    });

    setFullData(next);
  }, [rawFullData, activeIndicators]);



  useEffect(() => {
  const slicedData = sliceGraphData(fullData, currentTimeInterval);
  setData(slicedData);
  setSelectedPoints([]);
  setTrendlinePercentage(null);

  const chartWithIndex = slicedData.map((item: StockDataItem, index: number) => ({ ...item, index }));

  setLatestPrice(
    chartWithIndex.length > 0 ? chartWithIndex[chartWithIndex.length - 1].close : null
  );

  setGrowthPercentage(calculateGrowthPercentage(slicedData));

}, [fullData, currentTimeInterval]);


  useEffect(() => {
    if (selectedPoints.length === 2) {
      setTrendlinePercentage(
        calculateTrendLinePercentage(selectedPoints)
      );
    
      setData(prev => 
        calculateTrendLine(prev, selectedPoints)
      );
    }
  }, [selectedPoints]);


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
        <div className="ml-4 pt-4 pr-4">
          <GraphSettings 
            activeIndicators={activeIndicators}
            setActiveIndicators={setActiveIndicators} 
            setIndicatorColors={setIndicatorColors} 
            indicatorColors={indicatorColors}/>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} onClick={handleChartClick}>
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
            dataKey="close"
            stroke={getMainLineColor()}
            dot={false}
            strokeWidth={2}
            isAnimationActive={false}
          />

          {/* Trendline */}
          {selectedPoints.length === 2 && (
            <Line
              type="linear"
              dataKey="trendValue"
              stroke="#fbbf24"
              strokeWidth={3}
              strokeDasharray="8 4"
              dot={false}
              isAnimationActive={false}
            />
          )}

          {/* Dynamiske indikator-linjer */}
          {(Object.keys(INDICATOR_CONFIG) as IndicatorKey[]).map((key) => (
            activeIndicators[key] && (
              <Line
                key={key}
                type="monotone"
                dataKey={INDICATOR_CONFIG[key].field}
                stroke={indicatorColors[key]}
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            )
          ))}

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};


export default MyChart;