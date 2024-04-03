import axios from 'axios';
import URLHelper from '../../src/api/URLhelper/URLHelper';

export const getMyProfit = ACCESS_TOKEN => async dispatch => {
  const apiUrl = URLHelper.API_PROFIT;

  const temp =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMTNjMzQyZWVkYjUxMDRlZmNmNDRjOWE1OTYyODQ5ZDM4MDc0OTQ5MDEzMmM5NTQzYWI4NWM1YmEzY2M0OTMwMjcxNzg1ZDJkOTgyZDk0YTIiLCJpYXQiOjE2OTc5OTc5NDQuMTk4ODk1LCJuYmYiOjE2OTc5OTc5NDQuMTk4ODk4LCJleHAiOjE3Mjk2MjAzNDQuMTk4MjA0LCJzdWIiOiI0Iiwic2NvcGVzIjpbXX0.M9y8sRYqKoDIXSJoWHfNra8FaSBaiKHmymZTTFpWLIQVjUsyQrIXMItLpt9Zb9SpdqHUpjzru50ZsAI16LKJAlgAQbI_5J2LG3pEZL6-GdaCgGm1PsbjpynTXaYGMPxM4bVtGfpfb_e699sM2xmEZ3RnVM930FwiSC2P1zbF0aulEg0DtSWRIEOOdMNeFL1SW-z0U85JJbPK0ROJaDFqeLHtdCnFAd3_XP5CGq3H89BIKiAsgpYWcaRGj2tb6DY5e43gIDomUJIDhw_4Hj4wgG6Oi7VurzaubXodmbqHMWyAZKQ188GYRvsswQSFwD4qPxE8FaNhlBpjcOimASSQUBcHHrFGhZQpGO5f1jeNLNTA_v_-TzfqMi7pKF2mFk4vVKrcEwQcbm06Mniw06o--i3wlWgBmuK7MK7juS4zp-fIWU1bA4FnzMZC5RySRZd_u3xwwvVRUswjpgrVkwTAGmw8KTBUdinRdzs6QeY4kh3t6wf5E6omOAdF4U50FLKP0Cm5BHVSdWvNoGbZGQRe6uybERwWdfqbkEcchq0hZoeTLS8mDMauQBkdkeBt1HvCYTPtfOnmAE9WzXMmv4achdknqB6e3gT2bpKIJeqkKGQNH2GdYFwfGcwwRXZkOLBhCVLVY0TYdDv6x5QatwsbxODw15KO1EY2niHNhwkkQ_w';
  const headers = {
    userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };

  try {
    dispatch({
      type: 'getProfitRequest',
    });
    const response = await axios.get(apiUrl, {
      headers: headers,
    });

    // console.log('Profit Data API :: ' + response.data.data);
     console.log('Profit Data API :: FOUND' );

    // dispatch({
    //   type: 'getProfitSuccess',
    //   payload: response.data.data,
    // });

    dispatch({
      type: 'getAllProfitSuccess',
      payload: response.data.data,
    });

    // console.log('Response SERVER:', response.data.data.wallets.data);
    // return response.data;
  } catch (error) {
    console.log('Error:', error);
    if (error.response) {
      // console.error('Error:', error.response.data);
      dispatch({
        type: 'getProfitFail',
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
        type: 'getProfitFail',
        payload: error.message,
      });
      //   return null;
    }
  }
};

