import { Injectable } from '@angular/core'

import { BaseService } from './base.service'

@Injectable({
  providedIn: 'root'
})
export class VesselService {
  private _entity = 'vessel'

  constructor(private service: BaseService) { }

  getAllVessels() {
    console.log("check entity")
    console.log(this._entity)
    return this.service.get(this._entity)
  }

  addVessel(data: any) {
    return this.service.add(this._entity, data)
  }

  updateVessel(data: any) {
    return this.service.update(this._entity, data)
  }

  deleteVessel(id: string) {
    return this.service.delete(this._entity, id)
  }
}
