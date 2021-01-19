import { Injectable } from '@angular/core'

import { BaseService } from './base.service'

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private _entity = 'state'

  constructor(private service: BaseService) { }

  getAllStates() {
    return this.service.get(this._entity)
  }

  addState(data: any) {
    return this.service.add(this._entity, data)
  }

  updateState(data: any) {
    return this.service.update(this._entity, data)
  }

  deleteState(id: string) {
    return this.service.delete(this._entity, id)
  }
}
