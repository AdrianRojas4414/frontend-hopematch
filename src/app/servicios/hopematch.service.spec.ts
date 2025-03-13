import { TestBed } from '@angular/core/testing';

import { HopematchService } from './hopematch.service';

describe('HopematchService', () => {
  let service: HopematchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HopematchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
