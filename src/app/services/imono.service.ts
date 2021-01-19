import { Injectable } from '@angular/core'

import { BaseService } from './base.service'

@Injectable({
  providedIn: 'root'
})
export class ImoNoService {
  private _entity = 'imono'
  private _secondaryEntity = 'vessel'

  constructor(private service: BaseService) { }

  getAllImoNos() {
    return this.service.get(this._entity)
  }

  getAllVessels() {
    return this.service.getSecondaryEntity(this._entity, this._secondaryEntity)
  }

  addImoNo(data: any) {
    return this.service.add(this._entity, data)
  }

  updateImoNo(data: any) {
    return this.service.update(this._entity, data)
  }

  deleteImoNo(id: string) {
    return this.service.delete(this._entity, id)
  }
}
