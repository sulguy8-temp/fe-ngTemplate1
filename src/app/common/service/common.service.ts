import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpUrlEncodingCodec } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { CustomerInfo } from '../vo/customer-info';
import { ErrorCode } from 'src/app/config/error-code';
import { Env } from 'src/app/config/env';
import { AppConfig } from 'src/app/config/app-config';
import { CommonControllerService } from './common-controller.service';

const httpJson = {
  headers: new HttpHeaders(
    { 'Content-Type': 'application/json' }
  )
}
const httpFile = {
  headers: new HttpHeaders(
    { 'ENCTYPE': 'multipart/form-data' }
  )
}
const httpBiz = {
  headers : new  HttpHeaders(
    { 'Authorization': 'Bearer CuBqZzsXLEjvbD2w7H4k' }
  )
}
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  errorCode:ErrorCode = new ErrorCode();
  apiUrl: string = this.env.baseUrl;
  localUrl: string = this.env.localUrl;
  bizUrl : string = this.env.bizUrl;
  loginBlock = false;
  huec: HttpUrlEncodingCodec = new HttpUrlEncodingCodec();
  lastScrollTime: Date;

  private  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error['error']) {
        if (error['error']['msg']) {
          if(error['error']['errCode'] && error['error']['errCode']=='err01'){
            
            var url = '/main/home';
            if(this.ss.getItem('beforeUrl')){
              url = this.ss.getItem('beforeUrl');
            }
            this.ss.removeAll();
            this.router.navigateByUrl(url);
            return;
          }else{
            this._ccs.alertMsg(error['error']['msg']);
          }
        }
      }else if(error){
        if(this.errorCode.err02==error){
          window.location.reload();
        }
      }
      throw error;
    };
  }

  constructor(private _http: HttpClient,
    public env: Env,
    private router: Router,
    private ss:StorageService,
    private commonConfig: AppConfig,
    private _ccs: CommonControllerService,
  ) { }

  // async getGuestCui(){
  //   var param = {
  //     cuiId : 'guest',
  //     cuiPwd : 'guest'
  //   }
  //   return this.promisePostJson<CustomerInfo>('login/user',param).then(
  //     res=>{
  //       this.ss.setItem('cui',JSON.stringify(res['user']));
  //       return true;
  //     },err=>{
  //       console.log(err);
  //     }
  //   )  
  // }

  postJson<T>(url: string, obj: any, confs?: any): Observable<T> {
    // this.env.isShowLoading = true;
    url = `${this.apiUrl}${url}`;
    if (this.dataValidation(obj, confs)) {
      return this._http.post<T>(url, obj, httpJson).pipe(
        tap(res => {
          this.env.isHidden = false;
        }),
        catchError(this.handleError<T>(`obj = ${obj}`))
      );
    }
    return new Observable();
  }

  dataValidation(obj: any, confs: any): boolean {
    if(this.loginBlock){
      return false;
    }
    if (!confs) {
      return true;
    }
    let valis = confs.valis;
    let names = confs.names;
    for (var key in valis) {
      if (!obj[key] || obj[key].trim().length < valis[key]) {
        this._ccs.alertMsg(names[key] + '는 ' + valis[key] + '글자 이상입니다.');
        return false;
      }
    }
    return true;
  }

  promisePostJson<T>(url: string, obj: any, confs?: any): Promise<T> {
    this.env.isHidden = false;
    url = `${this.apiUrl}${url}`;
    return this._http.post<T>(url, obj, httpJson).pipe(
      tap(res => {
        this.env.isHidden = true;
      }),
      catchError(this.handleError<T>(`obj = ${obj}`))
    ).toPromise();
  }
  
  async attachDataToList<T>(url: string, params: object, list: Array<T>, obj?, showPingi?:Boolean) {
    if(this.loginBlock){
      return;
    }
    if (!params['pageSize']) {
      params['pageSize'] = 12;
    }
    await this.get<T>(url, params).toPromise().then(
      res => {
        if (obj) {
          obj.complete();
        } else {
          list.splice(0, list.length);
        }
        
        list.push.apply(list, res['data']);
        params['pageNum'] = parseInt(res['pageNum']);
        if (params['pageNum'] >= res['pages']) {
          params['isEnd'] = true;
        }
        params['pageNum']++;
      }
    ).finally(() => {

    })
  }

  get<T>(url: string, params?: any): Observable<T> {
    if(this.loginBlock){
      return;
    }
    url = `${this.env.baseUrl}${url}${this.makeQuery(params)}`;
    
    return this._http.get<T>(url).pipe(
      tap(async (res) => {
      }),
      catchError(this.handleError<T>(`obj = ${params}`)),
    );
  }

  promiseGet<T>(url: string, params?: any): Promise<T> {
    if(this.loginBlock){
      return;
    }
    url = `${this.env.baseUrl}${url}${this.makeQuery(params)}`;
    return this._http.get<T>(url).pipe(
      tap(async (res) => {
      }),
      catchError(this.handleError<T>(`obj = ${params}`)),
    ).toPromise();
  }

  private makeQuery(params: any) {
    let query = '';
    for (var key in params) {
      query += key + '=' + encodeURIComponent(params[key]) + '&';
    }
    if (query != '') {
      query = '?' + query;
    }
    return query;
  }

  private makeFormData(obj): FormData {
    const formData = new FormData();
    let countImgFile = 0;
    let sumImgSize = 0;        
    for (var key in obj) {
      if(!obj[key]){
        delete obj[key];
        continue;
      }
      if(!(key.includes('Nums'))){
        if (obj[key] instanceof Array) {
          for (var index in obj[key]) {
            if (obj[key] && obj[key][index]) {
              for (var subKey in obj[key][index]) {
                if ((subKey.includes('img') && !subKey.includes('Name'))
                || (subKey.includes('Img') && !subKey.includes('Name'))) {
                  if (obj[key][index][subKey]) {
                    delete obj[key][index][subKey + 'Name'];
                    let fileSize = obj[key][index][subKey]['size'];
                    if(fileSize > this.commonConfig.MAX_FILE_SIZE){
                      this._ccs.alertMsg('업로드 가능한 단일 파일의 최대크기를 초과하였습니다.(10MB)');
                      console.log(fileSize/1024/1024 + ' MB');
                      return;
                    }
                    sumImgSize += fileSize;
                    if(sumImgSize > this.commonConfig.MAX_FILES_SIZE){
                      this._ccs.alertMsg('한번에 업로드 가능한 파일크기를 초과하였습니다.(30MB)');
                      console.log(sumImgSize/1024/1024 + ' MB');
                      return;
                    }                    
                    countImgFile++
                  }
                }
                if ((subKey.includes('img') && subKey.includes('Name'))
                || (subKey.includes('Img') && subKey.includes('Name'))) {
                  if (obj[key][index][subKey]?obj[key][index][subKey].length < 100:true) {
                    delete obj[key][index][subKey.substr(0, subKey.length - 4)];
                  }
                }
                formData.append(key + '[' + index + '].' + subKey, obj[key][index][subKey]);
              }
            }
          }
        } else {
          if ((key.includes('img') && key.includes('Name'))
           || (key.includes('Img') && key.includes('Name'))) {
            if (obj[key]?obj[key].length < 100:true) {
              delete obj[key.substr(0, key.length - 4)];
            }
          }
          if ((key.includes('img') && !key.includes('Name'))
          || (key.includes('Img') && !key.includes('Name'))) {
            if (obj[key]) {
              delete obj[key + 'Name'];
              let fileSize = obj[key]['size'];
              if(fileSize > this.commonConfig.MAX_FILE_SIZE){
                this._ccs.alertMsg('업로드 가능한 단일 파일의 최대크기를 초과하였습니다.(10MB)');
                console.log(fileSize/1024/1024 + ' MB');
                return;
              }
              sumImgSize += fileSize;
              if(sumImgSize > this.commonConfig.MAX_FILES_SIZE){
                this._ccs.alertMsg('한번에 업로드 가능한 파일크기를 초과하였습니다.(30MB)');
                console.log(sumImgSize/1024/1024 + ' MB');
                return;
              }                    
              countImgFile++
            }
          }
          formData.append(key, obj[key]);
        }
      }else{
        formData.append(key, obj[key]);
      }
    }
    return formData;
  }

  postFile<T>(url, obj): Observable<T> {
    this.env.isHidden = false;
    url = `${this.apiUrl}${url}`;
    const data = this.makeFormData(obj);
    return this._http.post<T>(url, data, httpFile).pipe(
      tap(res => {
        
        this.env.isHidden = true;
      }
      ),
      catchError(this.handleError<T>(`obj = ${obj}`))
    );
  }
  promisePostFile<T>(url, obj): Promise<T> {
    this.env.isHidden = false;
    url = `${this.apiUrl}${url}`;
    const data = this.makeFormData(obj);
    return this._http.post<T>(url, data, httpFile).pipe(
      tap(res => {
        
        this.env.isHidden = true;
      }
      ),
      catchError(this.handleError<T>(`obj = ${obj}`))
    ).toPromise();
  }

}
