import { useEffect } from "react";
import { parseArticleDate } from "./HelperFunctions";

interface NewsArticle {
    date: string;
    Summary: string;
}

export const DisplayNewsFromDate = ({ news }: { news: NewsArticle[] | null }) => {
    useEffect(() => {
        console.log("NEWSFROMDATE: ", news);
    }, [news]);

    if (!Array.isArray(news)) {
        return (
            <div className="w-full h-full border border-red-700 p-4">
                <h3 className="text-lg font-semibold mb-2">Nyheter fra valgt dato:</h3>
                <p className="text-gray-500">Ingen gyldige nyheter tilgjengelig.</p>
            </div>
        );
    }

    return (
        <div className="w-full h-full p-4 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-2">Nyheter fra valgt dato:</h3>

            {news.length > 0 ? (
                <ul className="space-y-2">
                    {news.map((article, index) => (
                        <li key={index} className="text-gray-500 p-2 border-b border-gray-300">
                            <p className="text-sm text-zinc-400">{parseArticleDate(article.date)}</p>
                            <p className="font-medium">{article.Summary}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">Ingen nyheter tilgjengelig.</p>
            )}
        </div>
    );
};
