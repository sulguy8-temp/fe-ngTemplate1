import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivate, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CustomerInfoService } from './customer-info.service';
import { NavigateService } from './navigate.service';
import { CommonControllerService } from './common-controller.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})

export class RouterGuardService implements CanActivate {
  constructor(
    private _router:Router,
    private ac: ActivatedRoute,
    private lc: Location,
    private ci: CustomerInfoService,
    private navigate : NavigateService,
    private cc: CommonControllerService,
    private ss: StorageService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url = this.lc.path();    
    if(url == ''){
      if(this.userAuthGuard()){
        return true;
      }else{
        return false;
      }
    }
  }

  userAuthGuard(){
    if(this.ci.isLogined && this.ss.getItem('usi') && this.ci.usi.usiNum != 0){
      debugger
      return true;
    }else{
      debugger
      var conf = {
        buttons: [
          {
            text: '예',
            handler: () => {
              this._router.navigateByUrl('login');
              }
          },
          {
            text: '아니오',
            role: 'cancle',
            handler: () => {
              return false;
            }
          }
        ]
      }
      this.navigate.goPage('/login')
    }
  }
}
