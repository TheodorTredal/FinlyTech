import Portfolio from "./Portfolio";
import { PortfolioProvider } from "../context/portfolioContext";


const Page = () => {
    return (
        <div>
            <PortfolioProvider>
                <Portfolio></Portfolio>
            </PortfolioProvider>
        </div>
    )
}

export default Page;