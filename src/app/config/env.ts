import { Injectable } from '@angular/core';
import { Component } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Env {
  // localUrl: string = environment.localUrl;
  // baseUrl: string = environment.baseUrl;
  // impId: string = environment.impId;
  // crawlUrl : string = environment.crawlUrl;
  public viewComponent: string;
}
