"use client";

"use client";
import { createContext, useContext, useState, ReactNode } from 'react';

// Type for Context
interface PortfolioContextType {
  currentPortfolio: string;
  setCurrentPortfolio: (title: string) => void;
}

// Oppretter Context med default-verdier
const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

// Provider som wraps appen eller blueprint-komponentene
export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [currentPortfolio, setCurrentPortfolio] = useState<string>('test');

  return (
    <PortfolioContext.Provider value={{ currentPortfolio, setCurrentPortfolio }}>
      {children}
    </PortfolioContext.Provider>
  );
};

// Custom Hook
export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
