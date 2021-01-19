import { Injectable } from '@angular/core'

import { BaseService } from './base.service'

@Injectable({
  providedIn: 'root'
})
export class MatrixFieldService {
  private _entity = 'matrix_field'

  constructor(private service: BaseService) { }

  getMatrixField() {
    return this.service.get(this._entity)
  }
}