import axios from 'axios';
import URLHelper from '../../src/api/URLhelper/URLHelper';

export const getCurrencyDetails = ACCESS_TOKEN => async dispatch => {
  const apiUrl = URLHelper.ABOUT_CRYPTO;

  const headers = {
    userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };

  try {
    dispatch({
      type: 'tradeRequest',
    });
    const response = await axios.get(apiUrl, {
      headers: headers,
    });

    console.log("Currency Details Trade Action :: "+response.data.currency_detail)

    dispatch({
      type: 'tradeSuccess',
      payload: response.data.currency_detail,
    });

    // dispatch({
    //   type: 'tradeExchangeSuccess',
    //   payload: response.data.currency_detail.exchange_fee,
    // });
    // dispatch({
    //   type: 'tradeRateSuccess',
    //   payload: response.data.currency_detail.rate,
    // });

    // console.log('Response SERVER:', response.data.data.wallets.data);
    // return response.data;
  } catch (error) {
    if (error.response) {
      // console.error('Error:', error.response.data);
      dispatch({
        type: 'tradeFail',
        payload: error.response.data,
      });
      //   return null;
    } else if (error.request) {
      // console.error('Error:', error.request);
      dispatch({
        type: 'tradeFail',
        payload: error.request,
      });
      //   return null;
    } else {
      // console.error('Error:', error.message);
      dispatch({
        type: 'tradeFail',
        payload: error.message,
      });
      //   return null;
    }
  }
};

export const getINRtoUSDTCurrencyDetails = ACCESS_TOKEN => async dispatch => {
  const apiUrl = URLHelper.API_INR_USDT;

  const headers = {
    userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };

  try {
    dispatch({
      type: 'tradeRequest',
    });
    const response = await axios.get(apiUrl, {
      headers: headers,
    });

    console.log('INRtoUSDT : ' + JSON.stringify(response.data.data));

    dispatch({
      type: 'tradeINRtoUSDTSuccess',
      payload: response.data.data,
    });
  } catch (error) {
    if (error.response) {
      dispatch({
        type: 'tradeFail',
        payload: error.response.data,
      });
    } else if (error.request) {
      dispatch({
        type: 'tradeFail',
        payload: error.request,
      });
    } else {
      dispatch({
        type: 'tradeFail',
        payload: error.message,
      });
    }
  }
};

export const getUSDTtoINRCurrencyDetails = ACCESS_TOKEN => async dispatch => {
  const apiUrl = URLHelper.API_USDT_INR;

  const headers = {
    userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };

  try {
    dispatch({
      type: 'tradeRequest',
    });
    const response = await axios.get(apiUrl, {
      headers: headers,
    });

    console.log('USDTtoINR : ' + JSON.stringify(response.data.data));

    dispatch({
      type: 'tradeUSDTtoINRSuccess',
      payload: response.data.data,
    });
  } catch (error) {
    if (error.response) {
      dispatch({
        type: 'tradeFail',
        payload: error.response.data,
      });
    } else if (error.request) {
      dispatch({
        type: 'tradeFail',
        payload: error.request,
      });
    } else {
      dispatch({
        type: 'tradeFail',
        payload: error.message,
      });
    }
  }
};
