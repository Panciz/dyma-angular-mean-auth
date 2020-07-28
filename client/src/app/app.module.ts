import { AuthEffects } from './shared/store/effects/auth.effects';
import { reducerMap } from './shared/store/index';
import { environment } from './../environments/environment.prod';
import { ProfileModule } from './profile/profile.module';
import { CoreModule } from './shared/modules/core.module';

// modules natifs
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// modules

// components
import { AppComponent } from './app.component';


// routing
import { APP_ROUTING } from './app.routing';

//ngrx

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ProfileModule,
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(APP_ROUTING),
    StoreModule.forRoot(reducerMap),
    StoreDevtoolsModule.instrument({
      name:'ngrx photo',
      logOnly: environment.production
    }),
    EffectsModule.forRoot([AuthEffects]),

  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
