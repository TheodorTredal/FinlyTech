export const fetchStockChart = async (symbol: string, dateInterval: string) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/stock/chart/${symbol}/${dateInterval}/`);
        const data = await response.json();
  
        if (data.error) throw new Error(data.error);
  
        // Hent vekstprosenten
        const growthPercentage = data.growth_percentage;

        return {
            labels: data.chart.map((entry: any) => entry.date), // X-akse datoer
            datasets: [
                {
                    label: `Aksjekurs (${symbol})`,
                    data: data.chart.map((entry: any) => entry.close), // Lukkekurs
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderWidth: 2,
                    pointRadius: 0,
                    fill: false,
                },
                {
                    label: `Volum (${symbol})`,
                    data: data.chart.map((entry: any) => entry.volume), // Volum
                    backgroundColor: "rgba(255, 99, 132, 0.6)",  // Farge for bar chart volumet
                    borderWidth: 0,
                    yAxisID: 'y2',  // For volumet
                    type: 'bar',  // Angir at dette er et bar chart
                },
            ],
            growthPercentage,
        };
    } catch (error: any) {
        throw new Error(error.message);
    }
};



export const fetchStockChartNews = async (symbol: string, dateInterval: string) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/stock/chart/${symbol}/${dateInterval}/`);
        const data = await response.json();
  
        if (data.error) throw new Error(data.error);
  
        // Hent vekstprosenten
        const growthPercentage = data.growth_percentage;

        return {
            labels: data.chart.map((entry: any) => entry.date), // X-akse datoer
            datasets: [
                {
                    label: `Aksjekurs (${symbol})`,
                    data: data.chart.map((entry: any) => entry.close), // Lukkekurs
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderWidth: 2,
                    pointRadius: 0,
                    fill: false,
                },
            ],
            growthPercentage,
        };
    } catch (error: any) {
        throw new Error(error.message);
    }
};



export const fetchBasicFinancials = async (symbol: string) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/stock/financialInformation/${symbol}/`)
        const data = await response.json();
        if (data.error) throw new Error(data.error);

        return {
            peRatio: data.pe_Ratio,
            marketCap: data.market_cap,
            eps: data.eps,
            roe: data.roe,
            roa: data.roa,
            debtToEquity: data.debt_to_equity,
            dividendYield: data.dividend_yield
        };

    } catch (error: any){
        throw new Error(error.message);
    }
};


export const fetchCompanyNews = async (symbol: string) => {

    try {
        const response = await fetch(`http://127.0.0.1:8000/stock/companyNews/${symbol}`)
        const data = await response.json();
        if (data.error) throw new Error(data.error());

        if (!data.feed || data.feed.length === 0) {
            throw new Error("No news available!");
        }

        const articles = data.feed.map((article: any) => ({
            "date": article.time_published,
            "Summary": article.summary,
        }))

        return articles;

    } catch(error: any) {
        throw new Error(error.message);
    }
}