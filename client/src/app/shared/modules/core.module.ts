import { RouterModule } from '@angular/router';
import { SigninComponent } from './../../components/signin/signin.component';
import { SignupComponent } from './../../components/signup/signup.component';
import { HomepageComponent } from './../../components/homepage/homepage.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LayoutModule } from './layout.module';
import { TopbarComponent } from './../components/topbar/topbar.component';

import { AuthGuard } from './../guards/auth.guard';
import { UserService } from './../services/user.service';
import { AuthService } from './../services/auth.service';
import { AuthInterceptor } from './../interceptors/auth.interceptor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule } from '@angular/forms';

const COMPONENTS = [
  HomepageComponent,
  SignupComponent,
  SigninComponent,
  TopbarComponent
];

@NgModule({

  imports: [
    CommonModule, LayoutModule,        ReactiveFormsModule, RouterModule,
    HttpClientModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService,
    UserService,
    AuthGuard,
  ]
})
export class CoreModule { }
