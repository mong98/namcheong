import { Injectable } from '@angular/core';

import { BaseService } from './base.service'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _entity = 'users'
  private _secondaryentity = 'admin'
  private _thirdentity = 'user'
  private _updateuserpassword = 'userpassword'
  private _updateadminpassword = 'adminpassword'

  constructor(private service: BaseService) { }

  loginAdmin(data: any) {
    return this.service.loginAdmin(this._entity, this._secondaryentity, data)
  }

  loginUser(data: any) {
    return this.service.loginUser(this._entity, this._thirdentity, data)
  }

  addApplicantUser(data: any) {
    return this.service.addSecondaryEntity(this._entity, this._thirdentity, data)
  }

  getAdminUser() {
    return this.service.get(this._entity)
  }

  addAdminUser(data: any) {
    return this.service.add(this._entity, data)
  }

  updateAdminPassword(data: any) {
    return this.service.updateSecondaryEntity(this._entity,this._updateadminpassword, data)
  }

  updateUserPassword(data: any) {
    return this.service.updateSecondaryEntity(this._entity,this._updateuserpassword, data)
  }

  deleteAdmin(id: string) {
    return this.service.delete(this._entity, id)
  }
}