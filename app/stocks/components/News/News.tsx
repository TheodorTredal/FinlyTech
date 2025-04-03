
import React from "react";
import { useEffect, useState } from "react";
import NewsStockGraph from "./NewsStockGrah";
import { DisplayNewsFromDate } from "./displayNewsOnDate";
import { fetchCompanyNews } from "@/app/Services/yahooFinance/ApiSpecificCompany"
import { useSearch } from "@/app/context/SearchContext";
import { Article } from "./Article";


const NewsBox = ({ articles, setArticleDate }: { articles: any[] | null; setArticleDate: (date: string) => void }) => {
    
    const handleClick = (date: string) => {
        setArticleDate(date);
    }
    
    return (
        <div className="w-1/3 h-full p-4 overflow-y-scroll" style={{ height: '80vh' }}>
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
        <div className="flex flex-row">
            <NewsBox articles={companyNews} setArticleDate={setArticleDate}></NewsBox>

            <NewsStockGraph articleDate={articleDate} articles={companyNews}></NewsStockGraph>
        </div>
    )
}