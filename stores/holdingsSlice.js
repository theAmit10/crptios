// holdingsSlice.js

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const holdingsSlice = createSlice({
  name: 'holdings',
  initialState: {
    loading: false,
    myHoldings: [],
    error: null,
  },
  reducers: {
    getHoldingsBegin: (state) => {
      state.loading = true;
    },
    getHoldingsSuccess: (state, action) => {
      state.loading = false;
      state.myHoldings = action.payload.myHoldings;
      state.error = null;
    },
    getHoldingsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  getHoldingsBegin,
  getHoldingsSuccess,
  getHoldingsFailure,
} = holdingsSlice.actions;

export const fetchHoldings = (
  holdings = [],
  currency = 'usd',
  orderBy = 'market_cap_desc',
  sparkline = true,
  priceChangePerc = '7d',
  perPage = 10,
  page = 1
) => async (dispatch) => {
  dispatch(getHoldingsBegin());

  try {
    const ids = holdings.map((item) => item.id).join(',');
    const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}&ids=${ids}`;

    const response = await axios.get(apiUrl, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.status === 200) {
      const myHoldings = response.data.map((item) => {
        const coin = holdings.find((a) => a.id === item.id);
        const price_7d =
          item.current_price / (1 + item.price_change_percentage_7d_in_currency * 0.01);

        return {
          id: item.id,
          symbol: item.symbol,
          name: item.name,
          image: item.image,
          current_price: item.current_price,
          qty: coin.qty,
          total: coin.qty * item.current_price,
          price_change_percentage_7d_in_currency:
            item.price_change_percentage_7d_in_currency,
          holding_value_change_7d:
            (item.current_price - price_7d) * coin.qty,
          sparkline_in_7d: {
            value: item.sparkline_in_7d.price.map((price) => price * coin.qty),
          },
        };
      });

      dispatch(getHoldingsSuccess({ myHoldings }));
    } else {
      dispatch(getHoldingsFailure({ error: response.data }));
    }
  } catch (error) {
    dispatch(getHoldingsFailure({ error }));
  }
};

export default holdingsSlice.reducer;
