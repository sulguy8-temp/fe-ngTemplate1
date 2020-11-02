import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../storage.service';
import { ErrorCode } from 'src/app/config/error-code';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    private dyneinList:string[] = ['system/all','login/user','adm/login','test'];
    private errorCode:ErrorCode = new ErrorCode();

    constructor(
    private _storageService:StorageService
    ){ }

    private isDynein(url:string):Boolean{
        for(let str of this.dyneinList){
            if(url.indexOf(str)!=-1){
                return true;
            }
        }
        return false;
    }
    
    intercept(req: HttpRequest<any>, next: HttpHandler)
    : Observable<HttpEvent<any>>{
        let authReq:HttpRequest<any> = req;
        let id : string='';
        let token : string ='';
        req = req.clone({
            headers: req.headers.set('x-angular', 'true')
        });
        if(!this.isDynein(req.url)){
            let cui = this._storageService.getItem('cui');
            let common;
            if(cui){
                common = JSON.parse(cui);
            }
            if(!common|| !common['cuiId'] || !common['token']){
                throw this.errorCode.err02;
            }
            id = common['cuiId'];
            token = common['token'];
        }
        authReq = req.clone({
            headers: req.headers.set('x-angular', 'true').set('x-auth-id',id).set('x-auth-token',token)
        });
        return next.handle(authReq);
    }
}
