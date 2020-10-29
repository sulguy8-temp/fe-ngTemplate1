import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatterService {
  unit: Array<string> = ['만', '억', '조'];
  unitCnt: Array<number> = [10000, 10000, 10000];

  constructor(

  ) { }

  customFormat(cnt: number): string {
    if (cnt == 0) return '0';
    var whileCnt = -1;
    while (cnt / this.unitCnt[whileCnt + 1] > 1) {
      cnt /= this.unitCnt[whileCnt + 1];
      whileCnt++;
    }
    if (whileCnt == -1) {
      return cnt + '';
    }
    return cnt.toFixed(1) + this.unit[whileCnt];
  }

  currencyFormat(money: number): string {
    if (money == 0) return '0';
    var rx = /(^[+-]?\d+)(\d{3})/;
    var moneyStr = money + '';
    while (rx.test(moneyStr)) {
      moneyStr = moneyStr.replace(rx, `$1` + ',' + `$2`);
    }
    return moneyStr;
  }
  getHHMMByTime(time:string){
    if(time){
      return time.substr(0,5)
    }else{
      return '00:00';
    }    
  }
  getTimesaleTime(time:String){
    if(time){
      time = time.toString();
      if(time.length == 3){
        time = '0' + time;
      }
      let result = '';
      if(Number.parseInt(time.substr(0,2)) >= 12){
        result += '오후 ';
        if(Number.parseInt(time.substr(0,2)) < 22){
          result += '0';
        }
        result += (Number.parseInt(time.substr(0,2)) - 12) + ':' + time.substr(2,4);
      }else{
        result = '오전 ' + time.substr(0,2) + ':' + time.substr(2,4);
      }
      return result;
    }else{
      return '오전 00:00';
    }    
  }
}
