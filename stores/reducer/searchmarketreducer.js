import {createReducer} from '@reduxjs/toolkit';

export const settingSearchMarketData = state => state.searchmarket;

export const searchmarketreducer = createReducer(
  {
    searchmarket: [],
    subscribingBinance: false,
    loadingBinance: false,
  },
  builder => {
    builder.addCase('connetedBinanceResponse', state => {
      state.loadingBinance = true;
    });
    builder.addCase('subscribedAllMarketResponse', (state, action) => {
      state.loadingBinance = true;
      state.subscribingBinance = true;
      state.searchmarket = action.payload;
    });
   
    builder.addCase('searchmarketFail', (state, action) => {
      state.loadingBinance = true;
      state.error = action.payload;
    });

    builder.addCase('clearsearchmarketError', state => {
      state.loadingBinance = false;
      state.subscribingBinance = false;
      state.error = null;
    });
    builder.addCase('clearsearchmarketMessage', state => {
      state.searchmarket = null;
    });
  },
);
