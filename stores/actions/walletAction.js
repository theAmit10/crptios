import axios from 'axios';
import URLHelper from '../../src/api/URLhelper/URLHelper';



export const getMyWallet = ACCESS_TOKEN => async dispatch => {
  const apiUrl = 'https://www.hostmansa.com/crypto/public/api/wallet-list';
  const headers = {
    userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };

  try {
    dispatch({
      type: 'getWalletRequest',
    });
    const response = await axios.get(apiUrl, {
      headers: headers,
    });

    dispatch({
      type: 'getWalletSuccess',
      payload: response.data,
    });

    dispatch({
      type: 'getAllWalletSuccess',
      payload: response.data.data.wallets,
    });

    // console.log('Response SERVER:', response.data.data.wallets.data);
    // return response.data;
  } catch (error) {
    if (error.response) {
      // console.error('Error:', error.response.data);
      dispatch({
        type: 'getWalletFail',
        payload: error.response.data,
      });
      //   return null;
    } else if (error.request) {
      // console.error('Error:', error.request);
      dispatch({
        type: 'getWalletFail',
        payload: error.request,
      });
      //   return null;
    } else {
      // console.error('Error:', error.message);
      dispatch({
        type: 'getWalletFail',
        payload: error.message,
      });
      //   return null;
    }
  }

};
