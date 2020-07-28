import { UserService } from './../../services/user.service';
import { tokenSelector } from './../selectors/auth.selectors';
import { State } from './../index';
import { Store, select } from '@ngrx/store';
import { TrySignin, SigninSuccess, SigninError, SetCurrentUser, TryFetchCurrentUser } from './../actions/auth.actions';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthActionTypes, TrySignup, SignupSuccess, SignupError } from '../actions/auth.actions';
import { map, exhaustMap, catchError, tap, switchMap, withLatestFrom } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { of, Subscription, empty } from 'rxjs';

@Injectable()
export class AuthEffects {
  private subscription: Subscription;

  @Effect()
  trySignup$ = this.actions$.pipe(
    ofType<TrySignup>(AuthActionTypes.TrySignup),
    map((action: TrySignup) => action.payload),
    exhaustMap((user: User) =>
      this.authService
        .signup(user)
        .pipe(
          map(user => new SignupSuccess(user)),
          //si potrebbe anche non inviare un azione e utilizzae empty
          //map(user => empty()),
          catchError(error => of(new SignupError(error)))
        )
    )
  );

  @Effect({ dispatch: false })
  signupSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.SignupSuccess),
    tap(() => this.router.navigate(['/signin']))
  );


  @Effect()
  trySignin$ = this.actions$.pipe(
    ofType<TrySignin>(AuthActionTypes.TrySignin),
    map((action: TrySignin) => action.payload),
    exhaustMap((credentials: { email: string, password: string }) =>
      this.authService
        .signin(credentials)
        .pipe(
          map(token => new SigninSuccess(token)),
          catchError(error => of(new SigninError(error)))
        )
    )
  );

  @Effect({ dispatch: false })
  signinSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.SigninSuccess),
    map((action: SigninSuccess) => action.payload),
    tap((token) => {
      localStorage.setItem('token', token);
      if (!this.subscription) {
        this.subscription = this.authService.initRefreshToken().subscribe();
      }
      this.router.navigate(['/']);
    })
  );

  @Effect()
  tryRefreshToken$ = this.actions$.pipe(
    ofType(AuthActionTypes.TryRefreshToken),
    //Gestisco il caso iniziale potrei chiamare il refresh senza avere un token
    withLatestFrom(this.store.pipe(select(tokenSelector))),
    switchMap(([action, token]) => {
      if (token) {
        return this.authService.refreshToken()
          .pipe(
            map(newToken => new SigninSuccess(newToken)),
            catchError(() => {
              localStorage.removeItem('token');
              return empty();
            })
          );
      } else {
        return  empty();
      }
    }
    )
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType(AuthActionTypes.Logout),
    tap(() => {
      if (this.subscription) {
        this.subscription.unsubscribe();
        this.subscription = null;
      }
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    })
  );
  @Effect()
  tryFetchCurrentUser$ = this.actions$.pipe(
    ofType(AuthActionTypes.TryFetchUser),
    switchMap(() => this.userService.getCurrentUser()),
    map((user: User) => new SetCurrentUser(user)),
    catchError((error: any) => {
      console.log(error);
      return empty();
    })
  );
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserService,

    private router: Router,
    private store: Store<State>
  ) { }
}


