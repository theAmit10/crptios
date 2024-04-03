import {createReducer} from '@reduxjs/toolkit';

export const assetdetailreducer = createReducer(
  {
    x: [],
    y: [],
  },
  builder => {
    
    builder.addCase('getAssetDetailsRequest', state => {
      state.loading = true;
    });

    builder.addCase('getAssetDetailsSuccess', (state, action) => {
      state.loading = false;
      state.assetDetailsData = action.payload;
    });
    builder.addCase('getAssetXaxisSuccess', (state, action) => {
      state.loading = false;
      state.x = action.payload;
    });
    builder.addCase('getAssetYaxisSuccess', (state, action) => {
      state.loading = false;
      state.y = action.payload;
    });

    builder.addCase('getAssetDetailsFail', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase('clearError', state => {
      state.error = null;
    });
    builder.addCase('clearAssetData', state => {
      state.x = [];
      state.y = [];
    });
  },
);
