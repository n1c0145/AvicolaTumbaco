import { TestBed } from '@angular/core/testing';

import { AvicolaService } from './avicola.service';

describe('AvicolaService', () => {
  let service: AvicolaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvicolaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
