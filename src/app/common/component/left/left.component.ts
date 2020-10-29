import { Component, OnInit } from '@angular/core';
import { NavigateService } from '../../service/navigate.service';
import { ViewService } from '../../service/view.service';

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.scss']
})
export class LeftComponent implements OnInit {

  constructor(
    public navigate: NavigateService,
    public view: ViewService
  ) { }

  ngOnInit(): void {
  }

}
