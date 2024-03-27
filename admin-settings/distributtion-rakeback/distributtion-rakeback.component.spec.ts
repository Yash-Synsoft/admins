import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DistributtionRakebackComponent } from './distributtion-rakeback.component';

describe('DistributtionRakebackComponent', () => {
  let component: DistributtionRakebackComponent;
  let fixture: ComponentFixture<DistributtionRakebackComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributtionRakebackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributtionRakebackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
