import { Injectable } from '@angular/core'

import { BaseService } from './base.service'

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private _entity = 'application'
  private _secondaryEntity = 'submitapplication'
  private _save_secondaryEntity = 'saveapplication'

  constructor(private service: BaseService) { }

  updateApplicationSaveAsDraft(data: any) {
    // console.log("service updateApplicationSaveAsDraft")
    // console.log(this._entity)
    // console.log(data)
    return this.service.update(this._entity, data)
  }

  updateApplicationSubmit(data: any) {
    // console.log("service updateApplicationSubmit")
    // console.log(this._entity)
    // console.log(this._secondaryEntity)
    // console.log(data)
    return this.service.updateSecondaryEntity(this._entity,this._secondaryEntity, data)
  }

  authenticateUserApplication(data: any) {
    return this.service.customPutSecondaryEntity("users", "authenticate_user_app", data)
  }

  addApplicationSubmit(data: any) {
    return this.service.addSecondaryEntity(this._entity, this._secondaryEntity, data)
  }

  addApplicationSaveAsDraft(data: any) {
    // console.log("service addApplicationSaveAsDraft")
    // console.log(this._entity)
    // console.log(this._save_secondaryEntity)
    return this.service.addSecondaryEntity(this._entity, this._save_secondaryEntity, data)
  }

  addApplicantNextOfKin(data: any) {
    return this.service.addSecondaryEntity(this._entity, "applicantnextofkin", data)
  }

  updateApplicantNextOfKin(data: any) {
    return this.service.updateSecondaryEntity(this._entity, "applicantnextofkin", data)
  }

  deleteApplicantNextOfKin(id: string) {
    return this.service.deleteSecondaryEntity(this._entity, "applicantnextofkin", id)
  }

  // Added by Hakim on 26 Jan 2021 - Start
  addApplicantSEAExp(data: any) {
    return this.service.addSecondaryEntity(this._entity, "applicantseaexperience", data)
  }

  updateApplicantSEAExp(data: any) {
    return this.service.updateSecondaryEntity(this._entity, "applicantseaexperience", data)
  }

  deleteApplicantSEAExp(id: string) {
    return this.service.deleteSecondaryEntity(this._entity, "applicantseaexperience", id)
  }
  // Added by Hakim on 26 Jan 2021 - End

  uploadDocument(Id: string, userId: string, document: File, columnType: string) {
    return this.service.uploadFile(Id, userId, document, columnType)
  }

  deleteDocument(Id: string) {
    return this.service.deleteFile(this._entity, 'document', Id)
  }
}
