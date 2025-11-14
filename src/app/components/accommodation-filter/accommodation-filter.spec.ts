import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationFilter } from './accommodation-filter';

describe('AccommodationFilter', () => {
  let component: AccommodationFilter;
  let fixture: ComponentFixture<AccommodationFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccommodationFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccommodationFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
