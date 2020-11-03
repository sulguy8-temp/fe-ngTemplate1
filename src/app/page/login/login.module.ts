import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ComponentModule } from 'src/app/common/component/component.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [ 
    CommonModule,
    FormsModule,
    ComponentModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
