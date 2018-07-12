import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExeComponent } from './add-exe.component';

describe('AddExeComponent', () => {
  let component: AddExeComponent;
  let fixture: ComponentFixture<AddExeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
