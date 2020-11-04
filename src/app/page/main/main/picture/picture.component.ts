import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { CommonService } from 'src/app/common/service/common.service';

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
    public cs: CommonService
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
