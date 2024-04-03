import { useState } from "react";
import axios from "axios";

export const useApiResponse = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCoinsDetails = async (text) => {
    setLoading(true);
    API_URL =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h&locale=en";

    try {
      const response = await axios.get(API_URL);
      setData(response.data);
      setError(false); // Clear any previous error
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    } finally {
      setError(false); // Set loading to false when the request is complete
    }
  };
  return { getCoinsDetails, data, error, loading };
};