import { Component, ElementRef, OnInit } from '@angular/core';
import { empty, fromEvent, Observable, of } from 'rxjs';
import { DotInfo } from 'src/app/common/vo/dot-info';

@Component({
  selector: 'app-picture3',
  templateUrl: './picture3.component.html',
  styleUrls: ['./picture3.component.css']
})
export class Picture3Component implements OnInit {
  list = [];

  constructor(
    private el: ElementRef,
  ) { }

  ngOnInit(): void {
  }
  
  addDot(){
    let tmpDot = new DotInfo();
    this.list.push(tmpDot);
  }

  deleteDot(e){
    let index =e.target.id.substring(6);
    if(e.target.id != 'dotBox'){
      this.list.splice(index, 1);
    }
  }

  placeDot(e) {  
    let index = this.list.length - 1;
    let x_pos = (100 * (e.offsetX / 500)).toFixed(2);
    let y_pos = (100 * (e.offsetY / 500)).toFixed(2);
    this.list[index]['dotX'] = x_pos;
    this.list[index]['dotY'] = y_pos;
    var dot = this.el.nativeElement.querySelector('#dotNum' + (this.list.length - 1));
    this.placeDot_setStyle(dot,x_pos,y_pos);
  }

  placeDot_setStyle(dot,x_pos,y_pos){
    dot.style.position = "absolute";
    dot.style.border = "solid";
    dot.style.left = x_pos + '%';
    dot.style.top = y_pos + '%';
  }

}
