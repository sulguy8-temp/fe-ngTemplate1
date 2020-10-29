import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { StorageService } from '../service/storage.service';
import { NavigateService } from '../service/navigate.service';
import { ErrorCode } from '../config/error-code';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    private dyneinList:string[] = ['system/all','login/user','adm/login'];
    private errorCode:ErrorCode = new ErrorCode();
    constructor(
    private _router:Router, 
    private _storageService:StorageService,
    private _navigate:NavigateService,
    ){

    }

    // private isDynein(url:string):Boolean{
    //     for(let str of this.dyneinList){
    //         if(url.indexOf(str)!=-1){
    //             return true;
    //         }
    //     }
    //     return false;
    // }
    
    // intercept(req: HttpRequest<any>, next: HttpHandler)
    // : Observable<HttpEvent<any>>{
    //     let authReq:HttpRequest<any> = req;
    //     let id : string='';
    //     let token : string ='';
    //     req = req.clone({
    //         headers: req.headers.set('x-angular', 'true')
    //     });
    //     if(!this.isDynein(req.url)){
    //         let cui = this._storageService.getItem('cui');
    //         let sai = this._storageService.getItem('sai');
    //         let common;
    //         if(cui){
    //             common = JSON.parse(cui);
    //         }
    //         if(sai){
    //             common= JSON.parse(sai);
    //         }
    //         if(!common|| !common['cuiId'] || !common['token']){
    //             console.log(req.url);
    //             throw this.errorCode.err02;
    //         }
    //         id = common['cuiId'];
    //         token = common['token'];
    //     }
    //     authReq = req.clone({
    //         headers: req.headers.set('x-angular', 'true').set('x-auth-id',id).set('x-auth-token',token)
    //     });
    //     // let tokken = this._storageService.getItem('tokken');
    //     // let uiId = this._storageService.getItem('uiId');
    //     // if(this.isDynein(req.url)){
    //     //     if(!tokken){
    //     //         this._router.navigate(['tabs/login']);
    //     //         return throwError('Auth Error');
    //     //     }
    //     // }else if(tokken && uiId){
    //     //     headers = new  HttpHeaders()
    //     //     .set('x-auth-id',uiId)
    //     //     .set('x-auth-tokken',tokken);
    //     //     req = req.clone({headers});
    //     // }
    //     return next.handle(authReq);
    }
}
