"use client";
import { createContext, useContext, useState, ReactNode } from 'react';

// Definerer type for søkeverdi
interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

// Lager en tom kontekst med default-verdier
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Context Provider for å gi tilgang til søkeverdien
export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState<string>('NVDA');

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom Hook for å bruke søkeverdien
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
