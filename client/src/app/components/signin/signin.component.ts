import { TrySignin } from './../../shared/store/actions/auth.actions';
import { errorAuthSelector } from './../../shared/store/selectors/auth.selectors';
import { Observable } from 'rxjs';
import { State } from './../../shared/store/index';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public form: FormGroup;
  public error$: Observable<Object>;

  constructor(
    private store: Store<State>,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [''],
      password: ['']
    });
    this.error$ = this.store.pipe(
      select(errorAuthSelector)
    );
  }

  public submit(): void {
    this.store.dispatch(new TrySignin(this.form.value));

  /*  this.authService.signin(this.form.value).subscribe( () => {
      this.router.navigate(['/']);
    }, err => {
      this.error = err.error;
    });*/

  }


}
