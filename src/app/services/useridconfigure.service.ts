import { Injectable } from '@angular/core'

import { BaseService } from './base.service'

@Injectable({
  providedIn: 'root'
})
export class UserIdConfigService {
  private _entity = 'useridconfigure'

  constructor(private service: BaseService) { }

  getAllUserIdConfigs() {
    return this.service.get(this._entity)
  }

  getAllManagers() {
    return this.service.getSecondaryEntity(this._entity, 'managerlist')
  }

  getUserIdConfigById(id: string) {
    return this.service.getById(this._entity, id)
  }

  getAllUserModules() {
    return this.service.getSecondaryEntity(this._entity, 'usermodule')
  }

  addUserIdConfig(data: any) {
    return this.service.add(this._entity, data)
  }

  updateUserIdConfig(id: string, data: any) {
    return this.service.updateWithId(this._entity, id, data)
  }

  deleteUserIdConfig(id: string) {
    return this.service.delete(this._entity, id)
  }

  uploadSignature(Id: string, userId: string, signature: File) {
    return this.service.uploadFile(Id, userId, signature, 'signature')
  }

  uploadSignatureAdmin(Id: string, userId: string, signature: File) {
    return this.service.uploadFile(Id, userId, signature, 'signatureAdmin')
  }

  deleteSignature(Id: string) {
    return this.service.deleteFile(this._entity, 'signature', Id)
  }
  deleteSignatureAdmin(Id: string) {
    return this.service.deleteFile(this._entity, 'signatureAdmin', Id)
  }
  getAdminDetails(Id: string) {
    return this.service.getAdminDetails(this._entity, 'getAdminDetails', Id)
  }
}
