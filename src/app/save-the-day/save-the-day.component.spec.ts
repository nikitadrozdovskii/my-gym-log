import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveTheDayComponent } from './save-the-day.component';

describe('SaveTheDayComponent', () => {
  let component: SaveTheDayComponent;
  let fixture: ComponentFixture<SaveTheDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveTheDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveTheDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
