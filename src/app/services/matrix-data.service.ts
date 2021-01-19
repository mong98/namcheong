import { Injectable } from '@angular/core'

import { BaseService } from './base.service'

@Injectable({
  providedIn: 'root'
})
export class MatrixDataService {
  private _entity = 'matrix_data'

  constructor(private service: BaseService) { }

  getMatrixData(contractDate: string, vesselName: string) {
    const queryMap = new Map()
    return this.service.getWithParams(this._entity, {
      'ContractPeriodFrom': contractDate,
      'VesselName': vesselName
    })
  }
}