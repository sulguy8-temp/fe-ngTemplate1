import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SampleRoutingModule } from './sample-routing.module';
import { Form1Component } from './form1/form1.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SampleResult } from 'src/app/page/sample/common/vo/s-user-info';

@NgModule({
  declarations: [
    Form1Component,
  ],
  imports: [
    CommonModule,
    SampleRoutingModule,

    // ngIf, ngFor 같은 디렉티브 사용할 때
    FormsModule,
    // formGroup, formControl 사용할 때
    ReactiveFormsModule
    ],
  providers: [
    SampleResult
  ]

})
export class SampleModule { }