export const getMyReferralProfit = ACCESS_TOKEN => async dispatch => {
  // const apiUrl = URLHelper.API_PROFIT;

  // const temp =
  //   'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMTNjMzQyZWVkYjUxMDRlZmNmNDRjOWE1OTYyODQ5ZDM4MDc0OTQ5MDEzMmM5NTQzYWI4NWM1YmEzY2M0OTMwMjcxNzg1ZDJkOTgyZDk0YTIiLCJpYXQiOjE2OTc5OTc5NDQuMTk4ODk1LCJuYmYiOjE2OTc5OTc5NDQuMTk4ODk4LCJleHAiOjE3Mjk2MjAzNDQuMTk4MjA0LCJzdWIiOiI0Iiwic2NvcGVzIjpbXX0.M9y8sRYqKoDIXSJoWHfNra8FaSBaiKHmymZTTFpWLIQVjUsyQrIXMItLpt9Zb9SpdqHUpjzru50ZsAI16LKJAlgAQbI_5J2LG3pEZL6-GdaCgGm1PsbjpynTXaYGMPxM4bVtGfpfb_e699sM2xmEZ3RnVM930FwiSC2P1zbF0aulEg0DtSWRIEOOdMNeFL1SW-z0U85JJbPK0ROJaDFqeLHtdCnFAd3_XP5CGq3H89BIKiAsgpYWcaRGj2tb6DY5e43gIDomUJIDhw_4Hj4wgG6Oi7VurzaubXodmbqHMWyAZKQ188GYRvsswQSFwD4qPxE8FaNhlBpjcOimASSQUBcHHrFGhZQpGO5f1jeNLNTA_v_-TzfqMi7pKF2mFk4vVKrcEwQcbm06Mniw06o--i3wlWgBmuK7MK7juS4zp-fIWU1bA4FnzMZC5RySRZd_u3xwwvVRUswjpgrVkwTAGmw8KTBUdinRdzs6QeY4kh3t6wf5E6omOAdF4U50FLKP0Cm5BHVSdWvNoGbZGQRe6uybERwWdfqbkEcchq0hZoeTLS8mDMauQBkdkeBt1HvCYTPtfOnmAE9WzXMmv4achdknqB6e3gT2bpKIJeqkKGQNH2GdYFwfGcwwRXZkOLBhCVLVY0TYdDv6x5QatwsbxODw15KO1EY2niHNhwkkQ_w';
  // const headers = {
  //   userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
  //   'Content-Type': 'multipart/form-data',
  //   Authorization: `Bearer ${temp}`,
  // };

  const apiUrl = URLHelper.REFERREL_DETAILS;
  const bearerToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMTNjMzQyZWVkYjUxMDRlZmNmNDRjOWE1OTYyODQ5ZDM4MDc0OTQ5MDEzMmM5NTQzYWI4NWM1YmEzY2M0OTMwMjcxNzg1ZDJkOTgyZDk0YTIiLCJpYXQiOjE2OTc5OTc5NDQuMTk4ODk1LCJuYmYiOjE2OTc5OTc5NDQuMTk4ODk4LCJleHAiOjE3Mjk2MjAzNDQuMTk4MjA0LCJzdWIiOiI0Iiwic2NvcGVzIjpbXX0.M9y8sRYqKoDIXSJoWHfNra8FaSBaiKHmymZTTFpWLIQVjUsyQrIXMItLpt9Zb9SpdqHUpjzru50ZsAI16LKJAlgAQbI_5J2LG3pEZL6-GdaCgGm1PsbjpynTXaYGMPxM4bVtGfpfb_e699sM2xmEZ3RnVM930FwiSC2P1zbF0aulEg0DtSWRIEOOdMNeFL1SW-z0U85JJbPK0ROJaDFqeLHtdCnFAd3_XP5CGq3H89BIKiAsgpYWcaRGj2tb6DY5e43gIDomUJIDhw_4Hj4wgG6Oi7VurzaubXodmbqHMWyAZKQ188GYRvsswQSFwD4qPxE8FaNhlBpjcOimASSQUBcHHrFGhZQpGO5f1jeNLNTA_v_-TzfqMi7pKF2mFk4vVKrcEwQcbm06Mniw06o--i3wlWgBmuK7MK7juS4zp-fIWU1bA4FnzMZC5RySRZd_u3xwwvVRUswjpgrVkwTAGmw8KTBUdinRdzs6QeY4kh3t6wf5E6omOAdF4U50FLKP0Cm5BHVSdWvNoGbZGQRe6uybERwWdfqbkEcchq0hZoeTLS8mDMauQBkdkeBt1HvCYTPtfOnmAE9WzXMmv4achdknqB6e3gT2bpKIJeqkKGQNH2GdYFwfGcwwRXZkOLBhCVLVY0TYdDv6x5QatwsbxODw15KO1EY2niHNhwkkQ_w';

  const headers = {
    userapisecret: 'h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp',
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };

  try {
    dispatch({
      type: 'getProfitRequest',
    });
    const response = await axios.get(apiUrl, {
      headers: headers,
    });

    console.log('Referral Profit Data API :: ' + response.data.data.referrals);

    dispatch({
      type: 'getReferralProfitSuccess',
      payload: response.data.data.referrals,
    });
  } catch (error) {
    console.log(error);
    if (error.response) {
      dispatch({
        type: 'getProfitFail',
        payload: error.response.data,
      });
    } else if (error.request) {
      dispatch({
        type: 'getWalletFail',
        payload: error.request,
      });
    } else {
      dispatch({
        type: 'getProfitFail',
        payload: error.message,
      });
    }
  }
};
