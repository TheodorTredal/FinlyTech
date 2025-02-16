import { ShowBasicStockInformation } from "./Components/ShowBasicStockInformation";
import LineChart from "./Components/Charts/SimpleLineChart";
import PieChart from "./Components/Charts/SimplePieChart";

// test data
import { stock_prices } from "./testdata/BasicPrices";
import { NvidiaTestData } from "./testdata/nvidiatestdata";
import { osebx_stock_prices } from "./testdata/BasicPrisesOSEBX";
import { PortfolioTestData } from "./testdata/yourPortfolio";
import { ExposureTestData } from "./testdata/Exposure";

// app/_app.tsx
import "./globals.css";

export default function App() {
  return (
    <div className="justify-start w-full p-2"> {/* Bruk space-y-4 for mindre avstand */}
      <div className="flex space-x-2 px-2 pb-2 justify-end w-full"> {/* Redusert padding fra p-6 til p-3 */}
        <LineChart data={NvidiaTestData} name={"Nvidia"} />
        <LineChart data={NvidiaTestData} name={"Din portefølje"} />
        <ShowBasicStockInformation stocksPrices={stock_prices} />
      </div>

      <div className="flex space-x-2 px-2 justify-end w-full"> {/* Redusert padding her også */}
        <PieChart data={PortfolioTestData} name={"Your Portfolio"} />
        <PieChart data={ExposureTestData} name={"Market Exposure"} />
        <ShowBasicStockInformation stocksPrices={osebx_stock_prices} />
      </div>
    </div>
  );
}
