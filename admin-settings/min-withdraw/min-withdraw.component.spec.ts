import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MinWithdrawComponent } from './min-withdraw.component';

describe('MinWithdrawComponent', () => {
  let component: MinWithdrawComponent;
  let fixture: ComponentFixture<MinWithdrawComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MinWithdrawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
