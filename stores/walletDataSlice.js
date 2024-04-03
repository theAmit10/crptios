import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const walletDataSlice = createSlice({
  name: 'walletMarket',
  initialState: {
    loading: false,
    wallets: [],
    error: null,
  },
  reducers: {
    getwalletMarketBegin: state => {
      state.loading = true;
    },
    getwalletMarketSuccess: (state, action) => {
      state.loading = false;
      state.wallets = action.payload.wallets;
      state.error = null;
    },
    getwalletMarketFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  getwalletMarketBegin,
  getwalletMarketSuccess,
  getwalletMarketFailure,
} = walletDataSlice.actions;

export const fetchwalletMarket =
  (
    currency = 'usd',
    orderBy = 'market_cap_desc',
    sparkline = true,
    priceChangePerc = '7d',
    perPage = 10,
    page = 1,
  ) =>
  async dispatch => {
    dispatch(getwalletMarketBegin());

    const apiUrl = 'https://www.hostmansa.com/crypto/public/api/wallet-list';
    const bearerToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMGE5ZTY1YTM2ZWQ2NDNlOWYzZDRhOGNlZTAwMDQ3Y2U1ZTE1ZDQyYWRjNzVmZTQ0NjBjMTBjNjFjOTVhOWY3NzA4NmRmYTYyOWQ3N2JlZTciLCJpYXQiOjE2OTgwNjIzMTkuNzQ2OTcxLCJuYmYiOjE2OTgwNjIzMTkuNzQ2OTc1LCJleHAiOjE3Mjk2ODQ3MTkuNzQ2MTAzLCJzdWIiOiIxMCIsInNjb3BlcyI6W119.TkRGB7JiajYr_zVD30uiT30Xe1XOKFdTR5Tdhp9w8V7gsXS1nVPWDhKzg5g4H0aZwgAs_ROmrrk32PcsQXQF4mkdAZDzxJAZJOjhsAUpzHXnmF_o4ls-YejbqV1P1cvpLIJNYm5TUV2c4H2huC4QKqD3B6Cb_p8t49G0UdB8Hl7xd39A4TqWxsbTBi_GqrX6Hm33Tmf7VvRwYEiOMpKN91lVwSRWJISMMV9q0ndKvbMerw5DtHKdAa4DWlalBOmkvRY5qJzAmYBV9-5bczKFJ1IfKtHV7072q08Ie1J7IVcXoLwSmjxtodd55PN0YCE8mCbY65qLCtD0MVTYHhQMODVpIkFz9av37veldCqcaATSzh_bkD4M1TyzVfzQ9y5f-9GW4n1DFOQ9UTGIe0NQxL33qbEyJVvsDbt4Zm_moF_MrxFPS6ZpRcuy7DYTWIgF1rMDBsAKnmHdySClsXFQFnueiVwZ3ceAf9kNCf9u1mkNR1-FTqcvm6ZQwELe5P4Nz9Y8oRMvvIDA6egK7wZi5w2iiycoTkK8m_H7yNZ5I585_a1ebL9Qx46FHd3ujNi1nIELocn7u89Y0MN_RwgyGWJ4JuP2IZatB7wrU9Be6K3mCdNmbLbZlbnN4lC2FqSFflg94jhh7VGUrFqcggMxkYr-BaY0NR8PzULK_3wHta4';

    const headers = {
      userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
      Authorization: `Bearer ${bearerToken}`,
    };

    try {
      const response = await axios.get(apiUrl, {headers});
      console.log('REQUEST WALLET STARTED');
        console.log('Response:', response.data.data.wallets);
      if (response.status === 200) {
        dispatch(getwalletMarketSuccess({wallets: response.data}));
      } else {
        dispatch(getwalletMarketFailure({error: response.data}));
      }
    } catch (error) {
      if (error.response) {
        console.error('Error:', error.response);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

export default walletDataSlice.reducer;
