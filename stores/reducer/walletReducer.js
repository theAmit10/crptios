import {createReducer} from '@reduxjs/toolkit';

export const walletReducer = createReducer({
    allwallet: []
}, builder => {
  builder.addCase('getWalletRequest', state => {
    state.loading = true;
  });

  builder.addCase('getWalletSuccess', (state, action) => {
    state.loading = false;
    state.walletdata = action.payload;
  });

  builder.addCase('getAllWalletSuccess', (state, action) => {
    state.loading = false;
    state.allwallet = action.payload;
  });

  builder.addCase('getWalletFail', (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });

  builder.addCase('clearError', state => {
    state.error = null;
  });
  builder.addCase('clearMessage', state => {
    state.message = null;
  });
});
