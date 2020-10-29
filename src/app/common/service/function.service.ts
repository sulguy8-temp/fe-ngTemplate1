import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  constructor(
    private router:Router
  ) { }

  checkUrl(name:string){
    return this.router.url.indexOf(name)!=-1;
  }

  getParamMaps(activatedRoute:ActivatedRoute):Map<String,String[]>{
    var paramMap = new Map<String,String[]>();
    var keys = activatedRoute.snapshot.queryParamMap.keys;
    for(var key of keys){
      paramMap.set(key, activatedRoute.snapshot.queryParamMap.getAll(key));
    }
    console.log(paramMap);
    return paramMap;
  }

  getRandKey(){
    let date = new Date();
    return 'rand(' + (Math.floor(date.getMinutes()/5)) + ')';
  }
}
