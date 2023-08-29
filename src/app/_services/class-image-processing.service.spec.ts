import { TestBed } from '@angular/core/testing';

import { ClassImageProcessingService } from './class-image-processing.service';

describe('ClassImageProcessingService', () => {
  let service: ClassImageProcessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassImageProcessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
