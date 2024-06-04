import { type User } from '.';

export interface AuthState {
  user: User;
  loggedIn: boolean;
  
}
