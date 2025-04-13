import { stockPortfolioInterface } from "../interfaces/stockPortfolioInterface";

export const PortfolioEntry = ({ portfolioEntry }: { portfolioEntry: stockPortfolioInterface }) => {

    return (
        <div className="w-full h-16 bg-gradient-to-r from-slate-800 to-gray-900 text-white border border-sidebar rounded-md shadow-md px-6 flex items-center">
            <div className="flex space-x-8">
                <p>{portfolioEntry.ticker}</p>
                <p>
                    <div>Pris</div>
                    {portfolioEntry.price}                        
                </p>
                <p>
                    <div>Volum</div>    
                    {portfolioEntry.volum}
                </p>
                <p>
                    <div>Økning</div>
                    {portfolioEntry.prosentØkning} %
                </p>
                <p>
                    <div>Nåværende pris</div>
                    {portfolioEntry.currentPrice} USD                        
                </p>
                <p>
                    <div>Verdi</div>
                    {portfolioEntry.currentPrice * portfolioEntry.volum}
                </p>
            </div>
        </div>
    );
};
