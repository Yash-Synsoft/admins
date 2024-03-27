import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MasterCurrencyComponent } from './master-currency.component';

describe('MasterCurrencyComponent', () => {
  let component: MasterCurrencyComponent;
  let fixture: ComponentFixture<MasterCurrencyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterCurrencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
