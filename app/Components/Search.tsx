"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useSearch } from "../context/SearchContext";

export const SearchBar = () => {
  const { setSearchQuery } = useSearch();
  const [localQuery, setLocalQuery] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      setSearchQuery(localQuery.toUpperCase()); // Oppdaterer global søkeverdi
      console.log("Input for ticker:", localQuery.toUpperCase());
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(event.target.value); // Oppdaterer bare den lokale tilstanden
  };

  return (
    <div>
      <Input
        value={localQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter a ticker..."
      />
    </div>
  );
};
