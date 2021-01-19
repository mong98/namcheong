import { TestBed } from '@angular/core/testing'

import { ContactListsService } from './contactLists.service'

describe('ContactListsService', () => {
  let service: ContactListsService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(ContactListsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
