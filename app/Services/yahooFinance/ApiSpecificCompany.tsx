
const prod = 0;


export const fetchStockChart2 = async(symbol: string, dateInterval: string ) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/stockPriceChartData/${symbol}/${prod}/${dateInterval}/`);

        if (!response.ok) {
            throw new Error(`HTTP error! status ${response.status}`)
        }

        const data = await response.json();

        if (!data) {
            throw new Error("Data mangler")
        }

        return data

    } catch( error: any) {
        console.error(`${symbol} Data mangler 'chart' ${error}`);
    }
}


export const fetchCompanyOverviewData = async(symbol: string) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/basicFinancials/${symbol}/${prod}/`);
        const data = await response.json();

        if (data.error) throw new Error(data.error);

        return data
    } catch (error) {
        console.error("Feil ved henting av company overview", error);
        throw error;
    }
}


export const get_companyTimeSeries = async (ticker: string, prod=0) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/timeSeries/${ticker}/${prod}/`);
        const data = await response.json();

        if (data.error) throw new Error(data.error);

        return data

    } catch (error) {
        console.error("Feil ved henting av company Time Series", error);
        throw error
    }
}

/**
 * 
 * @param range "lessThan", "moreThan", "between"
 * @param filterType "PERatio"
 * @param filterNumber1 
 * @param filterNumber2 
 * @returns 
 */
 export const get_filteredCompanies = async (range: string, filterType: string, filterNumber1: number, filterNumber2: number) => { 

    try {
        const response = await fetch(`http://127.0.0.1:8000/screener/${range}/${filterType}/${filterNumber1}/${filterNumber2}/`)
        const data = await response.json();

        if (data.error) throw new Error(data.error);

        return data.tickers
    } catch (error) {
        console.error("Feil ved henting av filtered companies, sjekk om filterer er riktig");
        throw error
    }
}


export const fetchStockChart = async (symbol: string, dateInterval: string) => {
    try {
        // const response = await fetch(`http://127.0.0.1:8000/stock/chart/${symbol}/${dateInterval}/`);
        const response = await fetch(`http://127.0.0.1:8000/stockPriceChartData/${symbol}/${prod}/${dateInterval}/`);
        const data = await response.json();
  

        if (data.error) throw new Error(data.error);
  
        // Hent vekstprosenten
        const growthPercentage = data.growth_percentage;

        return {
            labels: data.chart.map((entry: any) => entry.date), // X-akse datoer
            datasets: [
                {
                    label: `Pris (${symbol})`,
                    data: data.chart.map((entry: any) => entry.close), // Lukkekurs
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderWidth: 2,
                    pointRadius: 0,
                    fill: false,
                },
                {
                    label: `Volum (${symbol})`,
                    data: data.chart.map((entry: any) => entry.volume / 1000), // Volum
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
        const response = await fetch(`http://127.0.0.1:8000/basicFinancials/${symbol}/${0}/`)
        const data = await response.json();
        if (data.error) throw new Error(data.error);

        return {
            peRatio: data.PERatio ,
            marketCap: data.MarketCapitalization,
            eps: data.EPS,
            roe: data.ReturnOnEquityTTM,
            roa: data.ReturnOnAssetsTTM,
            debtToeEquity: data.Beta,
            dividendYield: data.DividendYield,
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


export const get_companyIncome = async (ticker: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/stock/companyIncome/${ticker}/`);
      const data = await response.json();
  
      return {
        labels: data.map((entry: any) => entry.accounting_end_date),
        datasets: [
          {
            label: "Inntekter",
            data: data.map((entry: any) => {
              const value = Number(entry.revenue);
              return isNaN(value) ? 0 : value;
            }),
            backgroundColor: "#0284c7",
          }
        ]
      };
    } catch (error) {
      console.error("Feil ved henting av inntektsdata:", error);
      return {
        labels: [],
        datasets: [],
      };
    }
  };
  


export const get_companyExpenses = async ( ticker: string) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/stock/companyTotalExpenses/${ticker}/`);
        const data = await response.json();
        return {
            labels: data.map((entry: any) => entry.accounting_end_date),
            datasets: [
                {
                    label: "Inntekter",
                    data: data.map((entry: any) => {
                        const value = Number(entry.revenue);
                        return isNaN(value) ? 0 : value;
                        }),
                    backgroundColor: "#b91c1c",
                }
            ]
        }
    } catch (error) {
        console.error("Feil ved henting av inntektsdata:", error);
        return {
          labels: [],
          datasets: [],
        };
    }
}





export const get_companyEbitda = async ( ticker: string) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/stock/companyEbitda/${ticker}/`);
        const data = await response.json();
        return {
            labels: data.map((entry: any) => entry.accounting_end_date),
            datasets: [
                {
                    label: "Ebitda",
                    data: data.map((entry: any) => entry.ebitda),
                    backgroundColor: "#15803d",
                }
            ]
        }
    } catch (error) {
        console.error("Feil ved henting av inntektsdata:", error);
        return {
          labels: [],
          datasets: [],
        };
    }
}

export const get_companyNetIncome = async (ticker: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/stock/companyNetIncome/${ticker}/`);
      const data = await response.json();
  
      return {
        labels: data.map((entry: any) => entry.accounting_end_date),
        datasets: [
          {
            label: "net_income",
            data: data.map((entry: any) => {
              const value = Number(entry.net_income);
              return isNaN(value) ? 0 : value;
            }),
            backgroundColor: "#15803d",
          }
        ]
      };
    } catch (error) {
      console.error("Feil ved henting av inntektsdata:", error);
      return {
        labels: [],
        datasets: [],
      };
    }
  };
  

export const get_companyGrossProfit = async ( ticker: string) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/stock/companyGrossProfit/${ticker}/`);
        const data = await response.json();
        return {
            labels: data.map((entry: any) => entry.accounting_end_date),
            datasets: [
                {
                    label: "net-income",
                    data: data.map((entry: any) => {
                        const value = Number(entry.gross_profit);
                        return isNaN(value) ? 0 : value;
                    }),
                    backgroundColor: "#15803d",
                }
            ]
        }
    } catch (error) {
        console.error("Feil ved henting av inntektsdata:", error);
        return {
          labels: [],
          datasets: [],
        };
    }
}


export const get_checkCompanyTicker = async ( ticker: string) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/checkValidCompanyTicker/${ticker}/`);
        const data = await response.json();
        return {
            isValidTicker: data.isValidTicker
        }

    } catch (error) {
        console.log("Feil ved sjekking om ticker finnes", error);
        return {
            isValidTicker: false
        }
    }
}


export const get_companyInfo = async ( ticker: string ) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/stock/fetchCompanyInfo/${ticker}/`);
        const data = await response.json();
        return {
            industry: data.industry,
            sector: data.sector
        }

    } catch (error) {
        console.log(`Feil ved henting av indsustry / sektor informasjon for ${ticker}`, error);
    }
}

