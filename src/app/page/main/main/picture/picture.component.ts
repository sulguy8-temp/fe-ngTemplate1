import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';

import { CommonService } from 'src/app/common/service/common.service';

const httpJson = {
  headers: new HttpHeaders(
    { 'Content-Type': 'application/json' }
  )
}

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnInit {
  mousePositon$: Observable<Event>;
  posX: number = 0;
  posY: number = 0;

  constructor(
    public cs: CommonService
  ) { }

  ngOnInit() {
    this.onInit();
  }

  onInit() {
    this.mousePositon$ = fromEvent(document, 'mousemove');
    this.mousePositon$.subscribe({
      next: (event: MouseEvent) => {
        this.posX = event.clientX;
        this.posY = event.clientY;
        this.clock1();
      },
      error: error => console.log(error),
      complete: () => console.log('complete!')
    });
    // this.mousePositon$.subscribe(
    //   (event: MouseEvent) => {
    //     this.posX = event.clientX;
    //     this.posY = event.clientY;
    //     this.clock1();
    //   },
    //   error => console.log(error),
    //   () => console.log('complete!')
    // );
  }

  doublePress() {
    alert("doublePress!");
  }

  longPress() {
    alert("longPress!")
  }

  clock1() {
    console.log('clock1 start!')
    let time = 1;
    let timerId = setInterval(() => console.log(time++), 1000);
    setTimeout(() => {
      clearInterval(timerId);
      // Observable를 구독하는 Observer
      this.observable$.subscribe(
        value => console.log(value),
        error => console.error(error),
        () => console.log('Complete')
      );
    }, 5000);
  }

  subscriber = (observer) => {
    console.log("Observable Start!")
    try {
      observer.next(1)
      observer.next(2)
      // throw new Error('Something wrong!');
      observer.complete();
    } catch (e) {
      observer.error(e);
    } finally {
      return () => console.log('Unsubscribed!')
    }
  }
  observable$ = new Observable(this.subscriber);

}
