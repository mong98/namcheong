import { Injectable } from '@angular/core'

import { BaseService } from './base.service'

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private _entity = 'position'

  constructor(private service: BaseService) { }

  getAllPositions() {
    return this.service.get(this._entity)
  }

  addPosition(data: any) {
    return this.service.add(this._entity, data)
  }

  updatePosition(data: any) {
    return this.service.update(this._entity, data)
  }

  deletePosition(id: string) {
    return this.service.delete(this._entity, id)
  }
}
