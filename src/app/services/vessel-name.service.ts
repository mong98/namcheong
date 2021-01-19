import { Injectable } from '@angular/core'

import { BaseService } from './base.service'

@Injectable({
  providedIn: 'root'
})
export class VesselNameService {
  private _entity = 'vessel_name'

  constructor(private service: BaseService) { }

  getVesselName() {
    return this.service.get(this._entity)
  }
}