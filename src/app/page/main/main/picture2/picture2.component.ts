import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonService } from 'src/app/common/service/common.service';
import { NavigateService } from 'src/app/common/service/navigate.service';

@Component({
  selector: 'app-picture2',
  templateUrl: './picture2.component.html',
  styleUrls: ['./picture2.component.scss']
})
export class Picture2Component implements OnInit {
  @ViewChild('itemsContainer', { read: ViewContainerRef }) itemsContainer: ViewContainerRef;
  @ViewChild('item', { read: TemplateRef }) item: TemplateRef<any>;
  usis = [];
  param = {};

  constructor(
    public cs: CommonService,
    private nav: NavigateService
  ) { }

  ngOnInit(): void {
    this.buildData(5000);
    this.param = {
      goiType:'tic',
      orders:'usi.credat desc, usi.cretim desc',
      isEnd:false,
      pageNum:1,
      pageSize:10,
    }
    this.selectList();
  }

  async selectList(obj?, showPingi?) {
    await this.cs.attachDataToList('/usr/usis', this.param, this.usis, obj, showPingi);
  }

  private buildData(length: number) {
    let currentIndex = 0;
    const interval = setInterval(() => {
      // 50개씩 그리기
      const nextIndex = currentIndex + 50;
      for (let n = currentIndex; n <= nextIndex; n++) {
        if (n >= length) {
          clearInterval(interval);
          break;
        }
        const context = {
          items: {
            id: n,
            label: Math.random()
          },
        };
        this.itemsContainer.createEmbeddedView(this.item, context);
      }
      currentIndex += 50;
      // 0.5초마다
    }, 500);
  }
}
