import { Cell, Pie, PieChart, ResponsiveContainer, Legend } from "recharts";
import { get_latest_asset_price, getUserPortfolio } from "../API/portfolioAPI";
import { useEffect, useState } from "react";
import { PortfolioInterface } from "../../interfaces/stockPortfolioInterface";
import { PieChartSettings } from "./portfolioPieChartSettings";


// Farge 1
const COLORS = [
  "#4F46E5", // indigo
  "#06B6D4", // cyan
  "#10B981", // emerald
  "#F59E0B", // amber
  "#EF4444", // red
  "#8B5CF6", // violet
];

// Farge to
// const COLORS = [
//   "#0088FE",
//   "#00C49F",
//   "#FFBB28",
//   "#FF8042",
//   "#A855F7",
//   "#EC4899",
// ];



// Pastel
// const COLORS = [
//   "#A5B4FC",
//   "#67E8F9",
//   "#6EE7B7",
//   "#FCD34D",
//   "#FCA5A5",
//   "#D8B4FE",
// ];


/**
 * 
 * Vi må gruppere Assets som er eksponert mot samme sektor
 * Må finne ut hvilken sektor som har størst markedsverdi, mener det gir mening
 * 
 * Kan også Ha et vertikalt bar chart som viser det samme.
 */

/**
 * Vi må kalkulere hvor mye hver "Sector" er, vi trenger:
 *  Kvantitet * sist kjente pris per aksje
 *  summere hver aksje sin sektor eksponering
 *  vise i PieChart
 */

/**
 * For å få PieChart dynamisk
 * 1. Må flytte ut useEffekten (den nederste)
 * 2. UseEffecten må bli kallt når man klikker på riktig radio knapp
 */


interface HoldingWithValueInterface {
    sector: string;
    value: number;
}

interface PortfolioPieChartInterface {
    name: string;
    value: number;
}

// Enkel portfolio pie chart som viser hvor stor aksjene er i forhold til hverandre.
export const PortfolioPieChart = ({portfolioTitle}: {portfolioTitle: string} ) => {

    const [portfolioData, setPortfolioData] = useState<PortfolioInterface[]>([]);
    const [pieData, setPieData] = useState<PortfolioPieChartInterface[]>([]);
    const [RadioValue, setRadioValue] = useState<string>("aksjer");

    useEffect(() => {

        const fetchPortfolios = async () => {
          const response = await getUserPortfolio();
          setPortfolioData(response);
        }
        fetchPortfolios();
    }, [])


    useEffect(() => {
      if (portfolioData.length === 0) return;

      const fetchPieData = async () => {
        const matchingPortfolio = portfolioData.find(
          (p) => p.title === portfolioTitle
        );

        if (!matchingPortfolio) return;

        switch (RadioValue) {
          case "aksjer": {
            const pieData = await Promise.all(
              matchingPortfolio.holdings.map(async (holding) => {
                const res = await get_latest_asset_price(holding.asset.symbol);

                return {
                  name: holding.asset.symbol,
                  value: Number(res.price) * holding.quantity,
                };
              })
            );

            setPieData(pieData);
            break;
          }

          case "sektor":
            console.log("Sektor");
            const sectorMap: Record<string, number> = {}

            for (const holding of matchingPortfolio.holdings) {
                const res = await get_latest_asset_price(holding.asset.symbol);
            
                const sector = holding.asset.sector || "Unknown";
                const value = Number(res.price) * holding.quantity;

                sectorMap[sector] = (sectorMap[sector] ?? 0 + value);
            }

            setPieData(
                Object.entries(sectorMap).map(([name, value]) => ({
                    name,
                    value,
                }))
            )
            break;

          case "industri":
            console.log("Industri");
            const industryMap: Record<string, number> = {}

            for (const holding of matchingPortfolio.holdings) {
                const res = await get_latest_asset_price(holding.asset.industry);

                const industry = holding.asset.industry || "Unknown";
                const value = Number(res.price) * holding.quantity;

                industryMap[industry] = (industryMap[industry ?? 0 + value]);
            }

            setPieData(
                Object.entries(industryMap).map(([name, value]) => ({
                    name,
                    value,
                }))
            )
            break;
        }
      };

    fetchPieData();

    }, [portfolioData, portfolioTitle, RadioValue]);



    return (
      <div className="w-1/3 rounded-xl border shadow-sm">

        {/* HEADER */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-sm font-semibold text-gray-700">
            {portfolioTitle}
          </h2>
            <PieChartSettings value={RadioValue} onChange={setRadioValue}></PieChartSettings>
        </div>

        {/* CONTENT */}
        <div className="flex justify-center py-4 h-96">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label
                    >
                    {pieData.map((_, index) => (
                        <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                  </Pie>
                  <Legend/>
                </PieChart>
            </ResponsiveContainer>
        </div>

      </div>
    );
}
