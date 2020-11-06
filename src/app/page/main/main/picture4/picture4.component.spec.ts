import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Picture4Component } from './picture4.component';

describe('Picture4Component', () => {
  let component: Picture4Component;
  let fixture: ComponentFixture<Picture4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Picture4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Picture4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
