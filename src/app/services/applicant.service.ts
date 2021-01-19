import { Injectable } from '@angular/core'

import { BaseService } from './base.service'

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {
  private _entity = 'applicant'
  private _secondaryentity = 'confirmapplicant'

  constructor(private service: BaseService) { }

  getCharterer() {
    return this.service.getSecondaryEntity(this._entity, 'charterer')
  }
  
  getCompetency() {
    return this.service.getSecondaryEntity(this._entity, 'competency')
  }

  getWorking() {
    return this.service.getSecondaryEntity(this._entity, 'working')
  }

  getGender() {
    return this.service.getSecondaryEntity(this._entity, 'gender')
  }

  getEducation() {
    return this.service.getSecondaryEntity(this._entity, 'education')
  }

  getDynamicPos() {
    return this.service.getSecondaryEntity(this._entity, 'dynamicpos')
  }

  getAllApplicants() {
    return this.service.get(this._entity)
  }

  getAllApplicantApplies() {
    return this.service.getSecondaryEntity(this._entity, 'applicantapply')
  }

  getApplicantGeneralQuestion() {
    return this.service.getSecondaryEntity(this._entity, "applicantgeneralquestion")
  }

  getApplicantGeneralAnswerById(ApplyID: string) {
    return this.service.getSecondaryEntityById(this._entity, "applicantgeneralanswer", ApplyID)
  }

  // Added by Hakim on 14 Jan 2021 - Start
  getApplicantMedicalReportQuestion() {
    return this.service.getSecondaryEntity(this._entity, "applicantmedicalreportquestion")
  }

  getApplicantMedicalReportAnswerById(ApplyID: string) {
    return this.service.getSecondaryEntityById(this._entity, "applicantmedicalreportanswer", ApplyID)
  }
  // Added by Hakim on 14 Jan 2021 - End

  // Added by Hakim on 13 Jan 2021 - Start
  getApplicantCertificates(LoginEmail: string) {
    return this.service.getSecondaryEntityById(this._entity, "applicantcertificates", LoginEmail)
  }
  // Added by Hakim on 13 Jan 2021 - End

  getApplicantById(id: string) {
    return this.service.getById(this._entity, id)
  }

  getApplicantApplyByLoginEmail(LoginEmail: string) {
    return this.service.getSecondaryEntityById(this._entity, "applicantapply", LoginEmail)
  }

  getApplicantByLoginEmail(LoginEmail: string) {
    return this.service.getSecondaryEntityById(this._entity, "applicantloginemail", LoginEmail)
  }

  getApplicantStatus() {
    return this.service.getSecondaryEntity(this._entity, "applicantstatus")
  }

  getCurrency() {
    return this.service.getSecondaryEntity(this._entity, "currency")
  }

  getApplicantDocument(QueryString: string) {
    return this.service.getSecondaryEntityById(this._entity, "applicantdocument", QueryString)
  }

  getApplicantNextOfKin(LoginEmail: string) {
    return this.service.getSecondaryEntityById(this._entity, "applicantnextofkin", LoginEmail)
  }

  getApplicantDropdown(id: string) {
    return this.service.getSecondaryEntityById(this._entity, "applicantdropdown", id)
  }

  addApplicant(data: any) {
    return this.service.add(this._entity, data)
  }

  updateApplicant(data: any) {
    return this.service.update(this._entity, data)
  }

  updateConfirmApplicant(data: any) {
    return this.service.updateSecondaryEntity(this._entity, this._secondaryentity, data)
  }

  updateBanApplicant(data: any) {
    return this.service.updateSecondaryEntity(this._entity, "banapplicant", data)
  }

  deleteApplicant(id: string) {
    return this.service.delete(this._entity, id)
  }
}
