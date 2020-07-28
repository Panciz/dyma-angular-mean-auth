import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { State } from '../store';
import { isLoggedInSelector } from '../store/selectors/auth.selectors';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private store: Store<State>,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.store.pipe(
        select(isLoggedInSelector),
        take(1)
      );
  }
}
