import { ShowBasicStockInformation } from "./Components/ShowBasicStockInformation";
import LineChart from "./Components/Charts/SimpleLineChart";
import PieChart from "./Components/Charts/SimplePieChart";

// test data
import { stock_prices } from "./testdata/BasicPrices";
import { NvidiaTestData } from "./testdata/nvidiatestdata";
import { osebx_stock_prices } from "./testdata/BasicPrisesOSEBX";


// app/_app.tsx
import "./globals.css";
// app/_app.tsx
import "./globals.css";
export default function App() {
  return (
    <div className="justify-start w-full">
      {/* Første rad med LineChart og ShowBasicStockInformation */}
      <div className="flex space-x-2 p-6 justify-end w-full">
        <LineChart data={NvidiaTestData} name={"Nvidia"}/>
        <LineChart data={NvidiaTestData} name={"Din portefølje"}/>
        <ShowBasicStockInformation stocksPrices={stock_prices}></ShowBasicStockInformation>
      </div>

      {/* Andre rad med PieChart og LineChart */}
      <div className="flex space-x-2 p-6 justify-end w-full">
        <PieChart/>
        <LineChart data={NvidiaTestData} name={"OSEBX"}/>
        <ShowBasicStockInformation stocksPrices={osebx_stock_prices}></ShowBasicStockInformation>
      </div>
    </div>
  );
}

