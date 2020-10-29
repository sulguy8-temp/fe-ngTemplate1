import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

var doublePressEmiiter;
var longPressEmiiter;

@Directive({
  selector: '[appPress]'
})

export class PressDirective {

  timer: any;
  tapTimes: number;

  constructor(

  ) { }

  @Output() doublePress = new EventEmitter();
  @Output() longPress = new EventEmitter();
  @HostListener('touchstart', ['$event'])
  touchstart(e) {
    this.downEvent(e);
  }
  @HostListener('touchend', ['$event'])
  touchend(e) {
    this.upEvent(e);
  }
  @HostListener('mousedown', ['$event'])
  mousedown(e) {
    this.downEvent(e);
  }
  @HostListener('mouseup', ['$event'])
  mouseup(e) {
    this.upEvent(e);
  }

  downEvent(e){
    e.preventDefault();
    doublePressEmiiter = this.doublePress;
    longPressEmiiter = this.longPress;

    var now = new Date().getTime();
    var timesince = now - this.tapTimes;
    // 더블터치를 위한 터치간 시간조절
    if ((timesince < 300) && (timesince > 0)) {
      doublePressEmiiter.emit();
    } else {
      this.tapTimes = now;
      this.timer = setTimeout(function () {
        this.timer = null;
        longPressEmiiter.emit();
        // 터치시간 조절
      }, 800);
    }
  }

  upEvent(e){
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    } else {
      this.timer = null;
    }

    doublePressEmiiter = null;
    longPressEmiiter = null;
  }
}
