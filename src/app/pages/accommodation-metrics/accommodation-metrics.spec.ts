import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccommodationMetrics } from './accommodation-metrics';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AccommodationMetrics', () => {
  let component: AccommodationMetrics;
  let fixture: ComponentFixture<AccommodationMetrics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccommodationMetrics],
      schemas: [NO_ERRORS_SCHEMA] // Ignora los subcomponentes para este test
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccommodationMetrics);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the AccommodationMetrics', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty reservations, comments, metrics, and summary by default', () => {
    expect(component.reservations).toEqual([]);
    expect(component.comments).toEqual([]);
    expect(component.metrics).toEqual({});
    expect(component.summary).toEqual({});
  });
});
