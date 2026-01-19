
const url = "http://127.0.0.1:8000/"


export const getUserPortfolio = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
        throw new Error("Not authenticated");
    }

    const response = await fetch(`${url}/portfolios/`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (!response.ok) {
        throw new Error(`Failed to get portfolios`);
    }

    return response.json();
}



export const createPortfolio = async (title: string, base_currency: string) => {

    const token = localStorage.getItem("accessToken");

    if (!token) {
        throw new Error("Not authenticated");
    }

    const response = await fetch(`${url}/portfolios/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({title, base_currency})
    });

    let data;
    try {
        data = await response.json()

    } catch (err) {
        throw new Error(`Unexpected error: ${response.statusText}`);
    }


    if (!response.ok) {
        const errorMessage = data.detail || `Request failed with status ${response.status}`;
        throw new Error(errorMessage);
    }

    return data;
}



export const deletePortfolio = async (portfolio_title: string) => {


    const token = localStorage.getItem("accessToken");

    if (!token) {
        throw new Error("Not authenticated");
    }

    const response = await fetch(`${url}/portfolios/${portfolio_title}/`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })


    let data;
    try {
        data = await response.json()

    } catch (err) {
        throw new Error(`Unexpected error: ${response.statusText}`);
    }


    if (!response.ok) {
        const errorMessage = data.detail || `Request failed with status ${response.status}`;
        throw new Error(errorMessage);
    }
}