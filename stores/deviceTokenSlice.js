import {createSlice} from '@reduxjs/toolkit';

export const deviceTokenSlice = createSlice({
  name: 'devicetoken',
  initialState: {
    data: 'sdds',
  },
  reducers: {
    addDeviceToken(state, action) {
      state.data = action.payload;
    },
  },
});

export const {addDeviceToken} = deviceTokenSlice.actions;
export default deviceTokenSlice.reducer;
