import {createReducer} from '@reduxjs/toolkit';

export const allmarketreducer = createReducer(
  {
    allMarket: [],
    subscribingBinance: false,
  },
  builder => {
    builder.addCase('getAllMarketRequest', state => {
      state.loading = true;
    });
    builder.addCase('connetBinanceRequest', state => {
      state.loadingBinance = false;
    });
    builder.addCase('connetedBinanceResponse', (state, action) => {
      state.loadingBinance = true;
    });
    builder.addCase('subscribeBinanceRequest', (state, action) => {
      state.loadingBinance = true;
      // state.subscribingBinance = false;
    });
    builder.addCase('subscribedAllMarketResponse', (state, action) => {
      state.loadingBinance = true;
      state.subscribingBinance = true;
      state.allMarket = action.payload;
    });

    builder.addCase('getAllMarketSuccess', (state, action) => {
      state.loading = false;

      state.allMarket = action.payload;
    });

    builder.addCase('getAllMarketFail', (state, action) => {
      state.loading = false;

      state.error = action.payload;
    });

    builder.addCase('clearAllMarketError', state => {
      state.error = null;
    });
    builder.addCase('clearAllMarketMessage', state => {
      state.message = null;
    });
  },
);
