import {createSlice} from '@reduxjs/toolkit';
import { setMarketData } from './cryptoSlice';

let newWs;

const websocketDataSlice = createSlice({
  name: 'websocketData',
  initialState: {
    websocketMarketData: [],
    topLooserMarketData: [],
  },
  reducers: {
    setWebSocketMarketDataTa: (state, action) => {
      state.websocketMarketData = action.payload.websocketMarketData;
    },
    setToplooserMarketDataTa: (state, action) => {
      state.topLooserMarketData = action.payload.topLooserMarketData;
    },
  },
});

export const {setWebSocketMarketDataTa, setToplooserMarketDataTa} =
  websocketDataSlice.actions;



  export const fetchDataFromWorkerTa = () => {
    return new Promise((resolve, reject) => {
      // const socketUrl = 'wss://stream.binance.com:9443/ws/!ticker@arr';
      const socketUrl = 'wss://stream.binance.com:9443/ws';
      newWs = new WebSocket(socketUrl);
  
      newWs.onopen = () => {
        console.log('WebSocket connected');
        const subscriptionData = {
          method: 'SUBSCRIBE',
          params: ['!ticker@arr'],
          id: 1,
        };
  
        newWs.send(JSON.stringify(subscriptionData));
      };
  
      newWs.onmessage = e => {
        try {
          const data = JSON.parse(e.data);
          if (Array.isArray(data)) {
            const positiveData = data.filter(item => parseFloat(item.P) > 0);
            positiveData.sort((a, b) => parseFloat(b.P) - parseFloat(a.P));
            const top10PositiveData = positiveData.slice(0, 8);
  
            top10PositiveData.forEach(item => {
              item.c = parseFloat(item.c).toFixed(4);
              item.p = parseFloat(item.p).toFixed(3);
              item.P = parseFloat(item.P).toFixed(2);
            });
  
            // console.log(
            //   'Data Found :: ' +
            //     top10PositiveData[0].s +
            //     ' :: ' +
            //     top10PositiveData[0].P,
            // );
  
            // const marketdata = top10PositiveData;
  
            const hundredData = data.slice(0, 99);
  
            resolve(hundredData);
  
            // // Process negative data
            // const negativeData = data.filter(item => parseFloat(item.P) < 0);
            // negativeData.sort((a, b) => parseFloat(a.P) - parseFloat(b.P));
            // const top10NegativeData = negativeData.slice(0, 25);
            // top10NegativeData.forEach(item => {
            //   item.c = parseFloat(item.c).toFixed(2);
            //   item.p = parseFloat(item.p).toFixed(3);
            //   item.P = parseFloat(item.P).toFixed(2);
            // });
  
            // // Dispatch action to update topLooserMarketData
            // setToplooserMarketDataTa({topLooserMarketData: top10NegativeData});
          } else {
            console.log('Received data is not an array');
            // Handle the case when data received from WebSocket is not an array
            // You may need additional error handling or different logic based on your use case
          }
        } catch (error) {
          console.log('Error parsing or processing data:', error);
          reject(error);
          // Handle errors while parsing or processing data from WebSocket
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
        reject(e);
        
      };
    });
  };
  
// export const fetchDataFromWorkerTa = () => {
//   return new Promise((resolve, reject) => {
//     // const socketUrl = 'wss://stream.binance.com:9443/ws/!ticker@arr';
//     const socketUrl = 'wss://stream.binance.com:9443/ws';
//     newWs = new WebSocket(socketUrl);

//     newWs.onopen = () => {
//       console.log('WebSocket connected');
//       const subscriptionData = {
//         method: 'SUBSCRIBE',
//         params: ['!ticker@arr'],
//         id: 1,
//       };

//       newWs.send(JSON.stringify(subscriptionData));
//     };

//     newWs.onmessage = e => {
//       try {
//         const data = JSON.parse(e.data);

//         if (Array.isArray(data)) {
//           const positiveData = data.filter(item => parseFloat(item.P) > 0);
//           positiveData.sort((a, b) => parseFloat(b.P) - parseFloat(a.P));
//           const top10PositiveData = positiveData.slice(0, 8);

//           top10PositiveData.forEach(item => {
//             item.c = parseFloat(item.c).toFixed(4);
//             item.p = parseFloat(item.p).toFixed(3);
//             item.P = parseFloat(item.P).toFixed(2);
//           });

//           console.log(
//             'Data Found :: ' +
//               top10PositiveData[0].s +
//               ' :: ' +
//               top10PositiveData[0].P,
//           );

//           const marketdata = top10PositiveData;

//           const hundredData = data.slice(0, 99);

//           resolve(hundredData);

//           // Process negative data
//           const negativeData = data.filter(item => parseFloat(item.P) < 0);
//           negativeData.sort((a, b) => parseFloat(a.P) - parseFloat(b.P));
//           const top10NegativeData = negativeData.slice(0, 25);
//           top10NegativeData.forEach(item => {
//             item.c = parseFloat(item.c).toFixed(2);
//             item.p = parseFloat(item.p).toFixed(3);
//             item.P = parseFloat(item.P).toFixed(2);
//           });

//           // Dispatch action to update topLooserMarketData
//           setToplooserMarketDataTa({topLooserMarketData: top10NegativeData});
//         } else {
//           console.log('Received data is not an array');
//           // Handle the case when data received from WebSocket is not an array
//           // You may need additional error handling or different logic based on your use case
//         }
//       } catch (error) {
//         console.log('Error parsing or processing data:', error);
//         // Handle errors while parsing or processing data from WebSocket
//       }
//     };

//     // newWs.onmessage = (e) => {
//     //   const data = JSON.parse(e.data);

//     //   const positiveData = data.filter((item) => parseFloat(item.P) > 0);
//     //   positiveData.sort((a, b) => parseFloat(b.P) - parseFloat(a.P));
//     //   const top10PositiveData = positiveData.slice(0, 8);

//     //   top10PositiveData.forEach((item) => {
//     //     item.c = parseFloat(item.c).toFixed(2);
//     //     item.p = parseFloat(item.p).toFixed(3);
//     //     item.P = parseFloat(item.P).toFixed(2);
//     //   });

//     //   console.log(
//     //     'Data Found :: ' +
//     //       top10PositiveData[0].s +
//     //       ' :: ' +
//     //       top10PositiveData[0].P
//     //   );

//     //   const marketdata = top10PositiveData;

//     //   // Process negative data
//     //   const negativeData = data.filter((item) => parseFloat(item.P) < 0);
//     //   negativeData.sort((a, b) => parseFloat(a.P) - parseFloat(b.P));
//     //   const top10NegativeData = negativeData.slice(0, 25);
//     //   top10NegativeData.forEach((item) => {
//     //     item.c = parseFloat(item.c).toFixed(2);
//     //     item.p = parseFloat(item.p).toFixed(3);
//     //     item.P = parseFloat(item.P).toFixed(2);
//     //   });
//     //   resolve(marketdata);
//     //   // Dispatch action to update topLooserMarketData
//     //   setToplooserMarketDataTa({ topLooserMarketData: top10NegativeData });
//     // };

//     newWs.onerror = e => {
//       console.log('Error Found');
//       console.log(e.message);
//       reject(e.message);
//     };

//     newWs.onclose = e => {
//       console.log('onclose Found');
//       console.log(e.code, e.reason);
//     };
//   });
// };

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
      params: ['!ticker@arr'],
      id: 2,
    };
    newWs.send(JSON.stringify(unsubscribeData));
    console.log('Unsubscribed from WebSocket data');
  } else {
    console.log('No WebSocket connection to unsubscribe from');
  }
};

