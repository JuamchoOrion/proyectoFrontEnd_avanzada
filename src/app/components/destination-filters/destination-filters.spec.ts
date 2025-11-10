import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestinationFilters } from './destination-filters';

describe('DestinationFilters', () => {
  let component: DestinationFilters;
  let fixture: ComponentFixture<DestinationFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DestinationFilters]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinationFilters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filtersApplied with start and end date', () => {
    spyOn(component.filtersApplied, 'emit');

    component.startDate = '2025-01-01';
    component.endDate = '2025-01-10';
    component.applyFilters();

    expect(component.filtersApplied.emit).toHaveBeenCalledWith({
      startDate: '2025-01-01',
      endDate: '2025-01-10'
    });
  });
});
