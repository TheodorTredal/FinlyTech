"use client";
import { useState } from "react";
import { ApplyFilterButton } from "./components/applyFilterButton"
import { FilterButton } from "./components/filterButton"
import { ShowScreenedCompnanies } from "./components/showCompaniesFilter";

export const Filter = () => {

    const [companies, setCompanies] = useState<string[]>([]);

    return (
      <div className="w-screen min-h-screen bg-black text-white p-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 bg-stone-800 p-4 rounded-xl">
          <FilterButton text="P/E" />
          {/* <FilterButton text="P/S" />
          <FilterButton text="ROE" />
          <FilterButton text="EV/EBIT" />
          <FilterButton text="EPS" />
          <FilterButton text="PEG" />
          <FilterButton text="Debt/Equity" />
          <FilterButton text="Market Cap" /> */}
        </div>
        
        <div className="py-4">
            <ShowScreenedCompnanies></ShowScreenedCompnanies>
        </div>

        {/* <ApplyFilterButton /> */}
      </div>
    );
  };