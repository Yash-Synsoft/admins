import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DistributedAmountComponent } from './distributed-amount.component';

describe('DistributedAmountComponent', () => {
  let component: DistributedAmountComponent;
  let fixture: ComponentFixture<DistributedAmountComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributedAmountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributedAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
