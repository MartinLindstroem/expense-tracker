interface User {
  email: string;
  username: string;
}

interface ApiResponse {
  data: any[];
  status: number;
  user?: User;
}

export const callApi = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: any,
  headers: Record<string, string> = { "Content-Type": "application/json" }
): Promise<ApiResponse> => {
  const fetchApi = async () => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}${url}`, {
      method,
      headers,
      credentials: "include",
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      console.log("Server response", response);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    json.status = response.status;

    return json;
  };

  try {
    return await fetchApi();
  } catch (error) {
    if ((error as Error).message.includes("401")) {
      // Attempt to refresh the token
      try {
        const refreshResponse = await fetch(
          `${import.meta.env.VITE_SERVER_URL}auth/refresh-token`,
          {
            method: "POST",
            credentials: "include",
          }
        );

        if (!refreshResponse.ok) {
          throw new Error("Failed to refresh token");
        }

        const refreshData = await refreshResponse.json();
        headers["Authorization"] = `Bearer ${refreshData.accessToken}`;

        // Retry the original request with the new token
        return await fetchApi();
      } catch (refreshError) {
        throw new Error(`Token refresh failed: ${(refreshError as Error).message}`);
      }
    } else {
      throw error;
    }
  }
};
