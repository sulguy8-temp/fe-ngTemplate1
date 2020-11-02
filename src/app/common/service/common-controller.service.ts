import { Injectable } from '@angular/core';
// import { LoadingController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonControllerService {
  isPresent:boolean= false;
  constructor(

  ) { }
  
  async alertMsg(msg:string,conf?:object){
    let alConf = {
      header: '알림',
      message: msg,
      buttons: ['OK']
    };
    if(conf){
      if(conf['buttons']){
        alConf.buttons = conf['buttons'];
      }
    }
    // const alertObj = await this.ac.create(alConf);
    return null;
  }

  // async alertMsgCallback(msg:string,conf?:Function,backdrop?:boolean){
    
  //   console.log(msg);
  //   let alConf = {
  //     header: '알림',
  //     message: msg,
  //     buttons: [
  //       {
  //         text: '예',
  //         handler: () => {
  //           conf();
  //         }
  //       }
  //     ]
  //   };
  //   if(!backdrop){
  //     Object.assign(alConf, {
  //       backdropDismiss: backdrop
  //     })
  //   }
  //   const alertObj = await this.ac.create(alConf);
  //   return alertObj.present();
  // }
  // async alertMsgTimeOut(msg:string,time?:number){
  //   let alConf = {
  //     header: 'POINT',
  //     message: msg,
  //     buttons: ['OK']
  //   };
  //   if(!time){
  //     time = 1000;
  //   }
  //   const alertObj = await this.ac.create(alConf);
  //   alertObj.present().then(
  //     ()=>{
  //       setTimeout(()=>{
  //         alertObj.dismiss();
  //       },time);
  //     }
  //   );
  // }

}
