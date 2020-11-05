import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, fromEvent, interval, Observable, of } from 'rxjs';
import { distinctUntilChanged, startWith } from 'rxjs/operators';

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

  constructor(
    public cs: CommonService
  ) { }

  ngOnInit() {
    // # Case1 : Observable 객체를 만들고 구독하는 방법
    // this.case1();
    // console에서 결과확인

    // # Case2 : Observable 객체를 리턴하는 DOM Event를 구독하는 방법
    // 화면에서 'Mouse Tracing' 버튼 더블 클릭하면 ON, 롱 클릭하면 OFF
    // console에서 결과확인

    // # Case3 : Observable 객체를 화면의 '| async'를 사용하여 묶는방법
    // this.case3();
    // 화면에서 결과확인

    // # Case4 : 2개의 Observable 객체를 하나로 묶어서 사용하는 방법
    // this.case4();
    // 화면에서 결과확인
  }


  /******************************* Case1 *******************************/
  case1() {
    this.clock1();
  }

  subscriber = (observer) => {
    console.log("Observable Start!")
    try {
      observer.next('ob1')
      observer.next('ob2')
      // throw new Error('Something wrong!');
      observer.complete();
    } catch (e) {
      observer.error(e);
    } finally {
      return () => console.log('Unsubscribed!')
    }
  }
  observable$ = new Observable(this.subscriber);

  clock1() {
    console.log('clock1 start!')
    let time = 1;
    let timerId = setInterval(() => console.log(time++), 1000);
    setTimeout(() => {
      clearInterval(timerId);
      // Observable를 구독(subscribe)하는 "Observer" 생성
      // Observable 객체는 구독하는 순간 동작하며 "lazy"하다고 할 수 있다.
      // 위 내용은 clearInterval(timerId) 이후 콘솔에 Observable 객체의 내용이 찍히는것으로 알 수 있음.
      this.observable$.subscribe(
        value => console.log(value),
        error => console.error(error),
        () => console.log('Complete')
      );
    }, 5000);
  }


  /******************************* Case2 *******************************/
  mousePositon$: Observable<Event>;
  event$;
  posX: number = 0;
  posY: number = 0;
  count: number = 0;

  mouseEvent() {
    this.mousePositon$ = fromEvent(document.querySelector('.tracingBox'), 'mousemove');
    this.event$ = this.mousePositon$.subscribe({
      next: (event: MouseEvent) => {
        console.log(event)
        this.posX = event.offsetX;
        this.posY = event.offsetY;
        this.count++;
      },
      error: error => console.log(error),
      complete: () => console.log('complete!')
    });
    // # 비교해서 사용할 것!
    // this.event$ = this.mousePositon$.subscribe(
    //   value => console.log(value),
    //   error => console.error(error),
    //   () => console.log('Complete')
    // );
  }
  doublePress(e) {
    if (this.event$ != undefined) {
      this.event$.unsubscribe();
    }
    alert("Tracing..")
    this.mouseEvent();
  }

  longPress(e) {
    console.log(e)
    alert("Stop Working!")
    
    // # Click Event
    alert("x : " + e.offsetX + ", y : " + e.offsetY)
    this.placeDiv(e.offsetX,e.offsetY);
    // $ Touch Event
    // alert("x : " + (e.touches[0].pageX - e.touches[0].target.offsetLeft) + ", y : " + (e.touches[0].pageY - e.touches[0].target.offsetTop))
    // this.placeDiv((e.touches[0].pageX - e.touches[0].target.offsetLeft),(e.touches[0].pageY - e.touches[0].target.offsetTop));

    this.count = 0;
    this.event$.unsubscribe();
  }

  placeDiv(x_pos, y_pos) {
    var d = document.getElementById('tracingDot');
    d.style.position = "absolute";
    d.style.border = "solid";
    d.style.left = x_pos+'px';
    d.style.top = y_pos+'px';
  }

  /******************************* Case3 *******************************/
  source$ = interval(1000);
  x = 0;
  subscription = null;

  case3() {
    this.subscription = this.source$.subscribe(x => {
      this.x = x;
    })
  }

  // 메모리 누수를 막기위해 아래처럼 구독해제를 해줘야 하지만
  ngOnDestroy() {
    if(this.subscription != undefined){
      this.subscription.unsubscribe();
    }
  }

  // 화면에서 '| async'를 사용하면 구독해제 안해도 화면이 사라질때 알아서 구독해제 해줌.
  // 따라서 화면의 "<h3>interval : {{ source$ | async }}</h3>"처럼 사용할 것!


  /******************************* Case4 *******************************/
  name = new FormControl();
  name$ = this.name.valueChanges;
  list = ['john', 'aiden', 'bob', 'paul', 'same']
  // 일반리스트를 'of()'로 묶어서 Observable하게 사용할 수 있는 객체로 변경
  list$ = of(this.list);
  filtered$ = null;

  case4() {
    // this.name의 value의 변화를 감지하는 observer 객체 생산
    const name$ = this.name.valueChanges
      // Pipeable Operator 사용
      // 연결된 파이퍼블 연산자는 각 연산자를 거치며 새로운 옵저버블 인스턴스를 리턴
      .pipe(startWith(''))            // name을 ''로 초기화
      .pipe(distinctUntilChanged());  // 같은 값을 전달받으면 반응하지 않음.

    // this.name$, this.list$를 하나의 observable 객체로 묶음
    this.filtered$ = combineLatest(
      // this.name$, this.list$의 값은 name, list로 묶임
      this.name$, this.list$, (name, list) => {
        // Filter Operator 사용
        // 필터 연산자를 거치며 새로운 옵저버블 인스턴스를 리턴
        return list.filter(item => item.includes(name));
      }
    )
  }
}
