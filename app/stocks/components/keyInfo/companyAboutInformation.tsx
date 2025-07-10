import { fetchCompanyOverviewData } from "@/app/Services/yahooFinance/ApiSpecificCompany" 
import { useSearch } from "@/app/context/SearchContext"
import { useEffect, useState } from "react";


type CompanyOverview = {
    Description: string;
};

export const CompanyAboutInformation = () => {

    const {searchQuery} = useSearch();
    const [companyData, setCompanyData] = useState<CompanyOverview | null>(null);

    useEffect(() => {

        if (!searchQuery) {
            return;
        }

        const getData = async () => {
            fetchCompanyOverviewData(searchQuery)
            .then(setCompanyData)
            .catch((err) => {
                console.log("Failed", err);
            })

        }

        getData();

    }, [searchQuery])

    useEffect(() => {
        console.log(companyData);

    }, [searchQuery])

    return (
        <div className="w-96 h-[13vw] bg-black border-2 border-stone-500 p-4 font-mono text-stone-300 text-sm leading-relaxed overflow-y-auto shadow-md rounded-lg"
            style={{width: 700, height: 200}}
        >
          <h2 className="text-lg font-bold mb-2 text-white border-b border-stone-700 pb-1">
            Om selskapet
          </h2>
          {companyData?.Description || <p className="text-stone-500">Ingen beskrivelse tilgjengelig.</p>}
        </div>
      );

}