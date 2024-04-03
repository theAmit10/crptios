// import {addSubscribedSearchData} from '../stores/actions/searchmarketaction';

import { settingSearchMarketData } from "../stores/reducer/searchmarketreducer";

const socketUrl = 'wss://stream.binance.com:9443/ws';
let newWs = new WebSocket(socketUrl);

export const addSubscribedSearchData = value => {
  return value;
};

newWs.onopen = () => {
  console.log('WebSocket connected');
  const subscriptionData = {
    method: 'SUBSCRIBE',
    params: ['!ticker@arr'],
    id: 1,
  };

  try {
    console.log('newWs.readyState :: ' + newWs.readyState);
    // newWs.send(JSON.stringify(subscriptionData));
  } catch (error) {
    console.log(error);
  }
};

newWs.onmessage = e => {
  try {
    const data = JSON.parse(e.data);

    if (Array.isArray(data)) {
      const hundredData = data.slice(0, 99);
      // console.log(
      //   'Search Connection :: ' +
      //     hundredData[0].s +
      //     ' :: ' +
      //     hundredData.length,
      // );

    } else {
      console.log('Received data is not an array');
    }
  } catch (error) {
    console.log('Error parsing or processing data:', error);
  }
};

newWs.onerror = e => {
  console.log('Error Found');
  console.log(e.message);
  //   reject(e.message);
};

newWs.onclose = e => {
  console.log('onclose Found');
  console.log(e.code, e.reason);
};

export default newWs;
