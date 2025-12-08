import { ChartDataPoint } from "../graphInterfaces"

/**
 * Må ta inn datasettet
 * regne på datasettet og returnere en liste med verdier kalles på i graphSettings.tsx
 */


interface thirtyDayMAProps {
    originalChartData: ChartDataPoint[];
    setIndicatorData: React.Dispatch<React.SetStateAction<ChartDataPoint[]>>;
}

/**
 * Send inn data settet, returner en liste (av riktig format) til 
 */
export const calculate_thirtyDayMa = ({ originalChartData, setIndicatorData }: thirtyDayMAProps) => {

    const window = 30;
    const smaData: ChartDataPoint[] = [];


    for (let i = 0; i < originalChartData.length; i++) {
        if (i < window - 1) {
            smaData.push({
                ...originalChartData[i],
                sma30: null,
            });
            continue;
        }

        const windowSlice = originalChartData.slice(i - (window - 1), i + 1);
        const avg = windowSlice.reduce((sum, dp) => sum + dp.close, 0) / window;

        smaData.push({
            ...originalChartData[i],
            sma30: avg,
        });
    }
    setIndicatorData(smaData);
}