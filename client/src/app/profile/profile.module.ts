import { MaterialModule } from './../shared/modules/material.module';
import { LayoutModule } from './../shared/modules/layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';


@NgModule({
  imports: [
    LayoutModule,
    ProfileRoutingModule,
    CommonModule  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }
