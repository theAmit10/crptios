import newWs from '../../utils/searchconnection';

export const connectToBinanceWebsocket = () => async dispatch => {
  try {
    newWs.onopen();
    dispatch({
      type: 'connetedBinanceResponse',
    });
  } catch (error) {
    dispatch({
      type: 'clearsearchmarketError',
      payload: error,
    });
  }
};

export const subscribeToBinanceWebsocket =
  subscriptionData => async dispatch => {
    try {
      console.log('newWs.readyState :: ' + newWs.readyState);
      console.log('WebSocket.OPEN :: ' + WebSocket.OPEN);
      if (newWs && newWs.readyState === WebSocket.OPEN) {
        console.log('YOU CAN SUBSCRIBE');
        console.log('TO ' + subscriptionData);
        newWs.send(JSON.stringify(subscriptionData));

         newWs.onmessage = e =>  {
          
          try {
            const data =  JSON.parse(e.data);

            if (Array.isArray(data)) {
              const hundredData = data.slice(0, 99);
              // console.log(
              //   'Search HM Connection :: ' +
              //     hundredData[0].s +
              //     ' :: ' +
              //     hundredData.length,
              // );
              dispatch({
                type: 'subscribedAllMarketResponse',
                payload: hundredData,
              });
            } else {
              console.log('Received data is not an array');
            }
          } catch (error) {
            console.log('Error parsing or processing data:', error);
          }
        };

        // const da = newWs.onmessage()

        // console.log("DA LENGTH :: "+da.length)
      } else {
        console.log('No WebSocket connection to unsubscribe from');
      }
    } catch (error) {
      dispatch({
        type: 'clearsearchmarketError',
        payload: error,
      });
    }
  };

export const unsubscribeToBinanceWebsocket =
  unsubscriptionData => async dispatch => {
    try {
      console.log('newWs.readyState :: ' + newWs.readyState);
      console.log('WebSocket.OPEN :: ' + WebSocket.OPEN);
      if (newWs && newWs.readyState === WebSocket.OPEN) {
        console.log('YOU CAN UNSUBSCRIBE');
        console.log('TO ' + unsubscriptionData);
        newWs.send(JSON.stringify(unsubscriptionData));
      } else {
        console.log('No WebSocket connection to unsubscribe from');
      }
    } catch (error) {
      dispatch({
        type: 'clearsearchmarketError',
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
