import { Logout } from './../../store/actions/auth.actions';
import { isLoggedInSelector } from './../../store/selectors/auth.selectors';
import { Store, select } from '@ngrx/store';
import { State } from './../../store/index';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { JwtToken } from '../../models/jwt-token.model';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  public subscription: Subscription;
  public isLoggedIn$: Observable<Boolean>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedInSelector));
  }

  public logout() {
    this.store.dispatch(new Logout());
  }

}
