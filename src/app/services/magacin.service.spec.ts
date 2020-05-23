import { TestBed } from '@angular/core/testing';

import { MagacinService } from './magacin.service';

describe('MagacinService', () => {
  let service: MagacinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MagacinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
