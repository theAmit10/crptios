// websocketSlice.js

import { createSlice } from '@reduxjs/toolkit';

const websocketSlice = createSlice({
  name: 'websocket',
  initialState: {
    tickerData: [],
    topLooserData: [],
    topGainerData: [],
  },
  reducers: {
    setTickerData: (state, action) => {
      state.tickerData = action.payload;
    },
    setTopLooserData: (state, action) => {
      state.topLooserData = action.payload;
    },
    setTopGainerData: (state, action) => {
      state.topGainerData = action.payload;
    },
  },
  
  
});

export const { setTickerData, setTopLooserData, setTopGainerData } = websocketSlice.actions;

export default websocketSlice.reducer;
