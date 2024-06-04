import { type AuthState } from '../interfaces';

export const AUTH_INITIAL_STATE: AuthState = {
  user: {
    id: "",
    username: "",
    phoneNumber: "",
    company: "",
    email: "",
    token: "",
  },
  loggedIn: false
};
