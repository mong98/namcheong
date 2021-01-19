import { Injectable } from '@angular/core'

import { BaseService } from './base.service'

@Injectable({
  providedIn: 'root'
})
export class MatrixService {
  private _entity = 'matrix'

  constructor(private service: BaseService) { }

  getMatrix() {
    return this.service.get(this._entity)
  }
  addMatrix(data: any) {
    return this.service.add(this._entity, data)
  }

  updateMatrix(data: any) {
    return this.service.update(this._entity, data)
  }

  deleteMatrix(id: string) {
    return this.service.delete(this._entity, id)
  }
}