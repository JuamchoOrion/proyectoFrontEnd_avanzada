import { TestBed } from '@angular/core/testing';

import { ImageService } from './image.services';

describe('Image', () => {
  let service: ImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Image);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
