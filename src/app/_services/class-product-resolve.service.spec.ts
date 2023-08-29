import { TestBed } from '@angular/core/testing';

import { ClassProductResolveService } from './class-product-resolve.service';

describe('ClassProductResolveService', () => {
  let service: ClassProductResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassProductResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
