import { PortfolioEntry } from "./portfolioEntry";
import { portfolioFolderInterface } from "../interfaces/stockPortfolioInterface";


export const PortfolioFolder = ({ folder }: { folder: portfolioFolderInterface }) => {
    return (
      <div>
        <h2 className="text-xl font-bold">{folder.name}</h2>
        <div className="flex flex-col gap-2">
          {folder.stocks.map((stock, j) => (
            <PortfolioEntry key={j} portfolioEntry={stock} />
          ))}
        </div>
      </div>
    );
  };