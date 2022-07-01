import axios from "../axios";
import { useState } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const sendRequest = async ({
    method = "GET",
    url,
    body = null,
    headers = null,
    params = null,
  }) => {
    try {
      setIsLoading(true);
      const response = await axios({
        method,
        url,
        data: body,
        headers,
        params,
      });
      setIsLoading(false);
      return response.data;
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
    }
  };

  const clearError = () => {
    setError(null);
  };

  return { sendRequest, isLoading, error, clearError };
};
