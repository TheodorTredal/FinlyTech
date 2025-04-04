
interface get_companyIncomeInterface {
    ticker: string;
    dateInterval: number;
}


export const get_companyIncome = async ( ticker: string, dateInterval: number ) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/10kRevenues/${ticker}/${dateInterval}/`);
        const data = response.json();
        return data;

    } catch (error: any) {
        console.error("Error fetching company income data:", error);
        return { error: error.message };
    }
}


export const get_company_expenses = async ( ticker: string, dateInterval: number ) => {

    try {
        const response = await fetch(`http://127.0.0.1:8000/10kOperatingExpenses/${ticker}/${dateInterval}/`);
        const data = response.json();
        return data;
    } catch (error: any) {
        console.log("Error fetching company expenses: ", error);
        return { error: error.message};
    }
}