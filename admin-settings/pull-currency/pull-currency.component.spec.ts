import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PullCurrencyComponent } from './pull-currency.component';

describe('PullCurrencyComponent', () => {
  let component: PullCurrencyComponent;
  let fixture: ComponentFixture<PullCurrencyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PullCurrencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PullCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
