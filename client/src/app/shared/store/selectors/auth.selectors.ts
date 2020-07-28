import { AuthState } from './../reducers/auth.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export const authSelector = createFeatureSelector('auth');

export const errorAuthSelector = createSelector(authSelector, (authState: AuthState) => authState.error);

export const tokenSelector = createSelector(authSelector, (authState: AuthState) => authState.token);

export const isLoggedInSelector = createSelector(authSelector, (authState: AuthState) => authState.isLoggedIn);

export const currentUserSelector = createSelector(authSelector, (authState: AuthState) => authState.user);

