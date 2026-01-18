
const url = "http://127.0.0.1:8000/"

export const likedStock = async (symbol: string) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
        throw new Error("Not authenticated");
    }

    const response = await fetch(`${url}likes/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({symbol}),
    });

    if (!response.ok) {
        throw new Error(`Failed to like symbol: ${symbol}`)
    }
};


export const get_all_liked_stock_from_user = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
        throw new Error("Not authenticated");

    }
    
    const response = await fetch(`${url}/likes/`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (!response.ok) {
        throw new Error(`Failed to get liked stocks`)
    }

    return response.json();
}


export const unlikeStock = async (symbol: string) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
        throw new Error("Not authenticated");
    }

    const response = await fetch(`${url}/likes/${symbol}/`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!response.ok) {
        throw new Error("Failed to unlike stock");
    }
}

