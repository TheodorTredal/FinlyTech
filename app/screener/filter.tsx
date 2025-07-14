"use client";
import { useState } from "react";
import { ApplyFilterButton } from "./components/applyFilterButton"
import { FilterButton } from "./components/filterButton"
import { ShowScreenedCompanies } from "./components/showCompaniesFilter";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";


const filterOptions = [
  { text: "P/E", key: "TrailingPE" },
  { text: "Forward P/E", key: "ForwardPE" },
  { text: "P/S", key: "PriceToSalesRatioTTM" },
  { text: "P/B", key: "PriceToBookRatio" },
  { text: "EV/Revenue", key: "EVToRevenue" },
  { text: "EV/EBITDA", key: "EVToEBITDA" },
  { text: "Beta", key: "Beta" },
  { text: "52-Week High", key: "52WeekHigh" },
  { text: "52-Week Low", key: "52WeekLow" },
  { text: "50-Day MA", key: "50DayMovingAverage" },
  { text: "200-Day MA", key: "200DayMovingAverage" },
  { text: "Shares Outstanding", key: "SharesOutstanding" },
  { text: "Shares Float", key: "SharesFloat" },
  { text: "% Insiders", key: "PercentInsiders" },
  { text: "% Institutions", key: "PercentInstitutions" },
  { text: "Dividend Date", key: "DividendDate" },
  { text: "Ex-Dividend Date", key: "ExDividendDate" },
  { text: "Revenue Per Share", key: "RevenuePerShareTTM" },
  { text: "Profit Margin", key: "ProfitMargin" },
  { text: "Operating Margin", key: "OperatingMarginTTM" },
  { text: "Return On Assets", key: "ReturnOnAssetsTTM" },
  { text: "Return On Equity", key: "ReturnOnEquityTTM" },
  { text: "Revenue (TTM)", key: "RevenueTTM" },
  { text: "Gross Profit (TTM)", key: "GrossProfitTTM" },
  { text: "Diluted EPS (TTM)", key: "DilutedEPSTTM" },
  { text: "Quarterly Earnings Growth YoY", key: "QuarterlyEarningsGrowthYOY" },
  { text: "Quarterly Revenue Growth YoY", key: "QuarterlyRevenueGrowthYOY" },
  { text: "Analyst Target Price", key: "AnalystTargetPrice" },
  { text: "Analyst Ratings - Strong Buy", key: "AnalystRatingStrongBuy" },
  { text: "Analyst Ratings - Buy", key: "AnalystRatingBuy" },
  { text: "Analyst Ratings - Hold", key: "AnalystRatingHold" },
  { text: "Analyst Ratings - Sell", key: "AnalystRatingSell" },
  { text: "Analyst Ratings - Strong Sell", key: "AnalystRatingStrongSell" },
];


export const Filter = () => {
  const [companies, setCompanies] = useState<string[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  
  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };
  
  return (
    <div className="relative w-screen min-h-screen bg-black text-white p-8">
      {/* Filterknapper-wrapper */}
      <div className="relative"> {/* Legg til relative her */}
        <div
          className={` transition-all duration-500 ease-in-out ${
            isFiltersOpen ? 'max-h-96 opacity-100' : 'overflow-hidden max-h-16 opacity-60'
          }`}
        >
          <div className="relative grid grid-cols-1 lg:grid-cols-7 gap-2 bg-stone-800 p-4 rounded-xl z-5">
            {filterOptions.map(({ text, key }) => (
              <FilterButton text={text} key={key} />
            ))}
          </div>
        </div>
        
        {/* Chevron – plassert halvveis utenfor kanten */}
        <div
          className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 bg-yellow-400 rounded-full p-1 cursor-pointer"
          onClick={toggleFilters}
        >
          <ChevronUp className={`text-white w-6 h-6 transition-transform duration-300 ${!isFiltersOpen ? 'rotate-180' : ''}`} />
        </div>
      </div>
      
      {/* Vis filtrerte selskaper */}
      <div className="py-4 mt-4"> {/* Legg til mt-4 for ekstra spacing */}
        <ShowScreenedCompanies />
      </div>
    </div>
  );
};