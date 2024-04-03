import {useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {getAllTicket} from '../stores/actions/createticket';
import {fetchAssetDetailsData} from '../stores/assetDetailsSlice';
import {setTickerData} from '../stores/websocketSlice';
import { fetchDataFromWorkerTa } from '../stores/websocketDataSlice';

export const useCreateTicket = dispatch => {
  const {loading, message, error} = useSelector(state => state.ticket);

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: error,
      });

      console.log('ERROR :: ' + error);

      dispatch({
        type: 'clearError',
      });
    }

    if (message) {
      Toast.show({
        type: 'success',
        text1: message,
      });

      console.log('SUCCESS :: ' + message);
      dispatch({
        type: 'clearMessage',
      });
    }
  }, [error, message, dispatch]);

  return loading;
};

export const useAllMarketData = (dispatch, isFocused) => {
  // const {loading, message, error} = useSelector(state => state.ticket);
  const tickerData = useSelector(state => state.websocket.tickerData);

  useEffect(
    useCallback(() => {
      fetchDataFromWorkerTa()
        .then(marketdata => {
          console.log('Received marketdata:');

          // setData(marketdata);
          dispatch(setTickerData(marketdata));
        })
        .catch(error => {
          console.log('Error fetching data:', error);
        });
    }, [dispatch,isFocused]),
  );

  return tickerData;
};

// export const useGetAllTicket = dispatch => {
//   const {loading, message, error} = useSelector(state => state.ticket);
//   const ACCESS_TOKEN = useSelector(state => state.userAccessToken);

//   useEffect(() => {
//     if (error) {
//       Toast.show({
//         type: 'error',
//         text1: error,
//       });

//       console.log('ERROR :: ' + error);

//       dispatch({
//         type: 'clearError',
//       });
//     }

//     dispatch(getAllTicket(ACCESS_TOKEN.data));
//   }, [error, message,dispatch]);

//   return {loading, message, error};
// };
