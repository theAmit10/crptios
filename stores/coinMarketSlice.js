
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const coinMarketSlice = createSlice({
  name: 'coinMarket',
  initialState: {
    loading: false,
    coins: [],
    error: null,
  },
  reducers: {
    getCoinMarketBegin: (state) => {
      state.loading = true;
    },
    getCoinMarketSuccess: (state, action) => {
      state.loading = false;
      state.coins = action.payload.coins;
      state.error = null;
    },
    getCoinMarketFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  getCoinMarketBegin,
  getCoinMarketSuccess,
  getCoinMarketFailure,
} = coinMarketSlice.actions;

export const fetchCoinMarket = (
  currency = 'usd',
  orderBy = 'market_cap_desc',
  sparkline = true,
  priceChangePerc = '7d',
  perPage = 10,
  page = 1
) => async (dispatch) => {
  dispatch(getCoinMarketBegin());

  try {
    const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`;

    const response = await axios.get(apiUrl, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.status === 200) {
      dispatch(getCoinMarketSuccess({ coins: response.data }));
    } else {
      dispatch(getCoinMarketFailure({ error: response.data }));
    }
  } catch (error) {
    dispatch(getCoinMarketFailure({ error }));
  }
};

export default coinMarketSlice.reducer;
