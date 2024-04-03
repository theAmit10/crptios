import {setTickerData} from '../websocketSlice';

// export const getAllMarketData = () => {
//   return new Promise((resolve, reject) => {
//     dispatch({
//       type: 'getAllMarketRequest',
//     });
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

//           const marketdata = top10PositiveData;

//           const hundredData = data.slice(0, 99);
//           dispatch({
//             type: 'getAllMarketSucces',
//             payload: hundredData,
//           });

//           resolve(hundredData);
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

//     newWs.onerror = e => {
//       console.log('Error Found');
//       console.log(e.message);
//       dispatch({
//         type: 'getAllMarketFail',
//         payload: e.message,
//       });
//       reject(e.message);

//     };

//     newWs.onclose = e => {
//       console.log('onclose Found');
//       dispatch({
//         type: 'getAllMarketFail',
//         payload: e.reason,
//       });
//       console.log(e.code, e.reason);
//     };
//   });
// };

// export const getAllMarketData = () => async dispatch => {
//   try {
//     dispatch({
//       type: 'getAllMarketRequest',
//     });

//     const ws = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');

//     ws.onopen = () => {
//       // connection opened
//       // ws.send('something'); // send a message
//     };

//     ws.onmessage = e => {
//       try {
//         // a message was received

//         const data = JSON.parse(e.data);
//         // dispatch(setTickerData(data));
//         dispatch({
//           type: 'getAllMarketSucces',
//           payload: data,
//         });
//         // console.log(e.data.length);
//       } catch (error) {
//         console.log(error);
//         dispatch({
//           type: 'getAllMarketFail',
//           payload: error,
//         });
//       }
//     };

//     ws.onerror = e => {
//       // an error occurred
//       console.log(e.message);
//       dispatch({
//         type: 'getAllMarketFail',
//         payload: e.message,
//       });
//     };

//     ws.onclose = e => {
//       // connection closed
//       console.log(e.code, e.reason);
//       dispatch({
//         type: 'getAllMarketFail',
//         payload: e.reason,
//       });
//     };

//     // console.log('Response SERVER:', response.data.data.wallets.data);
//     // return response.data;
//   } catch (error) {
//     console.log(error);
//     dispatch({
//       type: 'getAllMarketFail',
//       payload: error,
//     });
//   }
// };

// let newWs;

// export const getAllMarketData = () => async dispatch => {
//   // const socketUrl = 'wss://stream.binance.com:9443/ws/!ticker@arr';
//   const socketUrl = 'wss://stream.binance.com:9443/ws';
//   newWs = await new WebSocket(socketUrl);

//   try {
//     dispatch({
//       type: 'getAllMarketRequest',
//     });
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
//           const hundredData = data.slice(0, 99);
//           console.log(hundredData.length);

//           dispatch({
//             type: 'getAllMarketSuccess',
//             payload: hundredData,
//           });
//         } else {
//           console.log('Received data is not an array');
//           dispatch({
//             type: 'getAllMarketFail',
//             payload: 'Received data is not an array',
//           });
//         }
//       } catch (error) {
//         console.log('Error parsing or processing data:', error);
//         dispatch({
//           type: 'getAllMarketFail',
//           payload: error,
//         });
//       }
//     };

//     newWs.onerror = e => {
//       console.log('Error Found');
//       console.log(e.message);
//       dispatch({
//         type: 'getAllMarketFail',
//         payload: e.message,
//       });
//     };

//     newWs.onclose = e => {
//       console.log('onclose Found');
//       console.log(e.code, e.reason);
//       dispatch({
//         type: 'getAllMarketFail',
//         payload: e.reason,
//       });
//     };
//   } catch (error) {
//     dispatch({
//       type: 'getAllMarketFail',
//       payload: error,
//     });
//   }
// };

// let newWs = null;

const socketUrl = 'wss://stream.binance.com:9443/ws';
const newWs = new WebSocket(socketUrl);

export const connectToBinance = () => async dispatch => {
  try {
    dispatch({
      type: 'connetBinanceRequest',
    });

    newWs.onopen = () => {
      // console.log('WebSocket connected');
      dispatch({
        type: 'connetedBinanceResponse',
      });

      // console.log('newWs Ready State :: ' + newWs.readyState);
      // console.log('newWs  WebSocket.OPEN:: ' + WebSocket.OPEN);

      // return newWs;
      // console.log('WebSocket connected');
      // newWs.send(JSON.stringify(subscriptionData));
    };
  } catch (error) {
    dispatch({
      type: 'getAllMarketFail',
      payload: error,
    });
  }
};

