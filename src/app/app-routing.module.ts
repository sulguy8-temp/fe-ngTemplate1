import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouterGuardService } from './common/service/router-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo : '/login',
    pathMatch : 'full'
  },
  {
    path: 'main',
    loadChildren: () => import('./page/main/main.module').then( m => m.MainModule),
    canActivate: [RouterGuardService] 
  },
  {
    path: 'login',
    loadChildren: () => import('./page/login/login.module').then( m => m.LoginModule) 
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
