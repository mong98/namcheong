import { TestBed } from '@angular/core/testing'

import { VesselService } from './vessel.service'

describe('ImonoService', () => {
  let service: VesselService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(VesselService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
