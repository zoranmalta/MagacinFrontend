import { TestBed } from '@angular/core/testing';

import { PoslovniPartnerService } from './poslovni-partner.service';

describe('PoslovniPartnerService', () => {
  let service: PoslovniPartnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoslovniPartnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
