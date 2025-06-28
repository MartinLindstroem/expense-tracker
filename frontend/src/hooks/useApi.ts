import { useState } from "react";
import { callApi as callApiUtil } from "../utils/callApi";

interface User {
  email: string;
  username: string;
}

interface ApiResponse {
  data: [];
  status: number;
  user?: User;
}

export const useApi = (): {
  data: ApiResponse | null;
  isPending: boolean;
  error: string | null;
  callApi: (
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    body?: any,
    headers?: Record<string, string>
  ) => Promise<void>;
} => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const callApi = async (
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    body?: any,
    headers: Record<string, string> = { "Content-Type": "application/json" }
  ): Promise<void> => {
    setIsPending(true);
    setError(null);
    setData(null);

    try {
      const json = await callApiUtil(url, method, body, headers);
      setData(json);
    } catch (err) {
      setError(`Error: ${err}`);
    } finally {
      setIsPending(false);
    }
  };

  return { data, isPending, error, callApi };
};
