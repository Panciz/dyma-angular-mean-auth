import { Route } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './shared/guards/auth.guard';

export const APP_ROUTING: Route[] = [
  { path: '', component: HomepageComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'profile', canActivate: [AuthGuard], loadChildren: 'app/profile/profile.module#ProfileModule'}
];
