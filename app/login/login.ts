

const url = "http://127.0.0.1:8000/"

export const authenticate_user = async(username: string, password: string) => {

    const response = await fetch(`${url}/auth/login/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "username": username,
            "password": password,
        }),    
    });

    if (!response.ok) {
        throw new Error("Invalid username or password");
    }

    const data = await response.json();
    localStorage.setItem("accessToken", data.access);
    localStorage.setItem("refreshToken", data.resfresh);

    return data;
};