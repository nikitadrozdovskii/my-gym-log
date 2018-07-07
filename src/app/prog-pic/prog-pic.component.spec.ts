import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgPicComponent } from './prog-pic.component';

describe('ProgPicComponent', () => {
  let component: ProgPicComponent;
  let fixture: ComponentFixture<ProgPicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgPicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgPicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
