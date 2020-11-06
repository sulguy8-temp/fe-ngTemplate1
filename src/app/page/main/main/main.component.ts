import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, group } from '@angular/animations';
import { Env } from 'src/app/config/env';
import { Location } from '@angular/common';
import { NavigateService } from 'src/app/common/service/navigate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('0', style({ 'max-height': '*', opacity: 1, visibility: 'visible' })),
      state('1', style({ 'max-height': '0px', opacity: 0, visibility: 'hidden' })),
      transition('0 => 1', [group([
        animate('700ms ease-in-out', style({
          'opacity': '0'
        }))
      ]
      )]),
      transition('1 => 0', [group([
        animate('1ms ease-in-out', style({
          'opacity': '1'
        }))
      ]
      )])
    ])
  ]
})


export class MainComponent implements OnInit {
  filterValue: number;
  leftViewFlag: boolean;
  leftViewFlag2: boolean;

  constructor(
    public env: Env,
    public location: Location,
    public navigate: NavigateService,
    private router: Router
  ) {
    this.router.events.subscribe((event) =>
      this.leftViewFlag = false
    )
  }

  ngOnInit() {
    this.onInit();
  }

  onInit() {
    this.leftViewFlag = false;
    this.filterValue = 1;
  }

  searchView() {
    this.filterValue = this.filterValue == 0 ? 1 : 0;
  }

  leftView() {
    this.leftViewFlag = this.leftViewFlag ? false : true;
  }

}
