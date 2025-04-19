import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip, Legend } from "recharts";
import { portfolioFolderInterface } from "../../interfaces/stockPortfolioInterface";
import { Card } from "@/components/ui/card";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c", "#d0ed57"];

export const PortfolioPieChart = ({ portfolio }: { portfolio: portfolioFolderInterface }) => {
  if (!portfolio || !portfolio.stocks || portfolio.stocks.length === 0) {
    return (
      <Card className="p-4 bg-muted text-muted-foreground rounded-xl shadow-inner">
        <p>Ingen data tilgjengelig</p>
      </Card>
    );
  }

  const pieData = portfolio.stocks.map((stock) => ({
    name: stock.ticker,
    value: stock.price * stock.volum,
  }));

  return (
    <Card className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-[500px] h-[400px] flex flex-col">
      {/* Overskrift på toppen */}
      <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-4">
        Markedsverdi
      </h3>
  
      {/* Pie Chart Container */}
      <div className="flex-1 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: "#f9fafb", borderColor: "#e5e7eb" }}
              labelStyle={{ fontWeight: "bold" }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
  
};
