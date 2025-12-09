import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import { Settings } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import { useEffect, useState } from "react";
  import { ChartDataPoint } from "./graphInterfaces";

  // Indicator functions
  import { calculate_thirtyDayMa } from "./IndicatorFunctions/thirty_day_mAVG";
import { fetchStockChart2 } from "@/app/Services/yahooFinance/ApiSpecificCompany";
import { useSearch } from "@/app/context/SearchContext";


interface graphSettingsInterface {
  originalChartData: ChartDataPoint[];
  setIndicatorData: React.Dispatch<React.SetStateAction<ChartDataPoint[]>>; // Setter funksjon som returnerer en liste 
}


// Forbedret GraphSettings komponent
export const GraphSettings = ({originalChartData, setIndicatorData}: graphSettingsInterface) => {

    const [showTrendLine, setShowTrendLine] = useState(true);
    const [showDataPoints, setShowDataPoints] = useState(false);
    const [chartType, setChartType] = useState('line');
    const [show_stock_split, set_show_stock_split] = useState(false);


    // Indicators
    const [show_thirty_day_moving_avg, set_show_thirty_day_moving_avg] = useState(false);
    const [show_ninethy_day_moving_avg, set_show_ninethy_day_movign_avg] = useState(false);
    const [show_hundred_80_day_moving_avg, set_show_hundred_80_day_moving_avg] = useState(false);
    const [show_macd, set_show_macd] = useState(false);
    const [show_RSI, set_show_RSI] = useState(false);
    const { searchQuery } = useSearch();




  useEffect(() => {
    if (show_thirty_day_moving_avg) {
      // clear the state
      setIndicatorData([]);

      const handleAddMA30 = async () => {
        const response = await fetchStockChart2(searchQuery, "1mo");
      
        const maSourceData = response.chart.map((item, i) => ({
          ...item,
          index: i
        }));
        
        console.log("maSourceData length:", maSourceData.length);
        calculate_thirtyDayMa({
          originalChartData: maSourceData,
          setIndicatorData,
        });
      };

    
      handleAddMA30();
    
    } else {
      // Fjern indikator
      setIndicatorData([]);
    }
  
  }, [show_thirty_day_moving_avg, searchQuery]);


    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Settings className="w-5 h-5" />
          </Button>

        </SheetTrigger>
        <SheetContent className="bg-gray-900 border-gray-700">
          <SheetHeader>
            <SheetTitle className="text-white">Graf Innstillinger</SheetTitle>
            <SheetDescription className="text-gray-400">
              Tilpass hvordan grafen vises og oppfører seg.
            </SheetDescription>
          </SheetHeader>
          
          <div className="mt-6 space-y-6">
            {/* Visningsalternativer */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Visning</h3>
              
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-300">Vis trendlinje</label>
                <input
                  type="checkbox"
                  checked={showTrendLine}
                  onChange={(e) => setShowTrendLine(e.target.checked)}
                  className="rounded border-gray-600 bg-red-800"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-300">Vis datapunkter</label>
                <input
                  type="checkbox"
                  checked={showDataPoints}
                  onChange={(e) => setShowDataPoints(e.target.checked)}
                  className="rounded border-gray-600 bg-gray-800"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-300">Show stock splits</label>
              <input
                type="checkbox"
                checked={show_stock_split}
                onChange={(e) => set_show_stock_split(e.target.checked)}
                className="rounded border-gray-600 bg-gray-800"
              >
              </input>

            </div>
  
            {/* Graf type */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Graf Type</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={chartType === 'line' ? 'default' : 'outline'}
                  onClick={() => setChartType('line')}
                  className="text-sm"
                >
                  Linje
                </Button>
                <Button
                  variant={chartType === 'area' ? 'default' : 'outline'}
                  onClick={() => setChartType('area')}
                  className="text-sm"
                >
                  Område
                </Button>
              </div>
            </div>
            <div className="text-xl">
              Indicators
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-300">30 day moving avg</label>
              <input
              type="checkbox"
              checked={show_thirty_day_moving_avg} // set en egen true false for denne
              onChange={(e) => set_show_thirty_day_moving_avg(e.target.checked)}
              className="rounded border-gray-600 bg-red-800"
              ></input>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-300">90 day moving avg</label>
              <input
              type="checkbox"
              checked={show_ninethy_day_moving_avg} // set en egen true false for denne
              onChange={(e) => set_show_ninethy_day_movign_avg(e.target.checked)}
              className="rounded border-gray-600 bg-red-800"
              ></input>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-300">180 day moving avg</label>
              <input
              type="checkbox"
              checked={show_hundred_80_day_moving_avg} // set en egen true false for denne
              onChange={(e) => set_show_hundred_80_day_moving_avg(e.target.checked)}
              className="rounded border-gray-600 bg-red-800"
              ></input>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-300">macd</label>
              <input
              type="checkbox"
              checked={show_macd} // set en egen true false for denne
              onChange={(e) => set_show_macd(e.target.checked)}
              className="rounded border-gray-600 bg-red-800"
              ></input>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-300">RSI</label>
              <input
              type="checkbox"
              checked={show_RSI} // set en egen true false for denne
              onChange={(e) => set_show_RSI(e.target.checked)}
              className="rounded border-gray-600 bg-red-800"
              ></input>
            </div>
  
            {/* Fargevalg */} 
          </div>
        </SheetContent>
      </Sheet>
    );
  };