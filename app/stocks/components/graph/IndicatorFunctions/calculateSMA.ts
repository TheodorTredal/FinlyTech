import { ChartDataPoint } from "../graphInterfaces"

/**
 * Må ta inn datasettet
 * regne på datasettet og returnere en liste med verdier kalles på i graphSettings.tsx
 */


interface movingAverageProps {
    originalChartData: ChartDataPoint[];
    window: number;
    field: "sma30" | "sma90" | "sma180";
}

/**
 * Gjør API kall mot database for å hente de siste 30 dagene, returner en liste (av riktig format) tilbake.
 */
export const calculateSMA = ({
  originalChartData,
  window,
  field,
}: movingAverageProps): ChartDataPoint[] => {
  const result: ChartDataPoint[] = [];
  let sum = 0;

  for (let i = 0; i < originalChartData.length; i++) {
    sum += originalChartData[i].close;

    if (i >= window) {
      sum -= originalChartData[i - window].close;
    }

    result.push({
      ...originalChartData[i],
      [field]: i >= window - 1 ? sum / window : null,
    });
  }

  return result;
};