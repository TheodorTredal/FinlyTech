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
  Tooltip
} from 'recharts';
import { fetchStockChart2 } from '@/app/Services/yahooFinance/ApiSpecificCompany';

const MyChart = () => {
  const { searchQuery } = useSearch();
  const [data, setData] = useState([]);
  const [interval] = useState("1y");
  const [selectedPoints, setSelectedPoints] = useState([]);

  const handleChartClick = (event) => {
    if (event && event.activePayload && event.activePayload[0]) {
      const clickedData = event.activePayload[0].payload;
      console.log("Clicked on data point", clickedData);
      
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
    const getData = async () => {
      try {
        const chart = await fetchStockChart2(searchQuery, interval);
        const chartWithIndex = chart.map((item, index) => ({ ...item, index }));
        setData(chartWithIndex);
      } catch (err) {
        console.error("Kunne ikke hente data", err);
      }
    };
    getData();
  }, [searchQuery, interval]);

  // Add trend line values directly to the main data
  const chartDataWithTrendLine = data.map(item => {
    let trendValue = null;
    
    if (selectedPoints.length === 2) {
      const [point1, point2] = selectedPoints;
      const slope = (point2.close - point1.close) / (point2.index - point1.index);
      const intercept = point1.close - slope * point1.index;
      
      // Only show trend line between selected points
      const minIndex = Math.min(point1.index, point2.index);
      const maxIndex = Math.max(point1.index, point2.index);
      
      if (item.index >= minIndex && item.index <= maxIndex) {
        trendValue = slope * item.index + intercept;
      }
    }
    
    return { ...item, trendValue };
  });

  return (
    <ResponsiveContainer width="80%" height={400}>
      <LineChart data={chartDataWithTrendLine} onClick={handleChartClick}>
        <CartesianGrid stroke="#505050" strokeDasharray="0 0" strokeWidth={1} />
        <XAxis dataKey="date" />
        <YAxis domain={['dataMin - 10', 'dataMax + 10']} />
        <Tooltip />
        <Legend />
        
        {/* Main stock price line */}
        <Line
          type="monotone"
          dataKey="close"
          stroke="#047857"
          dot={false}
          strokeWidth={2}
          isAnimationActive={false}
        />
        
        {/* Trend line - no separate data prop! */}
        {selectedPoints.length === 2 && (
          <Line
            type="linear"
            dataKey="trendValue"
            stroke="#ff6b6b"
            strokeWidth={3}
            strokeDasharray="8 4"
            dot={false}
            isAnimationActive={false}
            connectNulls={false}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MyChart;