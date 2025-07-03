import { useState, useEffect } from "react";
import { fetchBasicFinancials } from "@/app/Services/yahooFinance/ApiSpecificCompany"; // Importer API-funksjonen
import { useSearch } from "@/app/context/SearchContext";
import { SkeletonKeyInfo } from "./SkeletonKeyInfo";

interface FinancialData {
    peRatio: number | null;
    marketCap: number | null;
    eps: number | null;
    roe: number | null;
    roa: number | null;
    debtToEquity: number | null;
    dividendYield: number | null;
}

const FinancialStats = () => {
    const [financialInformation, setFinancialInformation] = useState<FinancialData | null>(null);
    const [error, setError] = useState<string | null>(null);

    const { searchQuery } = useSearch()

    useEffect(() => {

        if (!searchQuery) return;
        setError(null);

        fetchBasicFinancials(searchQuery)
            .then(setFinancialInformation)
            .catch((err) => {
                console.log("Failed", err);
                setError(err.message);
            });
    }, [searchQuery]);

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    if (!financialInformation) {
        return <SkeletonKeyInfo></SkeletonKeyInfo>;
    }

    return (
        <div className="justify-around p-6 bg-sidebar shadow-lg rounded-lg w-1/3 h-[300px]">
            <h2 className="font-bold text-lg">Key Stats</h2>

            <div className="flex justify-around mt-4">
                <div className="text-left">
                    <p>P/E Ratio:</p>
                    <p>EPS:</p>
                    <p>ROE:</p>
                    <p>ROA:</p>
                    <p>Debt to Equity:</p>
                    <p>Dividend Yield:</p>
                    <p>Market Cap:</p>
                </div>
                <div className="text-right">
                    <p>{financialInformation.peRatio ?? "N/A"}</p>
                    <p>{financialInformation.eps ?? "N/A"}</p>
                    <p>{financialInformation.roe ? (financialInformation.roe * 100).toFixed(2) + "%" : "N/A"}</p>
                    <p>{financialInformation.roa ? (financialInformation.roa * 100).toFixed(2) + "%" : "N/A"}</p>
                    <p>{financialInformation.debtToEquity ?? "N/A"}</p>
                    <p>{financialInformation.dividendYield ? (financialInformation.dividendYield * 100).toFixed(2) + "%" : "N/A"}</p>
                    <p>{financialInformation.marketCap ? `$${(financialInformation.marketCap / 1e9).toFixed(2)}B` : "N/A"}</p>
                </div>
            </div>
        </div>
    );
};

export default FinancialStats;
