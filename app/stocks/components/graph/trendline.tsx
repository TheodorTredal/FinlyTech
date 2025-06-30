import { ChartDataPoint, ChartDataWithTrend } from "./graphInterfaces";


export const calculateTrendLine = (
    data: ChartDataPoint[], 
    selectedPoints: ChartDataPoint[]
  ): ChartDataWithTrend[] => {
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
  return chartDataWithTrendLine;
}


export const calculateTrendLinePercentage = (
    data: ChartDataPoint[],
    selectedPoints: ChartDataPoint[]
    ): number => {
        let [point1, point2] = selectedPoints;

        if (point1.date && point2.date && point2.date < point1.date) {
            const tmp = point1;
            point1 = point2;
            point2 = tmp;

        }
    const slope = ((point2.close - point1.close) / point1.close) * 100;
    return slope;
}