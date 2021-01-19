import { Injectable } from '@angular/core'

import { BaseService } from './base.service'

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  private _entity = 'race'

  constructor(private service: BaseService) { }

  getAllRaces() {
    return this.service.get(this._entity)
  }

  addRace(data: any) {
    return this.service.add(this._entity, data)
  }

  updateRace(data: any) {
    return this.service.update(this._entity, data)
  }

  deleteRace(id: string) {
    return this.service.delete(this._entity, id)
  }
}
