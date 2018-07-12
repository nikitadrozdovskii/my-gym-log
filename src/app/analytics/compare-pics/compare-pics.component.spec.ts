import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparePicsComponent } from './compare-pics.component';

describe('ComparePicsComponent', () => {
  let component: ComparePicsComponent;
  let fixture: ComponentFixture<ComparePicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparePicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparePicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
