import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PictureComponent } from './main/picture/picture.component';
import { Picture2Component } from './main/picture2/picture2.component';
import { Picture3Component } from './main/picture3/picture3.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { 
        path: '', 
        redirectTo: '/main/pic1', 
        pathMatch: 'full' 
      },
      {
        path: 'pic1',
        component: PictureComponent
      },
      {
        path: 'pic2',
        component: Picture2Component
      },
      {
        path: 'pic3',
        component: Picture3Component
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
