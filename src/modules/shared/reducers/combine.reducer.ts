import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '../../authentication/reducers/auth.reducer';
import coreSlice from '../../core/reducers/core.reducer';
import editorSlice from '../../core/reducers/editor.reducer';
import baseApi from '../apis/baseApi';

const reducers = combineReducers({
  [editorSlice.reducerPath]: editorSlice.reducer,
  [authReducer.reducerPath]: authReducer.reducer,
  [coreSlice.reducerPath]: coreSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer
});

export default reducers;
