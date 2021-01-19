import { Injectable } from '@angular/core'

import { BaseService } from './base.service'

@Injectable({
  providedIn: 'root'
})
export class IssuingAuthorityService {
  private _entity = 'issuingauthority'

  constructor(private service: BaseService) { }

  getAllIssuingAuthorities() {
    return this.service.get(this._entity)
  }

  addIssuingAuthority(data: any) {
    return this.service.add(this._entity, data)
  }

  updateIssuingAuthority(data: any) {
    return this.service.update(this._entity, data)
  }

  deleteIssuingAuthority(id: string) {
    return this.service.delete(this._entity, id)
  }
}
