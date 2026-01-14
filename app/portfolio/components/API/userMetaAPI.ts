
const url = "http://127.0.0.1:8000/"



export const getCurrentUser = async () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("Not authenticated");
  }

  const response = await fetch(`${url}me/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
};
