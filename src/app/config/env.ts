import { Injectable } from '@angular/core';
import { Component } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class Env {
  localUrl: string = environment.localUrl;
  baseUrl: string = environment.baseUrl;
  impId: string = environment.impId;
  crawlUrl : string = environment.crawlUrl;
  imgUrl: string = 'https://img.shop-ing.co.kr:4443/files/';
  dataUrl: string = this.baseUrl + 'resources/data/';
  normalImg: string = this.dataUrl + 'normal.png';
  curUrl: string = '';
  bizUrl: string = 'https://business.api.friday24.com/closedown/';
  isHidden: boolean = true;
  isShowLeft: boolean = false;
  contentDetailPageCode : string = '0';
  leftPageCode: string = '0';
  leftPageName: string = '';
  isShowLoading: boolean = false;
  isShowDataLoading: boolean = false;
  isShowMobileFooter: boolean = true;
  showDetailHeader : boolean = true;
  shareList : Array<any>;
  shareComponent:any;
  globalBtnComponents: object = {};
  isBoard: boolean = true
  globalPolicies: object = {};
  cuiLof:boolean = false;
  isChangeUrl: boolean = false;
  shopDetailTicketInfoRadioNum: number = 1;
  goodsDetailTicketInfoRadioNum: number = 1;
}
