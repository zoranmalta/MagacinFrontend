import { TestBed } from '@angular/core/testing';

import { PrometniDokumentService } from './prometni-dokument.service';

describe('PrometniDokumentService', () => {
  let service: PrometniDokumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrometniDokumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
