const {
  configureStore,
  getDefaultMiddleware,
  applyMiddleware,
} = require('@reduxjs/toolkit');
import ThemeReducer from './ThemeSlice';
import holdingsReducer from './holdingsSlice';
import coinMarketReducer from './coinMarketSlice';
import walletDataReducer from './walletDataSlice';
import topLooserReducer from './topLooserSlice';
import allMarketReducer from './allMarketSlice';
import websocketSlice from './websocketSlice';
import thunk from 'redux-thunk';
import websocketDataSlice from './websocketDataSlice';
import assetDetailsSlice from './assetDetailsSlice';
import userAccessTokenSlice from './userAccessTokenSlice';
import ReferralIncomeSlice from './ReferralIncomeSlice';
import {createTicketReducer} from './reducer/createticket';
import {walletReducer} from './reducer/walletReducer';
import {allmarketreducer} from './reducer/allmarketreducer';
import {assetdetailreducer} from './reducer/assetdetailreducer';
import cryptoReducer from './cryptoSlice';
import {searchmarketreducer} from './reducer/searchmarketreducer';
import {tradeReducer} from './reducer/tradereducer';
import {profitReducer} from './reducer/profitreducer';
import { deviceTokenSlice } from './deviceTokenSlice';

const Store = configureStore({
  reducer: {
    theme: ThemeReducer,
    holdings: holdingsReducer,
    coinMarket: coinMarketReducer,
    walletData: walletDataReducer,
    topLooserMarket: topLooserReducer,
    allMarketMarket: allMarketReducer,
    websocket: websocketSlice,
    websocketData: websocketDataSlice,
    assetDetailsData: assetDetailsSlice,
    userAccessToken: userAccessTokenSlice,
    referalData: ReferralIncomeSlice,
    ticket: createTicketReducer,
    wallet: walletReducer,
    allMarket: allmarketreducer,
    assetdetails: assetdetailreducer,
    crypto: cryptoReducer,
    searchmarket: searchmarketreducer,
    tradeDetails: tradeReducer,
    profitData: profitReducer,
    devicetoken: deviceTokenSlice
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default Store;


// const {
//   configureStore,
//   getDefaultMiddleware,
//   applyMiddleware,
// } = require('@reduxjs/toolkit');
// import ThemeReducer from './ThemeSlice';
// import { deviceTokenSlice } from './deviceTokenSlice';

// // const Store = configureStore({
// //   reducer: {
// //     theme: ThemeReducer,
// //     devicetoken: deviceTokenSlice

// //   },
// //   middleware: getDefaultMiddleware({
// //     serializableCheck: false,
// //   })
// //     .concat(thunk)

// //     .filter(
// //       middleware => middleware.name !== 'SerializableStateInvariantMiddleware',
// //     ), // Disable the SerializableStateInvariantMiddleware
// // });

// // import { configureStore } from '@reduxjs/toolkit'

// export const Store = configureStore({
//   reducer: {
//     theme: ThemeReducer,
//   },
// })

// export default Store;
