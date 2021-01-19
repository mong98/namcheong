import { Injectable } from '@angular/core'
import { BaseService } from './base.service'

@Injectable({
  providedIn: 'root'
})
export class MatrixTemplateService {
  private _entity = 'matrix_template'

  constructor(private service: BaseService) { }

  getMatrixTemplate() {
    return this.service.get(this._entity)
  }
  addMatrixTemplate(data: any) {
    return this.service.add(this._entity, data)
  }

  updateMatrixTemplate(data: any) {
    return this.service.update(this._entity, data)
  }

  deleteMatrixTemplate(id: string) {
    return this.service.delete(this._entity, id)
  }
}