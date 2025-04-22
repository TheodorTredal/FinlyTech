import { PortfolioPieChart } from "./PortfolioGraph/PortfolioPieChart";
import PortfolioGraph from "./PortfolioGraph/portfolioGraph";
import { portfolioFolderInterface } from "../interfaces/stockPortfolioInterface";
import { SelectPortfolio } from "./portfolioSelector";
import { get_companyInfo } from "@/app/Services/yahooFinance/ApiSpecificCompany";
import { useEffect, useState } from "react";


const convertSectorExposure = (
  sectorExposure: { [sector: string]: number }
): portfolioFolderInterface => {


  if (!sectorExposure) {
    return {
      name: "SektorEksponering",
      stocks: [],
    }
  }

  return {
    name: "Sektoreksponering",
    stocks: Object.entries(sectorExposure).map(([sector, percentage]) => ({
      ticker: sector,        // bruker sektornavnet som "ticker"
      price: Math.round(percentage * 100) / 100,     // setter prosent som "verdi"
      volum: 1,              // dummy-verdi
    })),
  };
};


const calculateSectorExposure = (
  portfolio: portfolioFolderInterface,
  sectorMap: { [ticker: string]: { sector: string; industry: string } }
) => {
  const sectorExposure: { [sector: string]: number } = {};
  let totalValue = 0;

  for (const stock of portfolio.stocks) {
    const info = sectorMap[stock.ticker];
    if (!info || !info.sector) continue;

    const value = stock.price * stock.volum;
    totalValue += value;

    if (!sectorExposure[info.sector]) {
      sectorExposure[info.sector] = 0;
    }

    sectorExposure[info.sector] += value;
  }

  // Konverter til prosent
  for (const sector in sectorExposure) {
    sectorExposure[sector] = (sectorExposure[sector] / totalValue) * 100;
  }
 
  console.log(sectorExposure);
  return sectorExposure;
};



const fetchCompanyInfo = async (portfolio: portfolioFolderInterface) => {
  const result: { [ticker: string]: { sector: string; industry: string } } = {};

  for (const stock of portfolio.stocks) {
    try {
      const data = await get_companyInfo(stock.ticker);

      // Anta at data = { sector: "Real Estate", industry: "REIT - Retail" }
      result[stock.ticker] = {
        sector: data?.sector,
        industry: data?.industry,
      };

    } catch (error) {
      console.log(`Feil ved fetchCompanyInfo API: ${error}`);
    }
  }
  return result;
};

export const PortfolioDevelopment = ({ currentPortfolio, portfolioList, setCurrentPortfolio }: {currentPortfolio: string; portfolioList: portfolioFolderInterface[]; setCurrentPortfolio: (val: string) => void}) => {
  const [markedExposure, setMarkedExposure] = useState<any>(null);

    useEffect(() => {
      
      // Current Portfolio
      const p = portfolioList.find((p) => p.name === currentPortfolio) as portfolioFolderInterface
      
      const fetchAndCalculate = async () => { 
        const portfolioCompaniesInfo = await fetchCompanyInfo(p);
        setMarkedExposure(calculateSectorExposure(p, portfolioCompaniesInfo))
      }
  
      fetchAndCalculate();
    }, [currentPortfolio, portfolioList])






    return (
        <div className="flex justify-center h-[80vh] overflow-hidden py-4">

            <div className="flex mr-auto broder-10 border-red-400 w-[13%] h-[5%] ">
              <SelectPortfolio portfolioList={portfolioList} setPortFolio={setCurrentPortfolio}></SelectPortfolio>
            </div>


            <div className="flex flex-col w-[80%] h-full space-y-2">
              <PortfolioGraph
                portfolio={portfolioList.find((p) => p.name === currentPortfolio) as portfolioFolderInterface}
                />

              <div className="flex space-x-2">

          
                <PortfolioPieChart
                name="Markedsverdi"
                portfolio={portfolioList.find((p) => p.name === currentPortfolio) as portfolioFolderInterface}
                symbol=""
                />
  
                <PortfolioPieChart name="Eksponering"
                portfolio={convertSectorExposure(markedExposure)}
                symbol=" %"
                />
  
                </div>
            </div>
        </div>
    )
}