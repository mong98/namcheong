import { Injectable } from '@angular/core'

import { BaseService } from './base.service'

@Injectable({
  providedIn: 'root'
})
export class RelationshipService {
  private _entity = 'relationship'

  constructor(private service: BaseService) { }

  getAllRelationships() {
    return this.service.get(this._entity)
  }

  addRelationship(data: any) {
    return this.service.add(this._entity, data)
  }

  updateRelationship(data: any) {
    return this.service.update(this._entity, data)
  }

  deleteRelationship(id: string) {
    return this.service.delete(this._entity, id)
  }
}
