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
  import { useState } from "react";
  


// Forbedret GraphSettings komponent
export const GraphSettings = () => {
    const [showTrendLine, setShowTrendLine] = useState(true);
    const [showDataPoints, setShowDataPoints] = useState(false);
    const [chartType, setChartType] = useState('line');
  
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
  
            {/* Fargevalg */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Farger</h3>
              <div className="flex gap-2">
                <div className="w-6 h-6 bg-blue-500 rounded cursor-pointer border-2 border-white"></div>
                <div className="w-6 h-6 bg-green-500 rounded cursor-pointer"></div>
                <div className="w-6 h-6 bg-red-500 rounded cursor-pointer"></div>
                <div className="w-6 h-6 bg-purple-500 rounded cursor-pointer"></div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  };