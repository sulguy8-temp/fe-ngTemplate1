import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudReviewComponent } from './cloud-review.component';

describe('CloudReviewComponent', () => {
  let component: CloudReviewComponent;
  let fixture: ComponentFixture<CloudReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloudReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
