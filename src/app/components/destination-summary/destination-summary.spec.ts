import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestinationSummary } from './destination-summary';

describe('DestinationSummary', () => {
  let component: DestinationSummary;
  let fixture: ComponentFixture<DestinationSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinationSummary],
    }).compileComponents();

    fixture = TestBed.createComponent(DestinationSummary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
