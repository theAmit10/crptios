import {createSlice} from '@reduxjs/toolkit';

let newWs; // Define the WebSocket variable outside the fetchDataFromWorkerTa function

const assetDetailsDataSlice = createSlice({
  name: 'assetDetailsData',
  initialState: {
    assetDetailsMarketData: [],
    chartMarketData: [],
  },
  reducers: {
    setAssetDetailsMarketDataTa: (state, action) => {
      state.assetDetailsMarketData = action.payload.assetDetailsMarketData;
    },
    setChartMarketDataTa: (state, action) => {
      state.chartMarketData = action.payload.chartMarketData;
    },
  },
});

export const {setAssetDetailsMarketDataTa, setChartMarketDataTa} =
  assetDetailsDataSlice.actions;

export const fetchAssetDetailsData = () => {
  return new Promise((resolve, reject) => {
    // const socketUrl = 'wss://stream.binance.com:9443/ws/!ticker@arr';
    const socketUrl = 'wss://stream.binance.com:9443/ws';
    newWs = new WebSocket(socketUrl);

    newWs.onopen = () => {
      console.log('WebSocket connected');
      const subscriptionData = {
        method: 'SUBSCRIBE',
        params: ['btcusdt@miniTicker', 'btcusdt@depth'],
        id: 1,
      };

      newWs.send(JSON.stringify(subscriptionData));
    };

    newWs.onmessage = e => {
      const data = JSON.parse(e.data);


      if (data.e === '24hrMiniTicker') {
        console.log('Data Found Asset Data :: ' + data.s);
        // Dispatch action to update topLooserMarketData
        setChartMarketDataTa({chartMarketData: data});
      } else if (data.e === 'depthUpdate') {
        console.log('Data Found ask :: ' + data.a[0]);
        console.log('Data Found bid :: ' + data.b[0]);

        const marketdata = data.b;
        resolve(marketdata);
      }

    };

    newWs.onerror = e => {
      console.log('Error Found');
      console.log(e.message);
      reject(e.message);
    };

    newWs.onclose = e => {
      console.log('onclose Found');
      console.log(e.code, e.reason);
    };
  });
};

export const stopFetchingDataFromWorker = () => {
  if (newWs) {
    newWs.close();
    console.log('WebSocket connection closed');
  } else {
    console.log('No WebSocket connection to close');
  }
};

// Method to send a message to WebSocket server for unsubscribing
export const unsubscribeFromWebSocket = () => {
  if (newWs && newWs.readyState === WebSocket.OPEN) {
    const unsubscribeData = {
      method: 'UNSUBSCRIBE', // Customize this message based on your server requirements
      params: ['btcusdt@miniTicker', 'btcusdt@depth'],
      id: 2,
    };
    newWs.send(JSON.stringify(unsubscribeData));
    console.log('Unsubscribed from WebSocket data');
  } else {
    console.log('No WebSocket connection to unsubscribe from');
  }
};

export default assetDetailsDataSlice.reducer;
