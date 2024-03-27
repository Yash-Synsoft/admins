import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VipLabelsComponent } from './vip-labels.component';

describe('VipLabelsComponent', () => {
  let component: VipLabelsComponent;
  let fixture: ComponentFixture<VipLabelsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VipLabelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VipLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
