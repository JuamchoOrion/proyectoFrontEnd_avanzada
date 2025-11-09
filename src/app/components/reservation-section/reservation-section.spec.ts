import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationSection } from './reservation-section';

describe('ReservationSection', () => {
  let component: ReservationSection;
  let fixture: ComponentFixture<ReservationSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationSection],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
