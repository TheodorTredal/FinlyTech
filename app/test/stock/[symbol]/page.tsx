"use client";

// Dette er bare en testfil, slett denne når stock siden sine komponenter er dynamiske og henter data fra backend :)

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

// Registrer komponentene i Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StockChartPage = () => {
  const params = useParams();
  const symbol = params?.symbol;
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!symbol) return;

    fetch(`http://127.0.0.1:8000/stock/chart/${symbol}/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }

        setChartData({
          labels: data.chart.map((entry) => entry.date), // Datoer som X-akse
          datasets: [
            {
              label: `Aksjekurs (${symbol})`,
              data: data.chart.map((entry) => entry.close), // Lukkekurs
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 2,
              pointRadius: 3,
              fill: true
            }
          ]
        });
      })
      .catch((err) => {
        console.error("Feil:", err);
        setError(err.message);
      });
  }, [symbol]);

  if (error) return <p>Feil: {error}</p>;
  if (!chartData) return <p>Henter chart data...</p>;

  return (
    <div style={{ width: "100%", maxWidth: "800px", height: "400px" }}>
      <h1>Aksjekurs for {symbol?.toUpperCase()}</h1>
      <div style={{ position: "relative", height: "100%", width: "100%" }}>
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false, // Sørg for at høyden respekteres
          }}
        />
      </div>
    </div>
  );
  
};

export default StockChartPage;
