import { Injectable } from '@angular/core'

import { BaseService } from './base.service'

@Injectable({
  providedIn: 'root'
})
export class PortOfRegistryService {
  private _entity = 'portofregistry'

  constructor(private service: BaseService) { }

  getAllPortsOfRegistry() {
    return this.service.get(this._entity)
  }

  addPortOfRegistry(data: any) {
    return this.service.add(this._entity, data)
  }

  updatePortOfRegistry(data: any) {
    return this.service.update(this._entity, data)
  }

  deletePortOfRegistry(id: string) {
    return this.service.delete(this._entity, id)
  }
}
