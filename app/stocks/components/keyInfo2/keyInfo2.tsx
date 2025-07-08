import { useEffect, useState } from "react"
import { KeyInfoSettings, KeyInfoKey, keyInfoOptions } from "./keyInfoSettings";
import { fetchCompanyOverviewData } from "@/app/Services/yahooFinance/ApiSpecificCompany";
import { useSearch } from "@/app/context/SearchContext";

interface CompanyKeyInfoProps {
    className?: string;
    setSelectedOptions?: KeyInfoKey[];
    selectedOpttions?: KeyInfoKey[];
    setCompanyInformation?: any;
    companyInformation?: any;
}


export const CompanyKeyInfo = ( {className = ""}: CompanyKeyInfoProps ) => {

    const [selectedOptions, setSelectedOptions] = useState<KeyInfoKey[]>([]);
    const [companyInformation, setCompanyInformation] = useState<any>([
    ]); // fiks "any" senere
    const { searchQuery } = useSearch()


    useEffect(() => {

        if (!searchQuery) return;

        fetchCompanyOverviewData(searchQuery)
            .then(setCompanyInformation)
            .catch((err) => {
                console.log("Failed", err);
            });
    }, [searchQuery]);

    console.log(companyInformation)

    return (
        <div className={`w-80 h-[300px] space-y-4 bg-black ${className}`}>
            <div className="flex justify-between border-b border-stone-400">
                <h1 className="text-xl font-semibold">Nøkkeltall</h1>
                <KeyInfoSettings selected={selectedOptions} setSelected={setSelectedOptions} />
            </div> 
    
          {selectedOptions.length === 0 && (
            <p className="text-muted-foreground text-sm">Ingen nøkkeltall valgt</p>
          )}
    
          {companyInformation && (
            <div className="space-y-2 overflow-y-auto max-h-[400px] pr-2">
              {selectedOptions.map((key) => {
                const option = keyInfoOptions.find((item) => item.key === key)
                const label = option?.label || key
                const value = companyInformation[key]
    
                return (
                  <div key={key} className="flex justify-between text-sm border-b pb-1">
                    <span className="font-medium">{label}</span>
                    <span>{value ?? "–"}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )
    }