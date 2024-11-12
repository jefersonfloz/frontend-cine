import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorcitoComponent } from './errorcito.component';

describe('ErrorcitoComponent', () => {
  let component: ErrorcitoComponent;
  let fixture: ComponentFixture<ErrorcitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorcitoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorcitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
