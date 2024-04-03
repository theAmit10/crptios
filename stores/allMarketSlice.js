import { createSlice } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
// import useWebSocket from 'react-native-use-websocket';
import { useDispatch } from 'react-redux';

const socketUrl = 'wss://stream.binance.com:9443/ws/!ticker@arr';

const allMarketSlice = createSlice({
  name: 'allMarket',
  initialState: {
    loading: false,
    allMarket: [],
    error: null,
  },
  reducers: {
    getAllMarketBegin: (state) => {
      state.loading = true;
    },
    getAllMarketSuccess: (state, action) => {
      state.loading = false;
      state.allMarket = action.payload.allMarket;
      state.error = null;
    },
    getAllMarketFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  getAllMarketBegin,
  getAllMarketSuccess,
  getAllMarketFailure,
} = allMarketSlice.actions;

export const fetchAllMarket = () => async (dispatch) => {
  dispatch(getAllMarketBegin());

  try {
    const { sendMessage, sendJsonMessage, lastMessage, lastJsonMessage, readyState, getWebSocket } = useWebSocket(socketUrl, {
      onOpen: () => {
        console.log('WebSocket opened');
        const webSocket = getWebSocket();

        webSocket.onmessage = (message) => {
          const data = JSON.parse(message.data);
          console.log('Data: ' + JSON.stringify(data[0].s));
          dispatch(getAllMarketSuccess({ allMarket: data }));
        };
      },
      shouldReconnect: (closeEvent) => true,
    });
  } catch (error) {
    console.log('Error: ' + error);
    // dispatch(getAllMarketFailure({ error }));
  }
};

export const AllMarketWebSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAllMarket()(dispatch);
  }, []);

  return null;
};

export default allMarketSlice.reducer;



// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import useWebSocket, { ReadyState } from 'react-native-use-websocket'; // Make sure you import ReadyState from react-native-use-websocket
// const socketUrl = 'wss://stream.binance.com:9443/ws/!ticker@arr';



// export const fetchAllMarket = createAsyncThunk(
//   'allMarket/fetchAllMarket',
//   async (_, { dispatch }) => {
//     try {
//       const { sendJsonMessage, lastMessage, getWebSocket, readyState } = useWebSocket(socketUrl, {
//         onOpen: () => {
//           console.log('WebSocket opened');
//         },
//         shouldReconnect: (closeEvent) => true,
//       });

//       while (readyState === ReadyState.OPEN) {
//         const message = await lastMessage();
//         const data = JSON.parse(message.data);
//         dispatch(getAllMarketSuccess({ allMarket: data }));
//       }
//     } catch (error) {
//       console.error('WebSocket error:', error);
//       throw error;
//     }
//   }
// );

// const allMarketSlice = createSlice({
//   name: 'allMarketMarket',
//   initialState: {
//     loading: 'idle',
//     allMarket: [],
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllMarket.pending, (state) => {
//         state.loading = 'pending';
//       })
//       .addCase(fetchAllMarket.fulfilled, (state, action) => {
//         state.loading = 'succeeded';
//         state.allMarket = action.payload.allMarket;
//         state.error = null;
//       })
//       .addCase(fetchAllMarket.rejected, (state, action) => {
//         state.loading = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export default allMarketSlice.reducer;


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import useWebSocket from 'react-native-use-websocket';
// const socketUrl = 'wss://stream.binance.com:9443/ws/!ticker@arr';

// export const fetchAllMarket = createAsyncThunk(
//   'allMarket/fetchAllMarket',
//   async (_, { dispatch }) => {
//     const { sendMessage, getWebSocket } = useWebSocket(socketUrl, {
//       onOpen: () => {
//         console.log('WebSocket opened');
//         const webSocket = getWebSocket();

//         webSocket.onmessage = (message) => {
//           const data = JSON.parse(message.data);
//           dispatch(getAllMarketSuccess({ allMarket: data }));
//         };
//       },
//       shouldReconnect: (closeEvent) => true,
//     });
//   }
// );

// const allMarketSlice = createSlice({
//   name: 'allMarketMarket',
//   initialState: {
//     loading: 'idle',
//     allMarket: [],
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllMarket.pending, (state) => {
//         state.loading = 'pending';
//       })
//       .addCase(fetchAllMarket.fulfilled, (state, action) => {
//         state.loading = 'succeeded';
//         state.allMarket = action.payload.allMarket;
//         state.error = null;
//       })
//       .addCase(fetchAllMarket.rejected, (state, action) => {
//         state.loading = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export default allMarketSlice.reducer;



//  3333

// import {createSlice} from '@reduxjs/toolkit';

// import useWebSocket from 'react-native-use-websocket';
// const socketUrl = 'wss://stream.binance.com:9443/ws/!ticker@arr';

// const allMarketSlice = createSlice({
//   name: 'allMarketMarket',
//   initialState: {
//     loading: false,
//     allMarket: [],
//     error: null,
//   },
//   reducers: {
//     getAllMarketBegin: state => {
//       state.loading = true;
//     },
//     getAllMarketSuccess: (state, action) => {
//       state.loading = false;
//       state.allMarket = action.payload.allMarket;
//       state.error = null;
//     },
//     getAllMarketFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload.error;
//     },
//   },
// });

// export const {getAllMarketBegin, getAllMarketSuccess, getAllMarketFailure} =
//   allMarketSlice.actions;

// export const fetchAllMarket =
//   (
//     currency = 'usd',
//     orderBy = 'market_cap_desc',
//     sparkline = true,
//     priceChangePerc = '7d',
//     perPage = 10,
//     page = 1,
//   ) =>
//   async dispatch => {
//     dispatch(getAllMarketBegin());

//     try {
//       const {
//         sendMessage,
//         sendJsonMessage,
//         lastMessage,
//         lastJsonMessage,
//         readyState,
//         getWebSocket,
//       } =  useWebSocket(socketUrl, {
//         onOpen: () => {
//           console.log('WebSocket opened');
//           const webSocket =  getWebSocket();

//           webSocket.onmessage = message => {
//             const data = JSON.parse(message.data);
//             // console.log('Data: ' +JSON.stringify(data[0].e));
//             console.log('Data: ' + JSON.stringify(data[0].s));

//             dispatch(getAllMarketSuccess({allMarket: data}));
//           };
//         },
//         shouldReconnect: closeEvent => true,
//       });
//     } catch (error) {
//       console.log("Errorr")
//       console.log("Errorr :: "+error)
//       dispatch(getAllMarketFailure({error}));
//     }
//   };

// export default allMarketSlice.reducer;
