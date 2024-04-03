import axios from 'axios';

const fetchMarketDetailsSingle = async (itemId) => {
  try {
    const response = await axios.get(
      `https://api.binance.com/api/v1/ticker/24hr?symbol=${itemId.s}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching market details:', error);
    return null;
  }
};


export default fetchMarketDetailsSingle;
