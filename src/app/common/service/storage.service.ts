import { Injectable, Output, EventEmitter, Component } from '@angular/core';
// import { CustomerInfo } from '../vo/customer-info';

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  @Output() currentUrl: EventEmitter<string> = new EventEmitter();

  constructor(

  ) { }

  getItem(key:string){
    return localStorage.getItem(key);
  }

  async setItem(key:string,value:string){
    localStorage.setItem(key,value);
  }

  getUrl():string{
    return localStorage.getItem('currentUrl');
  }

  setUrl(value:string):void{
    localStorage.setItem('currentUrl',value);
    this.currentUrl.emit(value);
  }

  setSessionItem(key:string,value:string):void{
    localStorage.setItem(key,value);
  }

  getSessionItem(key:string):string{
    return localStorage.getItem("key");
  }

  removeAll():void{
    localStorage.clear();
  }
  
  removeItem(key:string):void{
    localStorage.removeItem(key);
  }
}
