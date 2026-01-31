import { PortfolioInterface } from "../../interfaces/stockPortfolioInterface";
import { useEffect, useState } from "react";
import { 
  get_latest_asset_price, 
  getUserPortfolio,
  get_asset_historic_chart_data,
 } from "../API/portfolioAPI";

export const useLatestStockData = (
  symbol: string,
  avgPrice: number,
  quantity: number
) => {

  const [latestPrice, setLatestPrice] = useState<number | null>(null);

  // DETTE LEGGES TIL NÅR VI HAR KJØPT API TILGANG 
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const fetchLatestPrice = async () => {
      const response = await get_latest_asset_price(symbol);
      console.log(response);
      if (response) {
        setLatestPrice(response.price);
      }
    }

    fetchLatestPrice();
    intervalId = setInterval(fetchLatestPrice, 30_000); // 30 sek

    return () => clearInterval(intervalId);
  }, [])

  // Kalkuerer hvor mye prosent enkelt aksjen har økt.
  const returnPercent =
  latestPrice !== null && avgPrice > 0 
  ? ((latestPrice - avgPrice) / avgPrice) * 100
  : null;
 

  const totalValue =
    latestPrice !== null ? latestPrice * quantity : null;

    return {
      latestPrice,
      returnPercent,
      totalValue
    }
}


// En simplifisert versjon av useLatestStockData, denne bruker bare prisen
export const useLatestStockPrice = (symbol: string) => {
    const [latestPrice, setLatestPrice] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        const fetchLatestPrice = async () => {
            try {
                const response = await get_latest_asset_price(symbol);
                setLatestPrice(response.price);
            } catch (err) {
                console.error(`Failed to fetch price for ${symbol}`, err);
                setLatestPrice(null);
            } finally {
                setIsLoading(false);
            } 
        }

        fetchLatestPrice();
        intervalId = setInterval(fetchLatestPrice, 30_000);

        return () => clearInterval(intervalId);
    }, [symbol]) 
    return { latestPrice, isLoading }
}

export interface portfolioChartPointInterface {
  date: string;
  totalValue: number;
};

// Må egentlig legge mer assetprices i databasen, trenger historik.. Akkurat nå er det bare 1 pris per aksje
export const useCalculatePortfolioChart = ({portfolio_title, time_period}: {portfolio_title: string, time_period: string}) => {
    const [portfolioList, setPortfolioList] = useState<PortfolioInterface[]>([]);
    const [portfolioChart, setPortfolioChart] = useState<portfolioChartPointInterface[]>([]);


  // Get the user's stock in a single portfolio
  useEffect(() => {
    const fetchPortfolios = async () => {
      const response = await getUserPortfolio();
      setPortfolioList(response);
      console.log(response);
    }
    
    fetchPortfolios();
  }, [])


  // MÅ kalkulere totalverdi på porteføljen
  // Sjekke om portefølje navn er lik som portfolio_title
  // 1. bare få opp totalverdi uten å tenke på når aksjen ble kjøpt.
  // 2. Vi må nok legge til litt ekstra data i porteføljen for når asset ble kjøpt / solgt typ kalender aktig
  // OBS!!! KAN FOREKOMME BUGS HVIS BEGGE ASSETTENE IKKE HAR SAMME DATOER (AKA LIKE MYE DATA!!!)
  useEffect(() => {
    if (portfolioList.length === 0) {
      return;
    }

    const fetchData = async () => {
      const matchingPortfolio = portfolioList.find(
        (p) => p.title === portfolio_title
      );

      if (!matchingPortfolio) {
        return;
      }

      const charts = await Promise.all(
        matchingPortfolio.holdings.map((holding) =>
          get_asset_historic_chart_data(
            holding.asset.symbol,
            time_period
          )
        )
      );

      const portfolioValueByDate: Record<string, number> = {};

      charts.forEach((assetChart, index) => {
        const quantity = Number(matchingPortfolio.holdings[index].quantity);
      
        assetChart.chart.forEach((point: any) => {
          if (!portfolioValueByDate[point.date]) {
            portfolioValueByDate[point.date] = 0;
          }
          portfolioValueByDate[point.date] += point.close * quantity;
        });
      });
    
      const portfolioChart = Object.entries(portfolioValueByDate)
        .map(([date, totalValue]) => ({ date, totalValue }))
        .sort((a, b) => a.date.localeCompare(b.date));

    // console.log("Portfolio chart:", portfolioChart);
    setPortfolioChart(portfolioChart);
  };

  fetchData();
}, [portfolioList, portfolio_title, time_period]);

    return portfolioChart;

}