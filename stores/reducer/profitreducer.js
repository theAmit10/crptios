import {createReducer} from '@reduxjs/toolkit';

export const productReducer = createReducer(
  {
    inrwallet: [],
    refferalwallet: [],
    allprofit: {}

  },
  (builder) => {
    builder
      .addCase("getProfitRequest", (state) => {
        state.loading = true;
      })
      .addCase("getProfitSuccess", (state, action) => {
        state.loading = false;
        state.inrwallet = action.payload;
      })
      .addCase("getReferralProfitSuccess", (state, action) => {
        state.loading = false;
        state.refferalwallet = action.payload;
      })
      .addCase("getAllProfitSuccess", (state, action) => {
        state.loading = false;
        state.allprofit = action.payload;
      })
      .addCase("getProfitFail", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      

    builder.addCase("clearProfitError", (state) => {
      state.error = null;
    });
    builder.addCase("clearProfitData", (state) => {
      state.inrwallet = [];
    });
  }
);


export const profitReducer = createReducer(
  {
    inrwallet: [],
    refferalwallet: [],
  },
  builder => {
    builder.addCase('getProfitRequest', state => {
      state.loading = true;
    });

    builder.addCase('getProfitSuccess', (state, action) => {
      state.loading = false;
      state.inrwallet = action.payload;
    });
    builder.addCase('getReferralProfitSuccess', (state, action) => {
      state.loading = false;
      state.refferalwallet = action.payload;
    });

    builder.addCase('getAllProfitSuccess', (state, action) => {
      state.loading = false;
      state.allprofit = action.payload;
    });

    builder.addCase('getProfitFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase('clearProfitError', state => {
      state.error = null;
    });
    builder.addCase('clearProfitData', state => {
      state.inrwallet = [];
    });
  },
);
