import { TestBed } from '@angular/core/testing';

import { OpenVacancyService } from './openvacancy.service';

describe('OpenVacancyService', () => {
  let service: OpenVacancyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenVacancyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
