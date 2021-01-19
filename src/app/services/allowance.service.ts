import { Injectable } from '@angular/core'

import { BaseService } from './base.service'

@Injectable({
  providedIn: 'root'
})
export class AllowanceService {
  private _entity = 'allowance'

  constructor(private service: BaseService) { }

  getAllAllowances() {
    return this.service.get(this._entity)
  }

  addAllowance(data: any) {
    return this.service.add(this._entity, data)
  }

  updateAllowance(data: any) {
    return this.service.update(this._entity, data)
  }

  deleteAllowance(id: string) {
    return this.service.delete(this._entity, id)
  }
}
