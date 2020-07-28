import { AuthState } from './../reducers/auth.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export const authSelector = createFeatureSelector('auth');

export const errorAuthSelector = createSelector(authSelector, (authState: AuthState) => authState.error);
