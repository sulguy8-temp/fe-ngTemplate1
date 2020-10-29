import { Component, OnInit } from '@angular/core';
import { NavigateService } from '../../service/navigate.service';
import { ViewService } from '../../service/view.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(
    public navigate: NavigateService,
    public view: ViewService
  ) { }

  ngOnInit(): void {
  }

}
