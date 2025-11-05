import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationSection } from './destination-section';

describe('DestinationSection', () => {
  let component: DestinationSection;
  let fixture: ComponentFixture<DestinationSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinationSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinationSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
