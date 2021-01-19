import { Injectable } from '@angular/core'

import { BaseService } from './base.service'

@Injectable({
  providedIn: 'root'
})
export class ReligionService {
  private _entity = 'religion'

  constructor(private service: BaseService) { }

  getAllReligions() {
    return this.service.get(this._entity)
  }

  addReligion(data: any) {
    return this.service.add(this._entity, data)
  }

  updateReligion(data: any) {
    return this.service.update(this._entity, data)
  }

  deleteReligion(id: string) {
    return this.service.delete(this._entity, id)
  }
}
