import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Settings } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const keyInfoOptions = [
    { key: "MarketCapitalization", label: "Market Cap"},
    { key: "DividendYield", label: "Dividend Yield"},
    { key: "PERatio", label: "PE Ratio"},
    { key: "EBITDA", label: "EBITDA"},
    { key: "PEGRatio", label: "PEGratio"},
    { key: "BookValue", label: "Book Value"},
    { key: "DividenPerShare", label: "Dividend per share"},
    { key: "EPS", label: "Earnings per share"},
    { key: "RevenuePerShareTTM", label: "Revenue per share (TTM)" },
    { key: "ProfitMargin", label: "Profit margin" },
    { key: "OperatingMarginTTM", label: "Operating margin (TTM)" },
    { key: "ReturnOnAssetsTTM", label: "Return on assets (TTM)" },
    { key: "ReturnOnEquityTTM", label: "Return on equity (TTM)" },
    { key: "RevenueTTM", label: "Revenue (TTM)" },
    { key: "GrossProfitTTM", label: "Gross profit (TTM)" },
    { key: "DilutedEPSTTM", label: "Diluted EPS (TTM)" },
    { key: "QuarterlyEarningsGrowthYOY", label: "Earnings growth YoY (quarterly)" },
    { key: "QuarterlyRevenueGrowthYOY", label: "Revenue growth YoY (quarterly)" },
    { key: "AnalystTargetPrice", label: "Analyst target price" },
    { key: "AnalystRatingStrongBuy", label: "Strong buy ratings" },
    { key: "AnalystRatingBuy", label: "Buy ratings" },
    { key: "AnalystRatingHold", label: "Hold ratings" },
    { key: "AnalystRatingSell", label: "Sell ratings" },
    { key: "AnalystRatingStrongSell", label: "Strong sell ratings" },
    { key: "TrailingPE", label: "Trailing P/E" },
    { key: "ForwardPE", label: "Forward P/E" },
    { key: "PriceToSalesRatioTTM", label: "Price to sales (TTM)" },
    { key: "PriceToBookRatio", label: "Price to book" },
    { key: "EVToRevenue", label: "EV to revenue" },
    { key: "EVToEBITDA", label: "EV to EBITDA" },
    { key: "Beta", label: "Beta" },
    { key: "52WeekHigh", label: "52-week high" },
    { key: "52WeekLow", label: "52-week low" },
    { key: "50DayMovingAverage", label: "50-day moving average" },
    { key: "200DayMovingAverage", label: "200-day moving average" },
    { key: "SharesOutstanding", label: "Shares outstanding" },
    { key: "DividendDate", label: "Dividend date" },
    { key: "ExDividendDate", label: "Ex-dividend date" }
]

export type KeyInfoKey = (typeof keyInfoOptions)[number]["key"];

interface KeyInfoSettingsProps {
    selected: KeyInfoKey[];
    setSelected: (keys: KeyInfoKey[]) => void;
}

export const KeyInfoSettings = ({ selected, setSelected}: KeyInfoSettingsProps) => {
    const toggleSelection = (key: KeyInfoKey) => {
        if (selected.includes(key)) {
            setSelected(selected.filter((k) => k !== key));
        } else {
            setSelected([...selected, key]);
        }
    }

    return (
        <Sheet>
            <SheetTrigger>
                <Settings className="w-5 h-5 cursor-pointer text-muted-foreground"></Settings>
            </SheetTrigger>

            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle>Velg Nøkkeltall</SheetTitle>
                </SheetHeader>

                <div className="mt-6 max-h-[80vh] overflow-y-auto space-y-4">
                    {keyInfoOptions.map((item) => (
                        <div key={item.key} className="flex items-center space-x-2">
                            <Checkbox
                              id={item.key}
                              checked={selected.includes(item.key)}
                              onCheckedChange={(checked) => {
                                if (typeof checked === "boolean") {
                                  toggleSelection(item.key);
                                }
                              }}
                            />
                        <Label htmlFor={item.key}>{item.key}</Label>
                        </div>
                    ))}
                </div>

            </SheetContent>

        </Sheet>
    )
}