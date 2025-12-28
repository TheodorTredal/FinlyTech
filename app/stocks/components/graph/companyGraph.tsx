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
import { calculateTrendLine, calculateTrendLinePercentage } from './trendline';
import { CustomToolTip } from './tooltip';
import { IndicatorKey } from './graphInterfaces';
import { INDICATOR_CONFIG } from './indicatorConfig';
import { calculateSMA } from './IndicatorFunctions/calculateSMA';



  // useEffect(() => {
    
  //   const handleIndicators = async () => {
  //     // Denne må gjøres mer dynamisk senere!
  //     const response = await fetchStockChart2(searchQuery, "5y");

  //     let data = response.chart.map((item: any, i: any) => ({
  //       ...item,
  //       index: i,
  //     }));

  //     (Object.keys(activeIndicators) as IndicatorKey[]).forEach((key) => {
  //       if (!activeIndicators[key]) return;

  //       const config = INDICATOR_CONFIG[key];

  //       data = calculateSMA({
  //         originalChartData: data,
  //         window: config.window,
  //         field: config.field,
  //       })
  //     })
  //     setIndicatorData(data);
  //   }
  //   handleIndicators();

  // }, [activeIndicators, searchQuery])




const MyChart = () => {
  const { searchQuery } = useSearch();
  const [indicatorsData, setIndicatorData] = useState<ChartDataPoint[]>([]); // Liste med indikator grafer
  const [data, setData] = useState<ChartDataPoint[]>([]); // Send denne ned til graph settings
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
    if (selectedPoints.length === 2) {
      setTrendlinePercentage(
        calculateTrendLinePercentage(data, selectedPoints)
      );
    
      setData(prev => 
        calculateTrendLine(prev, selectedPoints)
      );
    }
  }, [selectedPoints]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchStockChart2(searchQuery, currentTimeInterval);
        const chartWithIndex = response.chart.map((item: StockDataItem, index: number) => ({ ...item, index }));
        setData(chartWithIndex);
        setGrowthPercentage(response.growth_percentage);
        setSelectedPoints([]);
        setTrendlinePercentage(null);
        setLatestPrice(
          chartWithIndex.length > 0 ? chartWithIndex[chartWithIndex.length - 1].close : null
        );
      } catch (err) {
        console.error("Kunne ikke hente data", err);
      }
    };
    getData();
  }, [searchQuery, currentTimeInterval]);




  useEffect(() => {
    const handleSMA = async () => {
      if (
        !Object.values(activeIndicators).some(Boolean)
      ) {
        return;
      }

      // Hent FULL historikk MÅ GJØRES MER DYNAMISK SENERE
      const response = await fetchStockChart2(searchQuery, "5y");

      let fullData = response.chart.map((item: any, i: number) => ({
        ...item,
        index: i,
      }));

      // Beregn SMA på full historikk
      (Object.keys(activeIndicators) as IndicatorKey[]).forEach((key) => {
        if (!activeIndicators[key]) return;

        const config = INDICATOR_CONFIG[key];

        fullData = calculateSMA({
          originalChartData: fullData,
          window: config.window,
          field: config.field,
        });
      });

      // Map SMA-verdier inn i VISNINGSDATA (`data`)
      setData(prev =>
        prev.map(item => {
          const indicatorItem =
            fullData.find(fd => fd.date === item.date);

          return {
            ...item,
            ...(indicatorItem ?? {}),
            trendValue: item.trendValue ?? null, // behold trendline
          };
        })
      );
    };

  handleSMA();
  }, [activeIndicators, searchQuery]);



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