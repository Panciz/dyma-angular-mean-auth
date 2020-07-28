import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user.model';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from '../shared/store';
import { currentUserSelector } from '../shared/store/selectors/auth.selectors';
import { TryFetchCurrentUser } from '../shared/store/actions/auth.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public currentUser$: Observable<User>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.currentUser$ = this.store.pipe(select(currentUserSelector));
    this.store.dispatch(new TryFetchCurrentUser());
  }

}
