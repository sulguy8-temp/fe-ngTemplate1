import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnInit {
  cloudReviewFlag: boolean;
  cloudTexts: string;
  
  constructor() { }

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
}
