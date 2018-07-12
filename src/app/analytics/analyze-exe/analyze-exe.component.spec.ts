import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzeExeComponent } from './analyze-exe.component';

describe('AnalyzeExeComponent', () => {
  let component: AnalyzeExeComponent;
  let fixture: ComponentFixture<AnalyzeExeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyzeExeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzeExeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
