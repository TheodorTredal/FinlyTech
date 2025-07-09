import { PortfolioPieChart } from "./PortfolioGraph/PortfolioPieChart";
import PortfolioGraph from "./PortfolioGraph/portfolioGraph";
import { portfolioFolderInterface } from "../interfaces/stockPortfolioInterface";
import { SelectPortfolio } from "./portfolioSelector";
import { get_companyInfo } from "@/app/Services/yahooFinance/ApiSpecificCompany";
import { useEffect, useState } from "react";


type ExposureType = "sector" | "industry";

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
  sectorMap: { [ticker: string]: { sector: string; industry: string } },
  input: ExposureType
) => {
  const exposure: { [key: string]: number } = {};
  let totalValue = 0;

  for (const stock of portfolio.stocks) {
    const info = sectorMap[stock.ticker];
    if (!info || !info[input]) continue;

    const key = info[input]; // enten sektor eller industri
    const value = stock.price * stock.volum;
    totalValue += value;

    if (!exposure[key]) {
      exposure[key] = 0;
    }

    exposure[key] += value;
  }

  // Konverter til prosent
  for (const key in exposure) {
    exposure[key] = (exposure[key] / totalValue) * 100;
  }

  return exposure;
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


const calculateMarkedValue = (portfolio: portfolioFolderInterface) => {

  // portfolio.stocks.map(stock)


}

export const PortfolioDevelopment = ({ currentPortfolio, portfolioList, setCurrentPortfolio }: {currentPortfolio: string; portfolioList: portfolioFolderInterface[]; setCurrentPortfolio: (val: string) => void}) => {
  const [sectorExposure, setSectorExposure] = useState<any>(null);
  const [industryExposure, setIndustryExposure] = useState<any>(null);
  const [markedValue, setMarkedValue] = useState<number | null>(null);


    useEffect(() => {


    }, [])

    useEffect(() => {
      
      // Current Portfolio
      const p = portfolioList.find((p) => p.name === currentPortfolio) as portfolioFolderInterface
      
      const fetchAndCalculate = async () => { 
        const portfolioCompaniesInfo = await fetchCompanyInfo(p);
        setSectorExposure(calculateSectorExposure(p, portfolioCompaniesInfo, "sector"))
        setIndustryExposure(calculateSectorExposure(p, portfolioCompaniesInfo, "industry"))
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
                name="Markedsverd"
                portfolio={portfolioList.find((p) => p.name === currentPortfolio) as portfolioFolderInterface}
                symbol=""
                />
  
                <PortfolioPieChart name="Sektor"
                portfolio={convertSectorExposure(sectorExposure)}
                symbol=" %"
                />
  
                <PortfolioPieChart name="Industrier"
                portfolio={convertSectorExposure(industryExposure)}
                symbol=" %"
                />
  
                </div>
            </div>
        </div>
    )
}