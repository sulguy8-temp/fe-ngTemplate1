import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo : '/main/pic1',
    pathMatch : 'full'
  },
  {
    path: 'main',
    loadChildren: () => import('./page/main/main.module').then( m => m.MainModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
