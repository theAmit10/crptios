import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import URLHelper from '../src/api/URLhelper/URLHelper';

const ReferralIncomeSlice = createSlice({
  name: 'referalData',
  initialState: {
    loading: false,
    referData: [],
    error: null,
  },
  reducers: {
    getreferalDataBegin: state => {
      state.loading = true;
    },
    getreferalDataSuccess: (state, action) => {
      state.loading = false;
      state.referData = action.payload.referData;
      state.error = null;
    },
    getreferalDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  getreferalDataBegin,
  getreferalDataSuccess,
  getreferalDataFailure,
} = ReferralIncomeSlice.actions;

export const fetchReferalData = () => async dispatch => {
  dispatch(getreferalDataBegin());

  try {
    const apiUrl = URLHelper.REFERREL_DETAILS;
    const bearerToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMTNjMzQyZWVkYjUxMDRlZmNmNDRjOWE1OTYyODQ5ZDM4MDc0OTQ5MDEzMmM5NTQzYWI4NWM1YmEzY2M0OTMwMjcxNzg1ZDJkOTgyZDk0YTIiLCJpYXQiOjE2OTc5OTc5NDQuMTk4ODk1LCJuYmYiOjE2OTc5OTc5NDQuMTk4ODk4LCJleHAiOjE3Mjk2MjAzNDQuMTk4MjA0LCJzdWIiOiI0Iiwic2NvcGVzIjpbXX0.M9y8sRYqKoDIXSJoWHfNra8FaSBaiKHmymZTTFpWLIQVjUsyQrIXMItLpt9Zb9SpdqHUpjzru50ZsAI16LKJAlgAQbI_5J2LG3pEZL6-GdaCgGm1PsbjpynTXaYGMPxM4bVtGfpfb_e699sM2xmEZ3RnVM930FwiSC2P1zbF0aulEg0DtSWRIEOOdMNeFL1SW-z0U85JJbPK0ROJaDFqeLHtdCnFAd3_XP5CGq3H89BIKiAsgpYWcaRGj2tb6DY5e43gIDomUJIDhw_4Hj4wgG6Oi7VurzaubXodmbqHMWyAZKQ188GYRvsswQSFwD4qPxE8FaNhlBpjcOimASSQUBcHHrFGhZQpGO5f1jeNLNTA_v_-TzfqMi7pKF2mFk4vVKrcEwQcbm06Mniw06o--i3wlWgBmuK7MK7juS4zp-fIWU1bA4FnzMZC5RySRZd_u3xwwvVRUswjpgrVkwTAGmw8KTBUdinRdzs6QeY4kh3t6wf5E6omOAdF4U50FLKP0Cm5BHVSdWvNoGbZGQRe6uybERwWdfqbkEcchq0hZoeTLS8mDMauQBkdkeBt1HvCYTPtfOnmAE9WzXMmv4achdknqB6e3gT2bpKIJeqkKGQNH2GdYFwfGcwwRXZkOLBhCVLVY0TYdDv6x5QatwsbxODw15KO1EY2niHNhwkkQ_w';

    const headers = {
      userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
      Authorization: `Bearer ${bearerToken}`,
      Accept: 'application/json',
    };

    const response = await axios.get(apiUrl, {headers});

    console.log("FROM REDUX ")
    // console.log('RESPONSE DATA:', response.data); // Log the response data

    if (response.status === 200) {
      const dataRef = response.data.data;
      const oneData = dataRef.referrals_1;
      const twoData = dataRef.referrals_2;

      const combinedArray = [...oneData, ...twoData];

      console.log('COMBINED ARRAY LENGTH:', combinedArray.length); // Log the combined array length

      dispatch(getreferalDataSuccess({referData: combinedArray}));
    } else {
      console.error('Error - Response Status:', response.status);
      dispatch(getreferalDataFailure({error: response.data}));
    }
  } catch (error) {
    console.error('Error in API request:', error);
    dispatch(getreferalDataFailure({error}));
  }
};



export default ReferralIncomeSlice.reducer;
