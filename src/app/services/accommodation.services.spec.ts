import { TestBed } from '@angular/core/testing';

import { AccommodationServices } from './accommodation.services';

describe('AccommodationServices', () => {
  let service: AccommodationServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccommodationServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
