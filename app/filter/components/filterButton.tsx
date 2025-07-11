"use client";
import { Input } from "@/components/ui/input"
import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button";
import React from "react";



const Filter = () => {
    const [clicked, setClicked] = useState<number>(0);
  
    const handleOnClick = (id: number) => {
      setClicked(id);
    };
  
    const isActive = (id: number) =>
      clicked === id
        ? "bg-white text-black border-stone-700 font-bold"
        : "bg-black text-white opacity-80 hover:opacity-100";
  
    return (
      <div className="w-[20vw] border-2 border-stone-500 rounded-xl p-4 bg-stone-900 shadow-xl flex flex-col justify-between h-fit space-y-4">
        {/* Filter type buttons */}
        <div className="flex flex-col space-y-2">
          <Button
            onClick={() => handleOnClick(0)}
            variant="outline"
            size="sm"
            className={`font-mono border ${isActive(0)}`}
          >
            Less than
          </Button>
          <Button
            onClick={() => handleOnClick(1)}
            variant="outline"
            size="sm"
            className={`font-mono border ${isActive(1)}`}
          >
            Between
          </Button>
          <Button
            onClick={() => handleOnClick(2)}
            variant="outline"
            size="sm"
            className={`font-mono border ${isActive(2)}`}
          >
            Greater than
          </Button>
        </div>
  
        {/* Input fields */}
        {clicked !== 1 ? (
          <Input
            placeholder="Enter value"
            className="placeholder:font-mono border-stone-500 bg-stone-800 text-white placeholder:text-white/50"
          />
        ) : (
          <div className="flex items-center justify-between space-x-2">
            <Input
              placeholder="Min"
              className="placeholder:font-mono border-stone-500 bg-stone-800 text-white placeholder:text-white/50"
            />
            <span className="text-white font-mono text-lg">–</span>
            <Input
              placeholder="Max"
              className="placeholder:font-mono border-stone-500 bg-stone-800 text-white placeholder:text-white/50"
            />
          </div>
        )}
      </div>
    );
  };


export const FilterButton = () => {

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
        <div ref={containerRef}>
            <div
                className="flex items-center w-[10vw] h-[3vw] bg-stone-900 text-white border-2 border-stone-500 rounded-xl px-2"
                onClick={() => handleOnClick()}
            >
            <span className="whitespace-nowrap font-mono text-sm mr-2">P/E:</span>
            <input
              type="text"
              className="flex-1 bg-transparent text-white placeholder:text-white/60 outline-none"
              placeholder="skriv verdi"
            />
            </div>

          {open && 
            <div className="absolute">
                <Filter />
            </div>
            }
        </div>
    )
}