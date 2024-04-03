import axios from 'axios';

const fetchSingleChartMarketData = async (chartPrices, timeframe) => {
  try {
    const response = await axios.get(
      `https://api.binance.com/api/v3/klines?symbol=${chartPrices}&interval=${timeframe}`,
    );

    const da = response.data;

    // const xValues = da.map(item => item[0]);
    const yValues = da.map(item => item[1]);

    return yValues;
  } catch (error) {
    console.error('Error fetching market details:', error);
    return null;
  }
};


export default fetchSingleChartMarketData;
