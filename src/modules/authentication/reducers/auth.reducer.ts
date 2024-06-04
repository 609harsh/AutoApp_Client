import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getCookie, setCookie, unsetCookie } from '../../core/utils/authUtils';
import { authApi } from '../../shared/apis/authApi';
import { RootState } from '../../shared/state';
import { AUTH_INITIAL_STATE } from '../constants';
import { User, type AuthState } from '../interfaces';

const authSlice = createSlice({
  reducerPath: 'auth',
  name: 'auth',
  initialState: AUTH_INITIAL_STATE,
  reducers: {
    login: (state: AuthState, action: PayloadAction<User>) => {
      state.loggedIn = true;
      state.user = action.payload;
      setCookie('accessToken', action.payload.token);
    },
    logout: (state: AuthState) => {
      state.loggedIn = false;
      unsetCookie('accessToken');
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.fetchUserDetails.matchFulfilled, (state, action) => {
        const cookie = getCookie('accessToken');
        state.user = { ...action.payload, token: cookie };
        state.loggedIn = true;
      })
      .addMatcher(authApi.endpoints.fetchUserDetails.matchRejected, (state) => {
        unsetCookie('accessToken');
        state.loggedIn = false;
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        if ('emailSent' in action.payload) {
          return;
        } else {
          state.user = action.payload;
          setCookie('accessToken', action.payload.token);
          state.loggedIn = true;
        }
      })
      .addMatcher(authApi.endpoints.signup.matchFulfilled, (state, action) => {
        if ('msg' in action.payload) {
          return;
        } else {
          state.user = action.payload;
          setCookie('accessToken', action.payload.token);
          state.loggedIn = true;
        }
      })
      .addMatcher(authApi.endpoints.handleInvitation.matchFulfilled, (state, action) => {
        state.user = action.payload;
        setCookie('accessToken', action.payload.token);
        state.loggedIn = true;
      })
      .addMatcher(authApi.endpoints.handleInvitation.matchFulfilled, (state, action) => {
        state.user = action.payload;
        setCookie('accessToken', action.payload.token);
        state.loggedIn = true;
      });
  }
});

export const { login, logout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice;
