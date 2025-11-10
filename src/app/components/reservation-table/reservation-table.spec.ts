import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservationTable } from './reservation-table';

describe('ReservationTable', () => {
  let component: ReservationTable;
  let fixture: ComponentFixture<ReservationTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationTable]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationTable);
    component = fixture.componentInstance;
    component.reservations = [
      { user: 'Usuario 1', checkIn: new Date(), checkOut: new Date(), status: 'Pendiente' }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly assign badge class for status', () => {
    expect(component.getBadgeClass('completada')).toBe('bg-success');
    expect(component.getBadgeClass('pendiente')).toBe('bg-warning text-dark');
    expect(component.getBadgeClass('cancelada')).toBe('bg-danger');
    expect(component.getBadgeClass('otro')).toBe('bg-secondary');
  });
});
