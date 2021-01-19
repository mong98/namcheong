import { Injectable } from '@angular/core'

import { BaseService } from './base.service'

@Injectable({
  providedIn: 'root'
})
export class OpenVacancyService {
  private _entity = 'openvacancy'

  constructor(private service: BaseService) { }

  getAllOpenVacancies() {
    return this.service.get(this._entity)
  }

  getAppliedOpenVacancy(LoginEmail: string) {
    console.log("come to getAppliedOpenVacancy")
    return this.service.getSecondaryEntityById(this._entity, "appliedopenvacancy", LoginEmail)
  }

  // getApplicantApplyByLoginEmail(LoginEmail: string) {
  //   return this.service.getSecondaryEntityById(this._entity, "applicantapply", LoginEmail)
  // }

  // getDocumentChecklistById(id: string) {
  //   return this.service.getById(this._entity, id)
  // }

  addOpenVacancy(data: any) {
    return this.service.add(this._entity, data)
  }

  updateOpenVacancy(data: any) {
    return this.service.update(this._entity, data)
  }

  deleteOpenVacancy(id: string) {
    return this.service.delete(this._entity, id)
  }
}