export const subscribeToAllMarket = subscriptionData => async dispatch => {
  try {
    dispatch({
      type: 'subscribeBinanceRequest',
    });

    newWs.onopen = ()  => {
      console.log('WebSocket connected');
      newWs.send(JSON.stringify(subscriptionData));
      // console.log('WebSocket connected');
      // newWs.send(JSON.stringify(subscriptionData));
    };

    newWs.onmessage = e => {
      try {
        const data =  JSON.parse(e.data);
        if (Array.isArray(data)) {
          const hundredData = data.slice(0, 99);
          console.log(hundredData.length);
          dispatch({
            type: 'subscribedAllMarketResponse',
            payload: hundredData,
          });
        } else {
          console.log('Received data is not an array');
        }
      } catch (error) {
        dispatch({
          type: 'getAllMarketFail',
          payload: error,
        });
      }
    };

    // if (newWs && newWs.readyState === WebSocket.OPEN) {
    //   newWs.send(JSON.stringify(subscriptionData));

    //   newWs.onmessage = e => {
    //     try {
    //       const data = JSON.parse(e.data);
    //       const hundredData = data?.slice(0, 99);
    //       console.log(hundredData.length);
    //       dispatch({
    //         type: 'subscribedAllMarketResponse',
    //         payload: hundredData,
    //       });
    //     } catch (error) {
    //       dispatch({
    //         type: 'getAllMarketFail',
    //         payload: error,
    //       });
    //     }
    //   };

    //   console.log('subscribed from WebSocket data');
    // } else {
    //   console.log('No WebSocket connection to unsubscribe from');
    //   console.log('No WebSocket newWs Ready State :: ' + newWs.readyState);
    //   console.log('No WebSocket newWs  WebSocket.OPEN:: ' + WebSocket.OPEN);
    // }
  } catch (error) {
    dispatch({
      type: 'getAllMarketFail',
      payload: error,
    });
  }
};

export const connectToBinanced = subscriptionData => async dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: 'getAllMarketRequest',
    });

    const socketUrl = 'wss://stream.binance.com:9443/ws';
    newWs = new WebSocket(socketUrl);

    newWs.onopen = () => {
      console.log('WebSocket connected');
      // const subscriptionData = {
      //   method: 'SUBSCRIBE',
      //   params: ['!ticker@arr'],
      //   id: 1,
      // };

      newWs.send(JSON.stringify(subscriptionData));
    };

    // newWs.send(JSON.stringify(subscriptionData));

    newWs.onmessage = e => {
      try {
        const data = JSON.parse(e.data);

        const hundredData = data.slice(0, 99);
        console.log(hundredData.length);
        dispatch({
          type: 'getAllMarketSuccess',
          payload: hundredData,
        });
      } catch (error) {
        dispatch({
          type: 'getAllMarketFail',
          payload: error,
        });
      }
    };

    newWs.onerror = e => {
      console.log('Error Found');
      console.log(e.message);
      // reject(e.message);
      dispatch({
        type: 'getAllMarketFail',
        payload: reject(e.message),
      });
    };

    newWs.onclose = e => {
      console.log('onclose Found');
      console.log(e.code, e.reason);
      dispatch({
        type: 'getAllMarketFail',
        payload: e.reason,
      });
    };
  });
};

export const getAllMarketData = subscriptionData => async dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: 'getAllMarketRequest',
    });

    const socketUrl = 'wss://stream.binance.com:9443/ws';
    newWs = new WebSocket(socketUrl);

    newWs.onopen = () => {
      console.log('WebSocket connected');
      // const subscriptionData = {
      //   method: 'SUBSCRIBE',
      //   params: ['!ticker@arr'],
      //   id: 1,
      // };

      newWs.send(JSON.stringify(subscriptionData));
    };

    // newWs.send(JSON.stringify(subscriptionData));

    newWs.onmessage = e => {
      try {
        const data = JSON.parse(e.data);

        //
        const hundredData = data.slice(0, 99);
        console.log(hundredData.length);
        dispatch({
          type: 'getAllMarketSuccess',
          payload: hundredData,
        });

        // if (Array.isArray(data)) {
        //   const hundredData = data.slice(0, 99);

        //   // resolve(hundredData);
        //   dispatch({
        //     type: 'getAllMarketSuccess',
        //     payload: resolve(hundredData),
        //   });
        // } else {
        //   console.log('Received data is not an array');
        // }
      } catch (error) {
        //   console.log('Error parsing or processing data:', error);
        dispatch({
          type: 'getAllMarketFail',
          payload: error,
        });
      }
    };

    newWs.onerror = e => {
      console.log('Error Found');
      console.log(e.message);
      // reject(e.message);
      dispatch({
        type: 'getAllMarketFail',
        payload: reject(e.message),
      });
    };

    newWs.onclose = e => {
      console.log('onclose Found');
      console.log(e.code, e.reason);
      dispatch({
        type: 'getAllMarketFail',
        payload: e.reason,
      });
    };
  });
};

// Method to send a message to WebSocket server for unsubscribing
export const unsubscribeFromAllmarketaction = () => {
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