// used to get the dynamic data from the websocket
export const subscribeToGetData = (val) => {
  if (newWs && newWs.readyState === WebSocket.OPEN) {
    const unsubscribeData = {
      method: 'SUBSCRIBE',
      // params: ['!ticker@arr'],
      params: [val],
      id: 2,
    };
    newWs.send(JSON.stringify(unsubscribeData));
    console.log('subscribed from WebSocket data');
  } else {
    console.log('No WebSocket connection to subscribe from');
  }
};

export default websocketDataSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// const websocketDataSlice = createSlice({
//   name: 'websocketData',
//   initialState: {
//     websocketMarketData: [],
//     topLooserMarketData: [],
//   },
//   reducers: {
//     setWebSocketMarketDataTa: (state, action) => {
//       state.websocketMarketData = action.payload.websocketMarketData;
//     },
//     setToplooserMarketDataTa: (state, action) => {
//       state.topLooserMarketData = action.payload.topLooserMarketData;
//     },
//   },
// });

// export const { setWebSocketMarketDataTa, setToplooserMarketDataTa } = websocketDataSlice.actions;

// export const fetchDataFromWorkerTa = () => {
//   return new Promise((resolve, reject) => {
//     const socketUrl = 'wss://stream.binance.com:9443/ws/!ticker@arr';
//     const newWs = new WebSocket(socketUrl);

//     newWs.onopen = () => {
//       console.log('WebSocket connected');
//     };

//     newWs.onmessage = (e) => {
//       const data = JSON.parse(e.data);

