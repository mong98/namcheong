import { TestBed } from '@angular/core/testing'

import { ImoNoService } from './imono.service'

describe('ImonoService', () => {
  let service: ImoNoService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(ImoNoService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
