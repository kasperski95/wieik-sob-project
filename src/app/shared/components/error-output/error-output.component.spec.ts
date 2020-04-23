import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorOutputComponent } from './error-output.component';

describe('ErrorOutputComponent', () => {
  let component: ErrorOutputComponent;
  let fixture: ComponentFixture<ErrorOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
