"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { HoldingInterface } from "../interfaces/stockPortfolioInterface";
import { get_checkCompanyTicker } from "@/app/Services/yahooFinance/ApiSpecificCompany";
import { SelectPortfolio } from "./portfolioSelector";

import { createPortfolio } from "./API/portfolioAPI";

import { PortfolioInterface } from "../interfaces/stockPortfolioInterface";
   
interface AddToPortfolioProps {
    setcloseWindow: (state: boolean) => void;
    setPortfolioList: (prev: any) => void;
    portfolioList: PortfolioInterface[];
  }




export const AddToPortfolio = ({ setcloseWindow, setPortfolioList, portfolioList }: AddToPortfolioProps) => {
    const [ticker, setTicker] = useState<string>("");
    const [isValidTicker, setIsValidTicker] = useState<boolean | null>(null);
    const [isValidPrice, setIsValidPrice] = useState<boolean | null>(null);
    const [isValidVolum, setIsValidVolum] = useState<boolean | null>(null);


    const [price, setPrice] = useState<number | null>(null);
    const [volum, setVolum] = useState<number | null>(null);
    const [note, setNote] = useState<string | null>(null);
    const [selectedPortfolio, setSelectedPortfolio] = useState<string | null>(null);

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

        if (selectedPortfolio === null ) {
            return
        }

        const addHolding = {
            symbol: ticker,
            avg_price: price,
            quantity: volum
        }
        
        setPortfolioList((prev: PortfolioInterface[]) =>
            prev.map((folder) =>
              folder.title === selectedPortfolio
                ? { ...folder, stocks: [...folder.holdings, addHolding] }
                : folder
            )
          );

          
        setTicker("");
        setPrice(null);
        setVolum(null);
        setNote(null);
        setIsValidTicker(null);
        setSelectedPortfolio(null);
    };

    return (
        <div className="w-full max-w-xl mx-auto mt-6 p-6 bg-[#1e1e1e] rounded-lg border border-gray-700 space-y-5">
            <p>Legg til ny aksje</p>
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

            <div>
                {/* <SelectPortfolio portfolioList={portfolioList} setPortFolio={setSelectedPortfolio}></SelectPortfolio> */}
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
