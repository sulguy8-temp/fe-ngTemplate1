import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './page/main/main/main.component';
import { SignInComponent } from './page/main/main/sign-in/sign-in.component';
import { SignUpComponent } from './page/main/main/sign-up/sign-up.component';
import { PasswordComponent } from './page/main/main/password/password.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentModule } from './common/component/component.module';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent, 
    SignInComponent, 
    SignUpComponent, 
    PasswordComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ComponentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
