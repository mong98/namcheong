import { Injectable } from '@angular/core'

import { BaseService } from './base.service'

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private _entity = 'country'

  constructor(private service: BaseService) { }

  getAllCountries() {
    return this.service.get(this._entity)
  }

  addCountry(data: any) {
    return this.service.add(this._entity, data)
  }

  updateCountry(data: any) {
    return this.service.update(this._entity, data)
  }

  deleteCountry(id: string) {
    return this.service.delete(this._entity, id)
  }
}
