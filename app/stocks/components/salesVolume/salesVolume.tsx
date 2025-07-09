import { useEffect, useState } from "react"
import { get_companyTimeSeries } from "@/app/Services/yahooFinance/ApiSpecificCompany"
import { useSearch } from "@/app/context/SearchContext"

export const SalesVolume = () => {
    const { searchQuery } = useSearch();
    const [log, setLog] = useState<string[]>([]);
    const [allTimestamps, setAllTimestamps] = useState<string[]>([]);
    const [index, setIndex] = useState(0);
    const [dataStore, setDataStore] = useState<any>(null);
    const [previousPrice, setPreviousPrice] = useState<number | null>(null);

    useEffect(() => {
        if (!searchQuery) return;

        let intervalId: NodeJS.Timeout;

        const init = async () => {
            try {
                const data = await get_companyTimeSeries(searchQuery);
                const timeSeries = data["Time Series (5min)"];

                if (!timeSeries) {
                    // console.warn("Fant ikke tidsserie");
                    return;
                }

                const sortedTimestamps = Object.keys(timeSeries).sort(); // eldste først
                setAllTimestamps(sortedTimestamps);
                setDataStore(timeSeries);
                setIndex(0); // start på begynnelsen

            } catch (err) {
                console.error("Feil under init:", err);
            }
        };

        init();

        return () => clearInterval(intervalId); // sikker opprydding

    }, [searchQuery]);

    useEffect(() => {
        if (!dataStore || allTimestamps.length === 0) return;

        const intervalId = setInterval(() => {
            if (index >= allTimestamps.length) {
                setIndex(0);
                console.log("STARTET PÅ NYTT");
            }

            const currentTimestamp = allTimestamps[index];
            const currentData = dataStore[currentTimestamp];

            const timeOnly = currentTimestamp.split(" ")[1];
            const logEntry = `${timeOnly}: Volum ${currentData["5. volume"]} Price ${currentData["4. close"]}`;

            const currentPrice = parseFloat(currentData["4. close"]);
            const priceDirection = previousPrice === null
                ? "neutral"
                : currentPrice > previousPrice
                ? "up"
                : currentPrice < previousPrice
                ? "down"
                : "neutral";

            setPreviousPrice(priceDirection);

            setLog(prev => [logEntry, ...prev]);
            setIndex(prev => prev + 1);

        }, 5_000);

        return () => clearInterval(intervalId); // opprydding på unmount

    }, [dataStore, allTimestamps, index]);

return (
    <div className="w-full h-[400px] bg-black border-2 border-stone-700 p-4 overflow-y-auto text-white text-sm shadow-lg">
        <h2 className="font-bold mb-2 border-b border-stone-400">Handelsvolum</h2>
            <ul className="w-full">
                {log.map((entry, idx) => {
                    const [time, ...rest] = entry.split(": Volum ");
                    const [volumeStr, priceStr] = rest.join(": Volum ").split(" Price ");
                    const price = parseFloat(priceStr);
                    
                    const prev = idx < log.length - 1 ? parseFloat(log[idx + 1]?.split(" Price ")[1]) : price;
                    const direction = price > prev ? "up" : price < prev ? "down" : "neutral";
                    const priceColor =
                        direction === "up"
                          ? "text-emerald-400"
                          : direction === "down"
                          ? "text-red-400"
                          : "text-white";

                        return (
                            <li
                                key={idx}
                                className="w-full flex items-center justify-between border-b border-stone-600 px-3 py-2 gap-4 text-sm"
                            >
                                <span className="text-left text-stone-300 font-mono w-1/4">{time}</span>
                                <span className="text-right text-sky-400 font-mono w-1/3">Volum {volumeStr}</span>
                                <span className={`text-right ${priceColor} font-mono w-1/3`}>Pris {priceStr}</span>
                            </li>
                            );
                        }
                    )
                }
            </ul>
        </div>
    );
}
