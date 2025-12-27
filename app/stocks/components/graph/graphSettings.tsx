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
  import React, { useEffect, useState } from "react";
  import { ChartDataPoint } from "./graphInterfaces";

  // Indicator functions
import { calculateSMA } from "./IndicatorFunctions/calculateSMA";
import { fetchStockChart2 } from "@/app/Services/yahooFinance/ApiSpecificCompany";
import { useSearch } from "@/app/context/SearchContext";
import { ColorPallete } from "./colorPallette";
import { IndicatorKey } from "./graphInterfaces";
import { INDICATOR_CONFIG } from "./indicatorConfig";


interface graphSettingsInterface {
  originalChartData: ChartDataPoint[];
  setIndicatorData: React.Dispatch<React.SetStateAction<ChartDataPoint[]>>; // Setter funksjon som returnerer en liste 
  setIndicatorColors: React.Dispatch<React.SetStateAction<Record<IndicatorKey, string>>>;
  indicatorColors: Record<IndicatorKey, string>;
}


// Forbedret GraphSettings komponent
export const GraphSettings = ({originalChartData, setIndicatorData, setIndicatorColors, indicatorColors}: graphSettingsInterface) => {

  const [showTrendLine, setShowTrendLine] = useState(true);
  const [showDataPoints, setShowDataPoints] = useState(false);
  const [chartType, setChartType] = useState('line');
  const [show_stock_split, set_show_stock_split] = useState(false);

  const [activeIndicators, setActiveIndicators] = useState<Record<IndicatorKey, boolean>>({
    sma30: false,
    sma90: false,
    sma180: false,
  });

  const [show_macd, set_show_macd] = useState(false);
  const [show_RSI, set_show_RSI] = useState(false);
  const { searchQuery } = useSearch();


  useEffect(() => {
    
    const handleIndicators = async () => {
      const response = await fetchStockChart2(searchQuery, "6mo");
    
      let data = response.chart.map((item: any, i: any) => ({
        ...item,
        index: i,
      }));

      (Object.keys(activeIndicators) as IndicatorKey[]).forEach((key) => {
        if (!activeIndicators[key]) return;

        const config = INDICATOR_CONFIG[key];

        data = calculateSMA({
          originalChartData: data,
          window: config.window,
          field: config.field,
        })
      })
      setIndicatorData(data);
    }

    handleIndicators();

  }, [activeIndicators, searchQuery])


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

            {/**SMA INDICATORS */}
            {(Object.keys(INDICATOR_CONFIG) as IndicatorKey[]).map((key) => (
              <div key={key} className="flex items-center justify-between">
                <label className="text-sm text-gray-300">
                  {INDICATOR_CONFIG[key].label}
                </label>

                <ColorPallete
                  selectedColor={indicatorColors[key]}
                  onSelectColor={(color) => 
                  setIndicatorColors((prev) => ({
                    ...prev,
                    [key]: color
                  }))
                }
                />
            
                <input
                  type="checkbox"
                  checked={activeIndicators[key]}
                  onChange={(e) => 
                    setActiveIndicators((prev) => ({
                      ...prev,
                      [key]: e.target.checked
                    }))
                  }
                />
              </div>
            ))}


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