import { TestBed } from '@angular/core/testing';

import { PadrinoService } from './padrino.service';

describe('PadrinoService', () => {
  let service: PadrinoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PadrinoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
