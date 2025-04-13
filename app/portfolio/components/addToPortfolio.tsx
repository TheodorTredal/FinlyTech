import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { portfolioEntryInterface } from "../interfaces/stockPortfolioInterface";
import { get_checkCompanyTicker } from "@/app/Services/yahooFinance/ApiSpecificCompany";

interface AddToPortfolioProps {
    setcloseWindow: (state: boolean) => void;
    setPortfolioList: (prev: any) => void;
}

export const AddToPortfolio = ({ setcloseWindow, setPortfolioList }: AddToPortfolioProps) => {
    const [ticker, setTicker] = useState<string>("");
    const [isValidTicker, setIsValidTicker] = useState<boolean | null>(null);
    const [isValidPrice, setIsValidPrice] = useState<boolean | null>(null);
    const [isValidVolum, setIsValidVolum] = useState<boolean | null>(null);

    const [price, setPrice] = useState<number | null>(null);
    const [volum, setVolum] = useState<number | null>(null);
    const [note, setNote] = useState<string | null>(null);

    const addToPortfolio = async () => {
        if (!ticker) {
            setIsValidTicker(null);
            return;
        }

        const tickerResult = await get_checkCompanyTicker(ticker);
        setIsValidTicker(tickerResult.isValidTicker);

        if (!tickerResult.isValidTicker) return;

        if (price === null || price < 0) {
            setIsValidPrice(false);
            return;
        } else {
            setIsValidPrice(true);
        }

        if (volum === null || volum < 0) {
            setIsValidVolum(false);
            return;
        } else {
            setIsValidVolum(true);
        }

        const newStock: portfolioEntryInterface = { ticker, price, volum };
        setPortfolioList((prev: any) => [...prev, newStock]);

        setTicker("");
        setPrice(null);
        setVolum(null);
        setNote(null);
        setIsValidTicker(null);
    };

    return (
        <div className="w-full max-w-xl mx-auto mt-6 p-6 bg-[#1e1e1e] rounded-lg border border-gray-700 space-y-5">
            <div className="space-y-1">
                <Input
                    placeholder="Ticker"
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value.toUpperCase())}
                    className="text-white placeholder:text-gray-400"
                />
                {isValidTicker === false && (
                    <p className="text-red-500 text-sm">Ticker finnes ikke</p>
                )}
            </div>

            <div className="space-y-1">
                <Input
                    placeholder="Pris"
                    value={price || ''}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="text-white placeholder:text-gray-400"
                />
                {isValidPrice === false && (
                    <p className="text-red-500 text-sm">Pris må være et positivt tall</p>
                )}
            </div>

            <div className="space-y-1">
                <Input
                    placeholder="Volum"
                    value={volum || ''}
                    onChange={(e) => setVolum(Number(e.target.value))}
                    className="text-white placeholder:text-gray-400"
                />
                {isValidVolum === false && (
                    <p className="text-red-500 text-sm">Volum må være et positivt tall</p>
                )}
            </div>

            <div>
                <Input
                    placeholder="Notat (valgfritt)"
                    value={note || ''}
                    onChange={(e) => setNote(e.target.value)}
                    className="text-white placeholder:text-gray-400"
                />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
                <Button
                    onClick={addToPortfolio}
                    className="bg-green-600 hover:bg-green-700 text-white px-6"
                >
                    Legg til
                </Button>
                <Button
                    variant="outline"
                    onClick={() => setcloseWindow(false)}
                    className="border-gray-500 text-gray-300 hover:bg-gray-700"
                >
                    Lukk
                </Button>
            </div>
        </div>
    );
};
