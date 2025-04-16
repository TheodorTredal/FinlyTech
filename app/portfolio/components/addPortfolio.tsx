import { Input } from "@/components/ui/input"
import { portfolioFolderInterface } from "../interfaces/stockPortfolioInterface"

export const AddPortfolio = ({ portfolio }: {portfolio: portfolioFolderInterface[]}) => {

    return (
        <Input
        placeholder="Ny portefølje..."
        >
        </Input>
    )
}