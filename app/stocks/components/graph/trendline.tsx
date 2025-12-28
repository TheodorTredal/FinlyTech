import { ChartDataPoint, ChartDataWithTrend, SelectedPoint } from "./graphInterfaces";


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