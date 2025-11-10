import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestinationMetrics } from './destination-metrics';

describe('DestinationMetrics', () => {
  let component: DestinationMetrics;
  let fixture: ComponentFixture<DestinationMetrics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinationMetrics],
    }).compileComponents();

    fixture = TestBed.createComponent(DestinationMetrics);
    component = fixture.componentInstance;
    component.metrics = {
      totalReservations: 10,
      averageRating: 4.5,
      totalRevenue: 2000000,
    }; // Mock para que no falle el @Input
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
