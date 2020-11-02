import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponentModule } from 'src/app/common/component/component.module';
import { DirectiveModule } from 'src/app/common/directive/directive.module';

import { MainRoutingModule } from './main-routing.module';
import { PictureComponent } from './main/picture/picture.component';
import { Picture2Component } from './main/picture2/picture2.component';


@NgModule({
  declarations: [
    PictureComponent,
    Picture2Component
  ],
  imports: [
    CommonModule,
    FormsModule,
    MainRoutingModule,
    ComponentModule,
    DirectiveModule
  ]
})
export class MainModule { }
