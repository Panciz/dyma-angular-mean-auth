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
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
