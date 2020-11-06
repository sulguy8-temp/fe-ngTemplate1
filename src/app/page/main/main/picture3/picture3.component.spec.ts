import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Picture3Component } from './picture3.component';

describe('Picture3Component', () => {
  let component: Picture3Component;
  let fixture: ComponentFixture<Picture3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Picture3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Picture3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
