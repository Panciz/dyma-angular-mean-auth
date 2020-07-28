import { TrySignin, SigninSuccess, SigninError } from './../actions/auth.actions';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthActionTypes, TrySignup, SignupSuccess, SignupError } from '../actions/auth.actions';
import { map, exhaustMap, catchError, tap, switchMap } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { of, Subscription } from 'rxjs';

@Injectable()
export class AuthEffects {
  private subscription: Subscription;

 @Effect()
 trySignup$ = this.actions$.pipe(
   ofType<TrySignup>(AuthActionTypes.TrySignup),
   map( (action: TrySignup) => action.payload),
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
   map( (action: TrySignin) => action.payload),
   exhaustMap((credentials: {email: string, password: string}) =>
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
   map( (action: SigninSuccess) => action.payload),
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
   switchMap(() =>
     this.authService.refreshToken()
       .pipe(
           map(token => {
             return new SigninSuccess(token);
           }),
           catchError(() => {
             localStorage.removeItem('token');
             return of(null);
           })
         )
   )
 );

 constructor(
   private actions$: Actions,
   private authService: AuthService,
   private router: Router
 ) {}
}


