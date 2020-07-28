import { Injectable  } from '@angular/core';
import { User } from '../models/user.model';
import { Observable ,  BehaviorSubject ,  timer ,  of ,  Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtToken } from '../models/jwt-token.model';
import { tap,  switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../store';
import { TryRefreshToken } from '../store/actions/auth.actions';

@Injectable()
export class AuthService {

  public jwtToken: BehaviorSubject<JwtToken> = new BehaviorSubject({
    isAuthenticated: null,
    expireDate: null,
    token: null
  });

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<State>
  ) {
    this.initToken();
  }

  public initRefreshToken() {
    return timer(2000, 5000).pipe(
      tap( () => {
        this.store.dispatch(new TryRefreshToken());
      })
    );
  }

  public refreshToken() {
    return this.http.get<string>('/api/auth/refresh-token');
  }

  private initToken(): void {
    const token = localStorage.getItem('jwt');
    if (token) {
      this.jwtToken.next({
        isAuthenticated: true,
        token: token
      });
    } else {
      this.jwtToken.next({
        isAuthenticated: false,
        token: null
      });
    }
  }

  public signup(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/signup', user);
  }

  public signin(credentials: { email: string, password: string}): Observable<string> {
    return this.http.post<string>('/api/auth/signin', credentials);
  }

  public logout(): void {
    this.jwtToken.next({
      isAuthenticated: false,
      token: null
    });
    localStorage.removeItem('jwt');
    this.router.navigate(['/signin']);
  }


}
