import { TestBed } from '@angular/core/testing';

import { HostProfileServices } from './host-profile.services';

describe('HostProfileServices', () => {
  let service: HostProfileServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HostProfileServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
