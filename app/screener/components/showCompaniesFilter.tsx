"use client";
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { fetchCompanyOverviewData } from "@/app/Services/yahooFinance/ApiSpecificCompany";
import { CompanyKeyInfoInterface } from "./companyKeyInfoInterface";
import { Plus } from "lucide-react";
import { KeyInfoSettings } from "@/app/stocks/components/keyInfo/companyKeyInfoSettings";
import { KeyInfoKey } from "@/app/stocks/components/keyInfo/companyKeyInfoSettings";

const testList = [
  "AAPL",
  "NVDA",
  "PLTR",
  "nke"
]

// Hjelpefunksjon for å få riktig Tailwind-klasse
// const getGridCols = (cols: number): string => {
//   const gridClasses: { [key: number]: string } = {
//     1: 'grid-cols-1',
//     2: 'grid-cols-2',
//     3: 'grid-cols-3',
//     4: 'grid-cols-4',
//     5: 'grid-cols-5',
//     6: 'grid-cols-6',
//     7: 'grid-cols-7',
//     8: 'grid-cols-8',
//     9: 'grid-cols-9',
//     10: 'grid-cols-10',
//     11: 'grid-cols-11',
//     12: 'grid-cols-12'
//   };
//   return gridClasses[cols] || 'grid-cols-4';
// };

const DEFAULT_SELECTED_OPTIONS: KeyInfoKey[] = [
    "MarketCapitalization",
    "DividendYield"
];

const ScreenedCompaniesHeader = ({ 
  numberOfColumns, 
  selectedOptions, 
  setSelectedOptions 
}: {
  numberOfColumns: number;
  selectedOptions: KeyInfoKey[];
  setSelectedOptions: (options: KeyInfoKey[]) => void;
}) => {
  return (
    <div 
      className="grid border-2 border-stone-600 bg-stone-800 text-sky-500 font-mono text-md h-[3vw] items-center px-4"
      style={{ gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)` }}
    >
      <div>Symbol</div>
      <div>Name</div>

      {selectedOptions.map((option, index) => (
        <div key={index}>{option}</div>
      ))}
      <div>
        <KeyInfoSettings selected={selectedOptions} setSelected={setSelectedOptions}>
        </KeyInfoSettings>
      </div>
    </div>
  )
}

const TickerEntry = ({
  company, 
  numberOfColumns,
  selectedOptions
}: {
  company: CompanyKeyInfoInterface;
  numberOfColumns: number;
  selectedOptions: KeyInfoKey[];
}) => {
  return (
    <div 
      className="grid border-b border-stone-700 h-[3.5vw] items-center px-4 hover:bg-sky-950 transition-colors"
      style={{ gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)` }}
    >
      <div>{company.Symbol}</div>
      <div>{company.Name}</div>
      {selectedOptions.map((option, index) => (
        <div key={index}>{(company as any)[option]}</div>
      ))}
    </div>
  )
}

export const ShowScreenedCompanies = () => {
  const [companies, setCompanies] = useState<any[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<KeyInfoKey[]>(DEFAULT_SELECTED_OPTIONS);
  const [numberOfColumns, setNumberOfColumns] = useState<number>(5);

  // Beregn antall kolonner basert på valgte opsjoner
  useEffect(() => {
    const baseColumns = 4; // Symbol, Name, Exchange, P/E
    const additionalColumns = selectedOptions.length;
    const settingsColumn = 1; // For innstillinger-knappen
    setNumberOfColumns(baseColumns + additionalColumns + settingsColumn);
  }, [selectedOptions]);

  useEffect(() => {
    const promises = testList.map(ticker => fetchCompanyOverviewData(ticker));
    Promise.all(promises)
      .then(results => {
        setCompanies(results);
      })
      .catch(error => {
        console.error("Feil ved henting av selskaper: ", error);
      })
  }, [])

  useEffect(() => {
    console.log(companies);
  }, [companies]);

  return (
    <div className="w-full h-[40vw] border-2 border-stone-600 z-0">
      <ScreenedCompaniesHeader 
        numberOfColumns={numberOfColumns}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
      {companies.map((company, index) => (
        <TickerEntry 
          key={index}
          company={company}
          numberOfColumns={numberOfColumns}
          selectedOptions={selectedOptions}
        />
      ))}
    </div>
  )
}