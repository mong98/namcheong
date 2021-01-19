import { Injectable } from '@angular/core'

import { BaseService } from './base.service'

@Injectable({
  providedIn: 'root'
})
export class ContactListsService {
  private _entity = 'contact_lists'

  constructor(private service: BaseService) { }

  getContactLists() {
    return this.service.get(this._entity)
  }

  addContactLists(data: any) {
    return this.service.add(this._entity, data)
  }
}