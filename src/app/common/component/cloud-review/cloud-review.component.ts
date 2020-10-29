import { Component, Input, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, state, group } from '@angular/animations';

@Component({
  selector: 'app-cloud-review',
  templateUrl: './cloud-review.component.html',
  styleUrls: ['./cloud-review.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition('0 => 1', [group([
        animate('700ms ease-in-out', style({
          'width': '0%'
        })),
        animate('800ms ease-in-out', style({
          'width': '50%'
        })),
        animate('1000ms ease-in-out', style({
          'width' : '100%'
        }))
      ]
      )])
    ])
  ]
})

export class CloudReviewComponent implements OnInit {
  @Input() cloudTexts: string;
  image: boolean = true;
  filterValue: number;
  
  constructor() { }

  ngOnInit(): void {
    this.onInit();

  }

  onInit() {
    this.filterValue = 0;
    console.log("CloudReview Loading..")
  }

}
