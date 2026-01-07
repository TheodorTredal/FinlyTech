import { ChartDataPoint, ChartDataWithTrend, SelectedPoint, TimeInterval } from "./graphInterfaces";


export const calculateTrendLine = (
  data: ChartDataPoint[],
  selectedPoints: SelectedPoint[]
): ChartDataPoint[] => {

  if (selectedPoints.length !== 2) return data;

  const [p1, p2] = selectedPoints;

  const slope = (p2.close - p1.close) / (p2.index - p1.index);
  const intercept = p1.close - slope * p1.index;

  const minIndex = Math.min(p1.index, p2.index);
  const maxIndex = Math.max(p1.index, p2.index);

  return data.map(item => ({
    ...item,
    trendValue:
      item.index >= minIndex && item.index <= maxIndex
        ? slope * item.index + intercept
        : null
  }));
};


export const calculateTrendLinePercentage = ( selectedPoints: ChartDataPoint[] ): number => {
  
  if (selectedPoints.length !== 2) return 0;

  let [start, end] = selectedPoints;

  // Sikre kronologisk rekkefølge
  if (end.index < start.index) {
    [start, end] = [end, start];
  }

  // Edge cases
  if (start.close === 0) return 0;

  const percentageChange =
    ((end.close - start.close) / start.close) * 100;

  return percentageChange;
};



export const calculateGrowthPercentage = (
  data: ChartDataPoint[],
): string => {

  if (!data.length) return "";

  const start = data[0];
  const end = data[data.length - 1];

  const growth = ((end.close - start.close) / start.close) * 100;

  return `${String(growth.toFixed(2))} %`;
}


export const sliceGraphData = (
  data: ChartDataPoint[],
  interval: TimeInterval
): ChartDataPoint[] => {
  
  if (!data) return data;

  if (interval === "ytd") {
    const currentYear = new Date().getFullYear();

    return data.filter((item: any) => {
      const itemDate = new Date(item.date);
      return itemDate.getFullYear() === currentYear;
    });
  }

  const map: Record<Exclude<TimeInterval, "ytd">, number> = {
    "5d": 5,
    "1mo": 22,
    "6mo": 126,
    "1y": 252,
    "3y": 756,
    "5y": 1260,
    "10y": 2520,
    "all": data.length,
  };

  const size = map[interval];
  return data.slice(-size);
};
