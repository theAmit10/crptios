// src/store/cryptoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: {
    marketData: null,
  },
  reducers: {
    setMarketData: (state, action) => {
      console.log('Setting market data:', action.payload);
      state.marketData = action.payload;
    },
  },
});

export const { setMarketData } = cryptoSlice.actions;
export const selectMarketData = (state) => state.crypto.marketData;

export default cryptoSlice.reducer;


// // src/store/cryptoSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const cryptoSlice = createSlice({
//   name: 'crypto',
//   initialState: {
//     marketData: null,
//   },
//   reducers: {
//     setMarketData: (state, action) => {
//       state.marketData = action.payload;
//     },
//   },
// });

// export const { setMarketData } = cryptoSlice.actions;
// export const selectMarketData = (state) => state.crypto.marketData;

// export default cryptoSlice.reducer;
