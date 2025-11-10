import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationDescription } from './destination-description';

describe('DestinationDescription', () => {
  let component: DestinationDescription;
  let fixture: ComponentFixture<DestinationDescription>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinationDescription]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinationDescription);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
