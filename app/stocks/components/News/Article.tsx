import { formatDate } from "./HelperFunctions";


export const Article = ({ text, date, onClick }: { text: string; date: string; onClick: (date: string) => void }) => {
    const formattedDate = formatDate(date); // Formatere datoen før bruk
    
    return (
        <div className="border-b p-4 " onClick={() => onClick(date)}>
            {/* Vis den formaterte datoen direkte */}
            <div className="text-gray-500 text-sm">{formattedDate}</div>
            <div className="text-lg font-semibold">{text}</div>
        </div>
    );
};
