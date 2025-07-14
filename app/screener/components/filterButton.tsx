"use client";
import { Input } from "@/components/ui/input"
import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button";
import React from "react";
import { get_filteredCompanies } from "@/app/Services/yahooFinance/ApiSpecificCompany";


const Filter = ({ filterType = "PERatio" }: {filterType: string}) => {
    const [clicked, setClicked] = useState<string>("between");
    const [range, setRange] = useState<string>("");
    const [filterNumber1, setfilterNumber1] = useState<number | null>(null);
    const [filterNumber2, setfilterNumber2] = useState<number | null>(null);
    const [testgetCompany, setGetTestCompany] = useState<string[]>([]); // Denne må egentlig sendes inn fra en høyere komponent
  
    const handleOnClick = (clickedrange: string) => {
      setClicked(clickedrange);
    };
  
    const isActive = (clickedrange: string) =>
      clicked === clickedrange
        ? "bg-white text-black border-stone-700 font-bold"
        : "bg-black text-white opacity-80 hover:opacity-100";


        useEffect(() => {
            if (!clicked || filterNumber1 === null) return;
          
            const rangeToUse = clicked;
          
            if (clicked === "between") {
              if (filterNumber2 === null || filterNumber2 <= filterNumber1) return;
            }

            get_filteredCompanies(rangeToUse, filterType, filterNumber1, filterNumber2 || 0)
              .then(setGetTestCompany)
              .catch((err) => {
                console.error("API-feil:", err);
              });
          }, [clicked, filterType, filterNumber1, filterNumber2]);


          useEffect(() => {
            console.log(testgetCompany)
          }, [testgetCompany])




    return (
        <div className="w-[20vw] border-x-2 border-b-2 border-stone-500 rounded-b-xl bg-stone-900 shadow-xl p-4 flex flex-col justify-between h-fit space-y-4">
             <div className="w-[10.05vw] border-t-2 border-stone-500 rounded-tl-xl -mt-4 mb-2 ml-auto -mr-[1.1vw]" />
        {/* Filter type buttons */}
        <div className="flex flex-col space-y-2">
          <Button
            onClick={() => handleOnClick("lessThan")}
            variant="outline"
            size="sm"
            className={`font-mono border ${isActive("lessThan")}`}
          >
            Less than
          </Button>
          <Button
            onClick={() => handleOnClick("between")}
            variant="outline"
            size="sm"
            className={`font-mono border ${isActive("between")}`}
          >
            Between
          </Button>
          <Button
            onClick={() => handleOnClick("moreThan")}
            variant="outline"
            size="sm"
            className={`font-mono border ${isActive("moreThan")}`}
          >
            Greater than
          </Button>
        </div>
  
        {/* Input fields */}
        {clicked !== "between" ? (
            <Input
                type="number"
                placeholder="Enter value"
                onChange={(e) => setfilterNumber1(Number(e.target.value))}
                className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder:font-mono border-stone-500 bg-stone-800 text-white placeholder:text-white/50"
            />
        ) : (
          <div className="flex items-center justify-between space-x-2">
            <Input
              placeholder="Min"
              className="placeholder:font-mono border-stone-500 bg-stone-800 text-white placeholder:text-white/50"
              onChange={(e) => setfilterNumber1(Number(e.target.value))}
            />
            <span className="text-white font-mono text-lg">–</span>
            <Input
              placeholder="Max"
              className="placeholder:font-mono border-stone-500 bg-stone-800 text-white placeholder:text-white/50"
              onChange={(e) => setfilterNumber2(Number(e.target.value))}
            />
          </div>
        )}
      </div>
    );
  };


export const FilterButton = ({ text }: {text: string}) => {

    const [open, setIsOpen] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleOnClick = () => {
        setIsOpen(!open);
    }


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);   
            }
        }
        
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [open])


    return (
        <div className="" ref={containerRef}>
          
            <div
                className={`flex items-center w-[10vw] h-[3vw] bg-stone-900 text-white border-2 border-stone-500 px-2
                    ${open ? 'rounded-t-xl border-b-0' :'rounded-xl ' }`}
                onClick={() => handleOnClick()}
            >
            <span className="whitespace-nowrap font-mono overflow-hidden text-sm mr-2">{text ?? ""}</span>
            <input
              type="text"
              className="flex-1 bg-transparent text-white placeholder:text-white/60 outline-none overflow-x-hidden"
              placeholder="skriv verdi"
            />
            </div>

          {open && 
            <div className="absolute">
                <Filter filterType="PERatio" />
            </div>
            }
        </div>
    )
}