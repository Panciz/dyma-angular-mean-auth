import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';


const MODULE = [
  FlexLayoutModule,
  MaterialModule,
  CommonModule
];

@NgModule({
  imports: MODULE,
  exports: MODULE,
})
export class LayoutModule { }
