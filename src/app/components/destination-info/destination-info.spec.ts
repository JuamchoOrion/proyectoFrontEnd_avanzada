import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationInfo } from './destination-info';

describe('DestinationInfo', () => {
  let component: DestinationInfo;
  let fixture: ComponentFixture<DestinationInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinationInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinationInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
