import {createReducer} from '@reduxjs/toolkit';

export const tradeReducer = createReducer({}, builder => {
  builder.addCase('tradeRequest', state => {
    state.loading = true;
  });

  builder.addCase('tradeSuccess', (state, action) => {
    state.loading = false;
    state.currDetails = action.payload;
  });

  builder.addCase('tradeINRtoUSDTSuccess', (state, action) => {
    state.loading = false;
    state.currDetailsINRtoUSDt = action.payload;
  });

  builder.addCase('tradeUSDTtoINRSuccess', (state, action) => {
    state.loading = false;
    state.currDetailsUSDTtoINR = action.payload;
  });

  builder.addCase('tradeFail', (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });

  builder.addCase('clearTradeError', state => {
    state.error = null;
  });
  builder.addCase('clearTrade', state => {
    state.currDetails = null;
  });
});
