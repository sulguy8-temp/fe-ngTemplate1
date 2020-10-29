import { Injectable } from '@angular/core';
import { Env } from 'src/app/config/env';


@Injectable({
  providedIn: 'root'
})
export class ViewService {

  constructor(
    private env: Env
  ) { }

  viewComponent(comp) {
    this.env.viewComponent = comp;
  }
}
