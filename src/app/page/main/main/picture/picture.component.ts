import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { CommonControllerService } from 'src/app/common/service/common-controller.service';
import { CommonService } from 'src/app/common/service/common.service';
import { CustomerInfoService } from 'src/app/common/service/customer-info.service';
import { NavigateService } from 'src/app/common/service/navigate.service';
import { StorageService } from 'src/app/common/service/storage.service';
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

  constructor(
    public cs: CommonService,
    public ccs: CommonControllerService,
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
    alert("longPress!")
  }

}
