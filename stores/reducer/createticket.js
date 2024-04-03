import {createReducer} from '@reduxjs/toolkit';

export const createTicketReducer = createReducer(
  {
    allTicketData: [],
  },
  builder => {
    builder
      .addCase('createTicketRequest', state => {
        state.loading = true;
      })
      .addCase('getTicketRequest', state => {
        state.loading = true;
      });

    builder
      .addCase('createTicketSuccess', (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase('getTicketSuccess', (state, action) => {
        state.loading = false;
        state.allTicketData = action.payload;
      });

    builder
      .addCase('createTicketFail', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('getTicketFail', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder.addCase('clearError', state => {
      state.error = null;
    });
    builder.addCase('clearMessage', state => {
      state.message = null;
    });
  },
);
