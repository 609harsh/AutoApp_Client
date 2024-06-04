import { User } from '../../authentication/interfaces';
import baseApi from './baseApi';

export type loginForm = {
  email: string;
  password: string;
};

export type signupForm = {
  email: string;
  password: string;
  name: string;
  phone: string;
};

export type invitationForm = {
  company: string;
  phoneNumber: string;
  userId: string;
  token: string;
};

export type LoginInfo = {
  msg: string;
  emailSent: boolean;
};

export type SignupInfo = {
  msg: Object;
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchUserDetails: build.query<User, string>({
      query: (token) => {
        return {
          url: 'auth',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
      }
    }),
    login: build.mutation<User | LoginInfo, loginForm>({
      query: (credentials) => {
        return {
          url: 'auth/signin',
          method: 'POST',
          body: credentials
        };
      },
      invalidatesTags: ['User']
    }),
    signup: build.mutation<User | SignupInfo, signupForm>({
      query: (credentials) => {
        return {
          url: 'auth/signup',
          method: 'POST',
          body: credentials
        };
      },
      invalidatesTags: ['User']
    }),
    handleInvitation: build.mutation<User, invitationForm>({
      query: ({ company, phoneNumber, userId }) => {
        return {
          url: 'auth/setup-account-from-token',
          method: 'POST',
          body: {
            company,
            phoneNumber,
            userId
          }
        };
      },
      transformResponse: (response: User, meta, arg) => {
        return {
          ...response,
          token: arg.token
        };
      },
      invalidatesTags: ['User']
    })
  })
});

export const {
  useLoginMutation,
  useSignupMutation,
  useHandleInvitationMutation,
  useFetchUserDetailsQuery
} = authApi;
