import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LeftComponent } from './left/left.component';
import { SearchComponent } from './search/search.component';
@NgModule({
  declarations: [
    HeaderComponent, 
    FooterComponent, 
    LeftComponent, 
    SearchComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent, 
    FooterComponent, 
    LeftComponent, 
    SearchComponent
  ]
})
export class ComponentModule { }
