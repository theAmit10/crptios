import {createReducer} from '@reduxjs/toolkit';

export const myinvestmentReducer = createReducer({}, builder => {
  builder.addCase('myinvestmentRequest', state => {
    state.loading = true;
  });

  builder.addCase('myinvestmentSuccess', (state, action) => {
    state.loading = false;
    state.message = action.payload;
  });

  builder.addCase('myinvestmentFail', (state, action) => {
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
