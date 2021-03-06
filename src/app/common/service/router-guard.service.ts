import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivate, ActivatedRoute } from '@angular/router';
import { CustomerInfoService } from './customer-info.service';
import { NavigateService } from './navigate.service';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root'
})

export class RouterGuardService implements CanActivate {
  constructor(
    private ci: CustomerInfoService,
    private navigate: NavigateService,
    private ss: StorageService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.userAuthGuard().then(
        res => {
          resolve(res);
        }
      );
    });
  }

  async userAuthGuard() {
    if (this.ss.getItem('usi')) {
      this.ci.usi = JSON.parse(this.ss.getItem('usi'));
      return true;
    } else {
      if (confirm('로그인 창으로 이동합니다.')) {
        this.navigate.goPage('/login');
      } else {
        return
      }
    }
  }
}
