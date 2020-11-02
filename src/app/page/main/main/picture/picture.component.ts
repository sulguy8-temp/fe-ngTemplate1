import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { CommonControllerService } from 'src/app/common/service/common-controller.service';
import { CommonService } from 'src/app/common/service/common.service';
import { CustomerInfoService } from 'src/app/common/service/customer-info.service';
import { NavigateService } from 'src/app/common/service/navigate.service';
import { StorageService } from 'src/app/common/service/storage.service';
import { CustomerInfo } from 'src/app/common/vo/customer-info';
import { UserInfo } from 'src/app/common/vo/user-info';

const httpJson = {
  headers: new HttpHeaders(
    { 'Content-Type': 'application/json' }
  )
}

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnInit {
  cloudReviewFlag: boolean;
  cloudTexts: string;
  
  // 로그인 관련
  userInfo:any = {};
  usi:UserInfo = new UserInfo();
  oAuthUrl:string = 'auth/login/';
  loginUrl:string = 'login/user';
  previousUrl: string;
  isActive : boolean =true;


  constructor(
    private _http: HttpClient,
    public cs: CommonService,
    public ccs: CommonControllerService,
    private ss:StorageService,
    private ci: CustomerInfoService,
    private navigate: NavigateService
  ) { }

  ngOnInit() {
    this.onInit();
  }

  onInit(){
    this.cloudReviewFlag = false;
    this.cloudTexts = "picture's texts";
  }

  doublePress(){
    alert("doublePress!");
  }

  longPress(){
    this.cloudReviewFlag = this.cloudReviewFlag? false : true;
  }

  async login(){
    await this.cs.postJson<UserInfo>(this.loginUrl,this.usi).subscribe(
      async res=>{
        if(res['user']){
          this.ci.isLogined = true;
          this.ci.usi = res['user'];
          this.ss.setItem('cui',JSON.stringify(res['user']))
          await this.ss.setItem('cuiId',res['user']['cuiId']);
          await this.ss.setItem('token',res['user']['token']);          
          var url = '/main/pic2';
          if(this.ss.getItem('beforeUrl')){
            url = this.ss.getItem('beforeUrl');
            this.ss.removeItem('beforeUrl');
          }
          this.navigate.goPage(url);
          this.usi = new UserInfo();
        }
      },err=>{
        console.log(err);
      }
    )
  }
}