//       const positiveData = data.filter((item) => parseFloat(item.P) > 0);
//       positiveData.sort((a, b) => parseFloat(b.P) - parseFloat(a.P));
//       const top10PositiveData = positiveData.slice(0, 8);

//       top10PositiveData.forEach((item) => {
//         item.c = parseFloat(item.c).toFixed(2);
//         item.p = parseFloat(item.p).toFixed(3);
//         item.P = parseFloat(item.P).toFixed(2);
//       });

//       console.log(
//         'Data Found :: ' +
//           top10PositiveData[0].s +
//           ' :: ' +
//           top10PositiveData[0].P
//       );

//       const marketdata = top10PositiveData;

//       // Process negative data
//       const negativeData = data.filter((item) => parseFloat(item.P) < 0);
//       negativeData.sort((a, b) => parseFloat(a.P) - parseFloat(b.P));
//       const top10NegativeData = negativeData.slice(0, 25);
//       top10NegativeData.forEach((item) => {
//         item.c = parseFloat(item.c).toFixed(2);
//         item.p = parseFloat(item.p).toFixed(3);
//         item.P = parseFloat(item.P).toFixed(2);
//       });

//       resolve(marketdata);

//       // Dispatch action to update topLooserMarketData
//       setToplooserMarketDataTa({ topLooserMarketData: top10NegativeData });
//     };

//     newWs.onerror = (e) => {
//       console.log('Error Found');
//       console.log(e.message);
//       reject(e.message);
//     };

//     newWs.onclose = (e) => {
//       console.log('onclose Found');
//       console.log(e.code, e.reason);
//     };
//   });
// };

// export default websocketDataSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// const websocketDataSlice = createSlice({
//   name: 'websocketData',
//   initialState: {
//     websocketMarketData: [],
//     topLooserMarketData: [],
//   },
//   reducers: {
//     setWebSocketMarketDataTa: (state, action) => {
//       state.websocketMarketData = action.payload.websocketMarketData;
//     },
//     setToplooserMarketDataTa: (state, action) => {
//       state.topLooserMarketData = action.payload.topLooserMarketData;
//     },
//   },
// });

// export const { setWebSocketMarketDataTa, setToplooserMarketDataTa } = websocketDataSlice.actions;

// export const fetchDataFromWorkerTa = () => {
//   return new Promise((resolve, reject) => {
//     const socketUrl = 'wss://stream.binance.com:9443/ws/!ticker@arr';

//     // const socketUrl = 'wss://stream.binance.com:9443/ws';

//     const newWs = new WebSocket(socketUrl);

//     newWs.onopen = () => {
//       console.log('WebSocket connected');
//       // const subscriptionData = {
//       //   method: 'SUBSCRIBE',
//       //   params: ['!ticker@arr'],
//       //   id: 1,
//       // };

//       // newWs.send(JSON.stringify(subscriptionData));
//     };

//     newWs.onmessage = (e) => {
//       const data = JSON.parse(e.data);

//       const positiveData = data.filter((item) => parseFloat(item.P) > 0);
//       positiveData.sort((a, b) => parseFloat(b.P) - parseFloat(a.P));
//       const top10PositiveData = positiveData.slice(0, 8);

//       top10PositiveData.forEach((item) => {
//         item.c = parseFloat(item.c).toFixed(2);
//         item.p = parseFloat(item.p).toFixed(3);
//         item.P = parseFloat(item.P).toFixed(2);
//       });

//       console.log(
//         'Data Found :: ' +
//           top10PositiveData[0].s +
//           ' :: ' +
//           top10PositiveData[0].P
//       );

//       const marketdata = top10PositiveData;

//       resolve(marketdata);

//       // Filter and add negative data to topLoserData
//       const negativeData = data.filter(item => parseFloat(item.P) < 0);

//       // Sort negative data by the percentage change in ascending order
//       negativeData.sort((a, b) => parseFloat(a.P) - parseFloat(b.P));

//       // Take the top 10 items
//       const top10NegativeData = negativeData.slice(0, 25);

//       // Round the 'item.c' values to 2 decimal places
//       top10NegativeData.forEach(item => {
//         item.c = parseFloat(item.c).toFixed(2);

//         item.p = parseFloat(item.p).toFixed(3);
//         item.P = parseFloat(item.P).toFixed(2);
//       });

//       // setTopLoserData(top10NegativeData);

//     };

//     newWs.onerror = (e) => {
//       console.log('Error Found');
//       console.log(e.message);
//       reject(e.message);
//     };

//     newWs.onclose = (e) => {
//       console.log('onclose Found');
//       console.log(e.code, e.reason);
//     };
//   });
// };

// export default websocketDataSlice.reducer;
