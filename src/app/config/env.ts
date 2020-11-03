import { Injectable } from '@angular/core';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})

export class Env {
  localUrl: string = environment.localUrl;
  baseUrl: string = environment.baseUrl;
  bizUrl: string = 'https://business.api.friday24.com/closedown/';
  isHidden: boolean = true;
}
