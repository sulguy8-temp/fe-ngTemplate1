import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common/service/common.service';
import { CustomerInfoService } from 'src/app/common/service/customer-info.service';
import { NavigateService } from 'src/app/common/service/navigate.service';
import { StorageService } from 'src/app/common/service/storage.service';
import { UserInfo } from 'src/app/common/vo/user-info';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usi: UserInfo;
  loginUrl: string = 'login/user';
  previousUrl: string;
  isActive : boolean =true;
  
  constructor(
    public cs: CommonService,
    private ss:StorageService,
    private ci: CustomerInfoService,
    private navigate: NavigateService
  ) { }

  ngOnInit(): void {
    this.onInit();
  }

  onInit(){
    this.usi = new UserInfo();
    if(this.checkLoginStatus()){
      this.navigate.goPage('/main/pic1');
    } 
  }

  checkLoginStatus(){
    if(this.ss.getItem('usi')){ 
      return true;
    } else {
      return false;
    }
  }

  async login(){
    await this.cs.postJson<UserInfo>(this.loginUrl,this.usi).subscribe(
      async res=>{
        if(res['user']){
          this.ci.isLogined = true;
          this.ci.usi = res['user'];
          this.ss.setItem('usi',JSON.stringify(res['user']))
          await this.ss.setItem('usiId',res['user']['usiId']);
          await this.ss.setItem('token',res['user']['token']);         
          var url = '/main/pic1';
          if(this.ss.getItem('beforeUrl')){
            url = this.ss.getItem('beforeUrl');
            this.ss.removeItem('beforeUrl');
          }
          this.navigate.goPage(url);
          this.usi = new UserInfo();
        }
      },err=>{
        alert(err['error']['msg']);
      }
    )
  }
}
