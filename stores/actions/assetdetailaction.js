import axios from 'axios';
import URLHelper from '../../src/api/URLhelper/URLHelper';

export const getAssetDetails =
  (chartPrices, intervalString) => async dispatch => {
    const apiUrl = `https://api.binance.com/api/v3/klines?symbol=${chartPrices}&interval=${intervalString}`;

    try {
      dispatch({
        type: 'getAssetDetailsRequest',
      });

      const response = await axios.get(apiUrl);
      console.log('REQUEST STARTED');

      const da = response.data;
      const xValues = da.map(item => item[0]);
      const yValues = da.map(item => item[1]);

      dispatch({
        type: 'getAssetXaxisSuccess',
        payload: xValues,
      });
      dispatch({
        type: 'getAssetYaxisSuccess',
        payload: yValues,
      });

      // return response.data;
    } catch (error) {
      console.log(error);
      if (error.response) {
        // console.error('Error:', error.response.data);
        dispatch({
          type: 'getAssetDetailsFail',
          payload: error.response.data,
        });
        //   return null;
      } else if (error.request) {
        // console.error('Error:', error.request);
        dispatch({
          type: 'getAssetDetailsFail',
          payload: error.request,
        });
        //   return null;
      } else {
        // console.error('Error:', error.message);
        dispatch({
          type: 'getAssetDetailsFail',
          payload: error.message,
        });
        //   return null;
      }
    }
  };

export const assetPriceDetails = itemId => async dispatch => {
  const apiUrl = `https://api.binance.com/api/v1/ticker/24hr?symbol=${itemId.s}`;

  try {
    dispatch({
      type: 'getAssetDetailsRequest',
    });

    const response = await axios.get(apiUrl);

    console.log('Response:', response.data);

    dispatch({
      type: 'getAssetDetailsSuccess',
      payload: response.data,
    });

    // return response.data;
  } catch (error) {
    console.log(error);
    if (error.response) {
      // console.error('Error:', error.response.data);
      dispatch({
        type: 'getAssetDetailsFail',
        payload: error.response.data,
      });
      //   return null;
    } else if (error.request) {
      // console.error('Error:', error.request);
      dispatch({
        type: 'getAssetDetailsFail',
        payload: error.request,
      });
      //   return null;
    } else {
      // console.error('Error:', error.message);
      dispatch({
        type: 'getAssetDetailsFail',
        payload: error.message,
      });
      //   return null;
    }
  }
};
