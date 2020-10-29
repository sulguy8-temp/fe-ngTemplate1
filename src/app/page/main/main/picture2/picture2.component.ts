import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-picture2',
  templateUrl: './picture2.component.html',
  styleUrls: ['./picture2.component.scss']
})
export class Picture2Component implements OnInit {
  @ViewChild('itemsContainer', { read: ViewContainerRef }) itemsContainer: ViewContainerRef;
  @ViewChild('item', { read: TemplateRef }) item: TemplateRef<any>;
  constructor() { }

  ngOnInit(): void {
    this.buildData(5000);
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
