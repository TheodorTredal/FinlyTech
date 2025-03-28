"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import { useSearch } from "@/app/context/SearchContext";
import SkeletonGraph from "../graph/SkeletonGraph";
import { fetchStockChartNews } from "@/app/Services/yahooFinance/ApiSpecificCompany";
import { DateComponent } from "@/app/Components/StockGraphDates";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler, annotationPlugin);

const NewsStockGraph = ({ articleDate }: { articleDate: string }) => {
  const [chartData, setChartData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { searchQuery } = useSearch();
  const [dateInterval, setDateInterval] = useState<string>("1mo");
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [clickedPrice, setClickedPrice] = useState<number | null>(null);


  // Hente ut aksje data fra API'et
  useEffect(() => {
    if (!searchQuery) return;

    setError(null);
    fetchStockChartNews(searchQuery, dateInterval)
      .then(setChartData)
      .catch((err) => {
        console.error("Failed", err);
        setError(err.message);
      });
  }, [searchQuery, dateInterval]);


//   // Når man trykker på nyhetene så endrer grafen seg tilsvarende
  useEffect(() => {
    if (!chartData || !chartData.labels) return;

    const formattedDate = parseArticleDate(articleDate) || "";
    const adjustedDate = adjustToNearestFriday(formattedDate);

    const verticalLineIndex = chartData.labels.findIndex((date: string) => {
        const parsedDate = new Date(date).toISOString().split("T")[0];
        

        return parsedDate === adjustedDate;
      });

    const verticalLinePrice = verticalLineIndex !== -1 ? chartData.datasets[0].data[verticalLineIndex] : null;
    setClickedIndex(verticalLineIndex);
    setClickedPrice(verticalLinePrice);

    }, [articleDate, dateInterval])


    // Check if a date is weekend
    const adjustToNearestFriday = (CurrentDate: string) => {

        const date = new Date(CurrentDate);
        const dayOfWeek = date.getDay();

        // Hvis det er lørdag
        if (dayOfWeek === 6) {
            date.setDate(date.getDate() - 1);
        }

        if (dayOfWeek === 0) {
            date.setDate(date.getDate() - 2);
        }

        return date.toISOString().split("T")[0];

    } 


  // **Håndter klikk på grafen**
  const handleGraphClick = (event: any, elements: any) => {
    if (elements.length > 0) {
      const dataIndex = elements[0].index;
      setClickedIndex(dataIndex);
      setClickedPrice(chartData.datasets[0].data[dataIndex]); // Henter Y-verdi

      const clickedLabel = chartData.labels[dataIndex];
      console.log(`Klikket på punkt: Label: ${clickedLabel}, Verdi: ${chartData.datasets[0].data[dataIndex]}`);
    } else {
      console.log("Klikket på grafen, men ikke på et datapunkt.");
    }
  };


  // **Konverter artikkeldato til riktig format**
  const parseArticleDate = (dateStr: string) => {
    const match = dateStr.match(/(\d{4})(\d{2})(\d{2})T/);
    return match ? `${match[1]}-${match[2]}-${match[3]}` : null;
  };




  // Error handling
  if (error) {
    return <p className="text-red-500">Failed: {error}</p>;
  }

  if (!chartData) {
    return <SkeletonGraph />;
  }


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    onClick: handleGraphClick,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
      annotation: {
        annotations: {
          // **Rød linje der brukeren klikker**
          ...(clickedIndex !== null && {
            clickedLine: {
              type: "line" as const,
              xMin: clickedIndex,
              xMax: clickedIndex,
              borderColor: "#b91c1c",
              borderWidth: 2,
              borderDash: [5, 5],
              label: {
                content: "Clicked",
                enabled: true,
                position: "top",
              },
            },
            clickedPriceLine: {
              type: "line" as const,
              yMin: clickedPrice,
              yMax: clickedPrice,
              borderColor: "#3730a3",
              borderWidth: 2,
              borderDash: [5, 5],
              label: {
                content: `Price: ${clickedPrice}`,
                enabled: true,
                position: "right",
              },
            },
          }),
        },
      },
    },
    interaction: {
      mode: "nearest",
      intersect: false,
      axis: "xy",
    },
    scales: {
      x: {
        type: "category",
        display: true,
      },
      y: {
        display: true,
      },
    },
  } as const;

  return (
    <div className="p-6 bg-sidebar shadow-lg rounded-lg w-2/3 h-[20rem]">
      <h2 className="flex text-2xl justify-around font-semibold mb-4">
        <div className="flex w-1/4 justify-between">
          {searchQuery.toUpperCase()} 
          <p className={`${
            parseFloat(chartData.growthPercentage.replace('%', '')) < 0
              ? 'text-red-500'
              : 'text-green-500'
          }`}>
            {chartData.growthPercentage}
          </p>
        </div>  
        <DateComponent setDateInterval={setDateInterval} />
      </h2>
      <div className="h-[calc(100%-2.5rem)]">
        <Line data={chartData} options={options}/>
      </div>
    </div>
  );
};

export default NewsStockGraph;
