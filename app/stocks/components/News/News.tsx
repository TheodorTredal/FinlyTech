
import React from "react";
import { useEffect, useState } from "react";
import NewsStockGraph from "./NewsStockGrah";

import { fetchCompanyNews } from "@/app/Services/yahooFinance/ApiSpecificCompany"
import { useSearch } from "@/app/context/SearchContext";



const formatDate = (dateString: string) => {
    const year = parseInt(dateString.substring(0, 4), 10);
    const month = parseInt(dateString.substring(4, 6), 10) - 1;  // Må trekke fra 1 fordi JavaScript-måneder starter fra 0
    const day = parseInt(dateString.substring(6, 8), 10);


    // Liste over månedsnavnene
    const months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];

    const formattedDate = `${day} ${months[month]} ${year}`;
    
    return formattedDate; // Format: YYYY MM DD
};

const Article = ({ text, date, onClick }: { text: string; date: string; onClick: (date: string) => void }) => {
    const formattedDate = formatDate(date); // Formatere datoen før bruk
    
    return (
        <div className="border-b p-4 " onClick={() => onClick(date)}>
            {/* Vis den formaterte datoen direkte */}
            <div className="text-gray-500 text-sm">{formattedDate}</div>
            <div className="text-lg font-semibold">{text}</div>
        </div>
    );
};

const NewsBox = ({ articles, setArticleDate }: { articles: any[] | null; setArticleDate: (date: string) => void }) => {
    
    const handleClick = (date: string) => {
        setArticleDate(date);
    }
    
    return (
        <div className="w-1/2 h-full p-4 overflow-y-scroll" style={{ height: '80vh' }}>
            <h2 className="text-xl font-bold mb-2">Nyheter</h2>
            {articles && articles.length > 0 ? (
                articles.map((article, index) => (
                    <Article key={index} text={article.Summary} date={article.date} onClick={handleClick} />
                ))
            ) : (
                <p>Ingen nyheter tilgjengelig</p>
            )}
        </div>
    );
};


export const StockNews = () => {

    const [companyNews, SetCompanyNews] = useState<any>(null);
    const [articleDate, setArticleDate] = useState<string>("");

    const { searchQuery } = useSearch();

    // Fetching API data
    useEffect(() => {
        if (!searchQuery) return;
        const getNews = async () => {
            try {
                const newsData = await fetchCompanyNews(searchQuery);
                SetCompanyNews(newsData);
            } catch(error) {
                console.error("Error fetching the news");
            }
        }
        getNews();
    }, [searchQuery]);

    return (
        <div className="flex">
            <NewsBox articles={companyNews} setArticleDate={setArticleDate}></NewsBox>
            <NewsStockGraph articleDate={articleDate}></NewsStockGraph>
        </div>
    )
}