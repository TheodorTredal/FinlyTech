import { portfolioFolderInterface } from "../interfaces/stockPortfolioInterface";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"



export const SelectPortfolio = ({ portfolioList, setPortFolio }: { portfolioList: portfolioFolderInterface[]; setPortFolio: (val: string) => void; }) => {
    return (
      <Select onValueChange={setPortFolio}>
        <SelectTrigger className="w-full text-gray-400">
          <SelectValue placeholder="Velg en portefølje" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Porteføljer</SelectLabel>
            {portfolioList.map((portfolio) => (
              <SelectItem key={portfolio.name} value={portfolio.name}>
                {portfolio.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  };