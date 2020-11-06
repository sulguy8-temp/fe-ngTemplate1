import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PressDirective } from './press/press.directive';
import { ErrorDirective } from './error/error.directive';

@NgModule({
  declarations: [
    PressDirective,
    ErrorDirective
  ],
  imports: [
    CommonModule 
  ],
  exports: [
    PressDirective,
    ErrorDirective
  ]
})
export class DirectiveModule { }
