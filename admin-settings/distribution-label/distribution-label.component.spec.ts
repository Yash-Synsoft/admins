import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DistributionLabelComponent } from './distribution-label.component';

describe('DistributionLabelComponent', () => {
  let component: DistributionLabelComponent;
  let fixture: ComponentFixture<DistributionLabelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributionLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributionLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
