import { AuthActionTypes, AuthActions } from './../actions/auth.actions';
import { User } from './../../models/user.model';
import { Action } from '@ngrx/store';
export interface AuthState {
  user: User,
  token: string,
  error: string,
  isLoggedIn: boolean;

};

export const initialAuthState: AuthState = {
  user: null,
  //all'inizio provo a loggarmi con quello che trovo nel local
  token: localStorage.getItem('token'),
  isLoggedIn: false,
  error: null
};
  export function authReducer(state: AuthState = initialAuthState, action: AuthActions) {
    switch (action.type) {
      case AuthActionTypes.SigninError:
      case AuthActionTypes.SignupError: {
        return {
          ...state,
          error: action.payload
        };
      }
      case AuthActionTypes.SigninSuccess: {
        return {
          ...state,
          token: action.payload,
          isLoggedIn: true,
          error: null
        };
      }
      case AuthActionTypes.Logout: {
        return {
          ...state,
          token: null,
          isLoggedIn: false,
          error: null,
          user: null
        };
      }
      case AuthActionTypes.SetCurrentUser: {
        return {
          ...state,
          user: action.payload
        };
      }
    }
    return state;
  }
