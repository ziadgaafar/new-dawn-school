import axios from "axios";
import { useState } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const sendRequest = async (method, url) => {
    try {
      setIsLoading(true);
      const response = await axios({
        method,
        url,
      });
      setIsLoading(false);
      return response.data;
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
    }
  };

  return { sendRequest, isLoading, error };
};
