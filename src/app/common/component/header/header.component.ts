import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigateService } from '../../service/navigate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() searchView = new EventEmitter();
  @Output() leftView = new EventEmitter();
  
  constructor(
    public navigate: NavigateService
  ) { }

  ngOnInit(): void {

  }
  
}
