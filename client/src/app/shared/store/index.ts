import { authReducer, AuthState } from './reducers/auth.reducer';

import { ActionReducerMap } from '@ngrx/store';

export interface State {
  auth: AuthState;
}

export const reducerMap: ActionReducerMap<State> = {
  auth: authReducer
};
