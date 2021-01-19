import { TestBed } from '@angular/core/testing';

import { PortOfRegistryService } from './portofregistry.service';

describe('PortOfRegistryService', () => {
  let service: PortOfRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortOfRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
