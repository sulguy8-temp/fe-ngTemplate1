import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { UserInfo } from '../vo/user-info';

@Injectable({
  providedIn: 'root'
})
export class CustomerInfoService {
  usi:UserInfo = new UserInfo();
  isLogined: boolean = false;

  constructor(private cs:CommonService,
    public ss:StorageService,
    public router: Router
    ) {
      this.onInit();
    }

  async onInit(){
    if(this.ss.getItem('usi')){
      this.usi = JSON.parse(this.ss.getItem('usi'));
    }else{
      await this.getUsi();
    }
  }

  async getUsi(){
    if(!this.ss.getItem('usi')){
      return false;
    }
    this.usi = await JSON.parse(this.ss.getItem('usi'));
    // await this.cs.promiseGet('usermanage/cui/' + ((this.cui != null)?this.cui.cuiNum:0)).then(
    //   res=>{
    //     let token = this.cui.token;
    //     this.cui = <CustomerInfo>res;
    //     this.cui.token = token;
    //     this.ss.setItem('cui',JSON.stringify(this.cui));
    //     if(!this.cui || this.cui.cuiNum == 0){
    //       this.isLogined = false;
    //     }else{
    //       this.isLogined = true;
    //     }
    //   }
    // )
  }
}
