import { Button } from "@/components/ui/button";

// hver item i stock listen
interface StockPrices {
    [key: string]: number;
}

// liste over stock items
interface ShowBasicStockInformationProps {
    stocksPrices: StockPrices;
  }
  export const ShowBasicStockInformation: React.FC<ShowBasicStockInformationProps> = ({ stocksPrices }) => {
    return (
        // <div className="flex flex-col ml-auto w-1/6 h-[400px]  border-white text-white rounded-lg relative p-4">
        <div className="flex flex-col ml-auto w-1/6 h-[400px] border-2 border-grey-400 rounded-lg relative p-2">

            <h2 className="text-xl mb-4 flex items-center">
                Watch List
                <Button className="text-sm text-white ml-auto bg-neutral-950">Add +</Button>
            </h2>
            <ul className="space-y-1 overflow-y-auto max-h-full">
            {Object.entries(stocksPrices).map(([ticker, price], index) => (
                <li
                  key={ticker}
                  className={`flex border-grey-400 p-2 rounded-leg text-white text-sm justify-between ${
                    index % 2 === 0 ? "bg-neutral-700" : "bg-zinc-800"
                  } p-2`}>

                    <span>{ticker}</span>
                    <span>{price.toFixed(2)} USD</span>
                </li>
                ))}
            </ul>
        </div>
    );
};