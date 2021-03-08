import { Component, OnDestroy, OnInit } from '@angular/core'
import { ApplicantService } from '../../services/applicant.service'
import { PositionService } from '../../services/position.service'
import { ImoNoService } from '../../services/imono.service'
import { VesselService } from '../../services/vessel.service'
import { PortOfRegistryService } from '../../services/portofregistry.service'
import { AllowanceService } from '../../services/allowance.service'
import { IssuingAuthorityService } from '../../services/issuingauthority.service'
import { UserIdConfigService } from '../../services/useridconfigure.service'
import { RelationshipService } from '../../services/relationship.service'
import { BaseService } from '../../services/base.service'
import { Vessel } from '../../interfaces/vessel'

import { Injectable } from '@angular/core'
import { Subscription } from 'rxjs'
import {
  Applicant,
  ApplicantDocument,
  ApplicantStatus,
  ApplicantNextOfKin,
  ApplicantDropdownId,
  Currency,
  ApplicantGeneralQuestion, // Added by Hakim on 2 Feb 2021
  ApplicantGeneralAnswer, // Added by Hakim on 2 Feb 2021
  ApplicantMedicalQuestion, // Added by Hakim 2 Feb 2021
  ApplicantMedicalAnswer // Added by Hakim 2 Feb 2021
} from '../../interfaces/applicant'
import { Position } from '../../interfaces/position'
import { ImoNo, VesselType } from '../../interfaces/imono'
import { PortOfRegistry } from '../../interfaces/portofregistry'
import { Allowance } from '../../interfaces/allowance'
import { Router, ActivatedRoute } from '@angular/router'
import { IssuingAuthority } from '../../interfaces/issuingauthority'
import { environment } from '../../../environments/environment'

import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { SignatureComponent } from './signature/signature.component'

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'ngx-view-applicant',
  templateUrl: './view-applicant.html',
  styleUrls: ['./view-applicant.scss'],
})
export class ViewApplicantComponent implements OnInit, OnDestroy {
  data: any = []
  applicant: any = []
  applicantStatus: any = []
  positions: any = []
  imonos: any = []
  vessels: any = []
  portsOfRegistry: any = []
  currencies: any = []
  allowances: any = []
  genderlist: any = []
  educationlist: any = []
  relationshiplist: any = []
  positionid: string
  daily_rate: string
  standby_rate: string
  allowance_amount: string
  contract_period: string
  issuingAuthority: any = []
  standbyRates: any = []
  signature: string
  signatureAdmin: string
  adminDetails: any = []
  generalQuestion: any = [] // Added by Hakim on 2 Feb 2021
  generalAnswer: any = [] // Added by Hakim on 2 Feb 2021
  medicalReportQuestion: any = [] // Added by Hakim on 2 Feb 2021
  medicalReportAnswer: any = [] // Added by Hakim on 2 Feb 2021

  _subscription: Subscription

  constructor(
    private signatureService: UserIdConfigService,
    private relationshipService: RelationshipService,
    private vesselService: VesselService,
    private service: ApplicantService,
    private positionService: PositionService,
    private imoNoService: ImoNoService,
    private portOfRegistryService: PortOfRegistryService,
    private activatedRoute: ActivatedRoute,
    private allowanceService: AllowanceService,
    private issuingAuthorityService: IssuingAuthorityService,
    private router: Router,
    private dialog: MatDialog,
    private baseService:BaseService
  ) {
    const navigation = this.router.getCurrentNavigation()
    this.standbyRates = [
      { Id: 1, Rate: '0.5x daily rate' },
      { Id: 2, Rate: '1.0x daily rate' },
    ]
  }

  ngOnInit(): void {
    this.medicalReportQuestion = []
    this.medicalReportAnswer = []
    this.applicant.next_of_kin = []
    this.applicant.applicant_dropdown = []
    this.applicant.applicant_documents = []
    this.applicant.SEAExp = []
    const applicantId = this.activatedRoute.snapshot.params.Id
    this.getAllowances()
    this.getCurrency()
    this.getGender()
    this.getEducation() // Added by Hakim on 2 Feb 2021
    this.getRelationships()
    //this.getApplicantById(135)
    //this.getApplicantById(1274)
    this.getApplicantById(applicantId)
    this.getPositions()
    this.getImoNo()
    this.getVesselType()
    this.getApplicantStatus()
    this.getPortsOfRegistry()
    this.getIssuingAuthorities()
    this.getAdminId()
    this.getApplicantGeneralQuestion() // Added by Hakim on 2 Feb 2021
    this.getApplicantMedicalReportQuestion() // Added by Hakim on 2 Feb 2021
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe()
    }
  }

  getIssuingAuthorities() {
    this._subscription = this.issuingAuthorityService
      .getAllIssuingAuthorities()
      .subscribe(
        (result: any) => {
          this.issuingAuthority = result
          this._refreshIssuingAuthorityData()
        },
        (err) => alert('Failed to load issuing authorities')
      )
  }

  _refreshIssuingAuthorityData() {
    this.issuingAuthority.map((item: IssuingAuthority, index: number) => {
      return {
        No: index + 1,
        Id: item.Id,
        Name: item.Name,
        Description: item.Description,
      }
    })
  }

  getCurrency() {
    this.service.getCurrency().subscribe(
    (result: any) => {
      this.currencies = result
      this._refreshCurrencyData()
    },
      (err) => alert('Failed to load Currency')
    )
  }

  _refreshCurrencyData() {
    this.currencies.map((item: Currency) => {
      return {
        Id: item.Id,
        Currency: item.Currency
      }
    })
  }

  viewFile(filePath) {
    if (filePath && filePath.length > 0) {
      window.open(`${environment.documentPathPrefix}/` + filePath, '_blank')
    }
  }

  getApplicantById(Id) {
    this.service.getApplicantById(Id).subscribe(
      (result) => {
        this.data = result
        this.applicant = result
       
        this._refreshData()
      },
      (err) => alert('Failed to load applicant')
    )
  }

  getApplicantDocument(Id, LoginEmail, PositionID) {
    this.applicant.applicant_documents = []
    //this.applicantLoginEmail = this.activatedRoute.snapshot.params.LoginEmail
    // route.snapshot.paramMap.get

    this.service
      .getApplicantDocument(
        '?Id=' + Id + '&LoginEmail=' + LoginEmail + '&PositionID=' + PositionID
      )
      .subscribe(
        (result) => {
          this.applicant.applicant_documents = result
          this._refreshApplicantDocument()
        },
        (err) => alert('Failed to load applicant')
      )
  }

  _refreshApplicantDocument() {
    this.applicant.applicant_documents.map((item: ApplicantDocument) => {
      return {
        DocumentID: item.DocumentID,
        Document: item.Document,
        Chk: item.Chk,
        DocNo: item.DocNo,
        DtExpiry: new Date(item.DtExpiry),
        DtIssue: new Date(item.DtIssue),
        Position: item.Position,
        ChkDocType: item.DocType,
        ChkDocFile: item.DocFile,
        ApplicantDocNo: item.ApplicantDocNo,
        ApplicantDocDtIssue: item.ApplicantDocDtIssue,
        ApplicantDocDtExpiry: item.ApplicantDocDtExpiry,
        ApplicantDocType: item.ApplicantDocType,
        ApplicantDocFileName: item.ApplicantDocFileName,
        ApplicantDocFile: item.ApplicantDocFile,
        FilePath: item.FilePath,
        FileNamePath: item.FileNamePath,
        FileText: item.FileText,
      }
    })
    //this.applicant.applicant_documents.DocDtIssue=new Date(this.applicant.applicant_documents.DocDtIssue);
    //this.applicant.applicant_documents.DocDtExpiry=new Date(this.applicant.applicant_documents.DocDtExpiry);
  }

  getPositions() {
    this.positionService.getAllPositions().subscribe(
      (result) => {
        this.positions = result
        this._refreshPositionData()
      },
      (err) => { console.log(err); alert('Failed to load positions') }
    )
  }

  getApplicantStatus() {
    this.service.getApplicantStatus().subscribe(
      (result: any) => {
        this.applicantStatus = result
        this._refreshApplicantStatusData()
      },
      (err) => alert('Failed to load Applicant Status')
    )
  }

  _refreshApplicantStatusData() {
    this.applicantStatus.map((item: ApplicantStatus) => {
      return {
        Id: item.Id,
        IMONo: item.ApplicantStatus,
      }
    })
  }

  getImoNo() {
    this.imoNoService.getAllImoNos().subscribe(
      (result: any) => {
        this.imonos = result
        this._refreshImoNoData()
      },
      (err) => alert('Failed to load IMO No')
    )
  }

  _refreshImoNoData() {
    this.imonos.map((item: ImoNo) => {
      return {
        Id: item.Id,
        IMONo: item.IMONo,
        VesselName: item.VesselName,
      }
    })
  }

  getApplicantDropdown(Id) {
    this.applicant.applicant_dropdown = []
    this.service.getApplicantDropdown(Id).subscribe(
      (result) => {
        this.applicant.applicant_dropdown = result[0]
        this._refreshApplicantDropdownData()
      },
      (err) => alert('Failed to load applicant dropdown ids')
    )
  }

  _refreshApplicantDropdownData() {}

  getPortsOfRegistry() {
    this.portOfRegistryService.getAllPortsOfRegistry().subscribe(
      (result) => {
        this.portsOfRegistry = result
        this._refreshPortOfRegistryData()
      },
      (err) => alert('Failed to load ports of registry')
    )
  }

  _refreshPortOfRegistryData() {
    this.portsOfRegistry.map((item: PortOfRegistry, index: number) => {
      return {
        No: index + 1,
        Id: item.Id,
        PortOfRegistry: item.PortOfRegistry,
      }
    })
  }

  // getVesselType() {
  //   this.imoNoService.getAllVessels().subscribe(
  //     (result: any) => {
  //       this.vessels = result
  //       this._refreshVesselData()
  //     },
  //     (err) => alert('Failed to load Vessel Type')
  //   )
  // }

  getVesselType() {
    this.vesselService.getAllVessels().subscribe(
      (result: any) => {
        this.vessels = result
        this._refreshVesselData()
      },
      (err) => alert('Failed to load vessels')
    )
  }

  _refreshVesselData() {
    this.vessels.map((item: Vessel, index: number) => {
      return {
        No: index + 1,
        Id: item.Id,
        VesselType: item.VesselType,
        VesselName: item.VesselName
      }
    })
  }

  getApplicantNextOfKin(LoginEmail) {
    this.applicant.next_of_kin = []
    this.service.getApplicantNextOfKin(LoginEmail).subscribe(
      (result: any) => {
        this.applicant.next_of_kin = result
        this._refreshNextOfKinData()
      },
      (err) => alert('Failed to load Next Of Kin')
    )
  }

  _refreshNextOfKinData() {
    this.applicant.next_of_kin.map((item: ApplicantNextOfKin) => {
      //let relationshipObj = this.relationshiplist.find(i => i.value == item.NOKRelationship)
      item.NOKGender = this.mapGenderToName(item.NOKGender)
      item.NOKRelationship = this.mapRelationshipToName(item.NOKRelationship)
      return {
        // Id: item.Id,
        // ApplyID: item.ApplyID,
        // UserID: item.UserID,
        // NOKName: item.NOKName,
        NOKRelationship: item.NOKRelationship,
        // NOKOccupaction: item.NOKOccupaction,
        // NOKAge: item.NOKAge,
        // NOKContactNumber: item.NOKContactNumber,
        // NOKDOB: item.NOKDOB,
        // Age: item.NOKAge,
        Id: item.Id,
        ApplyID: item.ApplyID,
        UserID: item.UserID,
        // Added by Hakim on 12 Jan 2021 - Start
        // Update for changes no. 4 in Application For Employment (0106 NC Comment_11012021.docx)
        NOKName: item.NOKName,
        NOKMiddlename: item.NOKMiddleName,
        NOKLastname: item.NOKLastName,
        // Added by Hakim on 12 Jan 2021 - End
        //NOKRelationship: relationshipObj != null ? relationshipObj.title : "", // Update by Hakim on 14 Jan 2021
        NOKOccupaction: item.NOKOccupaction,
        //NOKGender: item.NOKGender == "1" ? "Male" : "Female", // Update by Hakim on 14 Jan 2021
        NOKGender: item.NOKGender,
        NOKAge: item.NOKAge,
        NOKContactNumber: item.NOKContactNumber,
        NOKDOB: item.NOKDOB,
        // Updated by Hakim on 12 Jan 2021 - Start
        // Update for changes no. 4 in Application For Employment (0106 NC Comment_11012021.docx)
        NOKHandicap: item.NOKHandicap,
        NOKEmployment: item.NOKEmployment,
        // Added by Hakim on 12 Jan 2021 - End  
        No: item.SeqNo
      }
    })
  }

  // Added by Hakim on 2 Feb 2021 - Start
  getApplicantGeneralQuestion() {
    this.service.getApplicantGeneralQuestion().subscribe(
    (result: any) => {
      this.generalQuestion = result
      this._refreshApplicantGeneralQuestionData()
    },
      (err) => alert('Failed to load Applicant Status')
    )
  }

  _refreshApplicantGeneralQuestionData() {
    this.generalQuestion.map((item: ApplicantGeneralQuestion) => {
      return {
        Id: item.Id,
        Type: item.Type,
        Question: item.Question,
        YesNo: item.YesNo,
        Rating: item.Rating,
        TxtBox: item.TxtBox,
        FileNeeded: item.FileNeeded,
        PositionRelated: item.PositionRelated
      }
    })
  }

  getApplicantGeneralAnswer(ApplyID: string) {
    this.service.getApplicantGeneralAnswerById(ApplyID).subscribe(
    (result: any) => {
      if(result != null && result.length > 0)
        this.generalAnswer = result
      this._refreshApplicantGeneralAnswerData()
    },
      (err) => alert('Failed to load question')
    )
  }

  _refreshApplicantGeneralAnswerData() {
    this.generalAnswer = this.generalAnswer.map((item: ApplicantGeneralAnswer) => {
      return {
        Id: item.Id,
        Type: item.Type,
        ApplyID: item.ApplyID,
        LoginEmail: item.LoginEmail,
        QuestionId: item.QuestionId,
        Answer: item.Answer == 'Y' ? 'Yes' : 'No',
        Description: item.Description,
        FilePath: item.FilePath
      }
    })
  }

  getApplicantMedicalReportQuestion() {
    this.service.getApplicantMedicalReportQuestion().subscribe(
    (result: any) => {
      this.medicalReportQuestion = result
      this._refreshApplicantMedicalReportQuestionData()
    },
      (err) => alert('Failed to load Applicant Status')
    )
  }

  _refreshApplicantMedicalReportQuestionData() {
    this.medicalReportQuestion.map((item: ApplicantMedicalQuestion) => {
      return {
        Id: item.Id,
        Type: item.Type,
        Question: item.Question,
        YesNo: item.YesNo,
        Rating: item.Rating,
        TxtBox: item.TxtBox,
        FileNeeded: item.FileNeeded,
        PositionRelated: item.PositionRelated,
        CheckupDt: item.CheckupDt,
        ExpiryDt: item.ExpiryDt
      }
    })
  }

  getApplicantMedicalReportAnswer(ApplyID: string) {
    this.service.getApplicantMedicalReportAnswerById(ApplyID).subscribe(
    (result: any) => {
      if(result != null && result.length > 0)
        this.medicalReportAnswer = result
      this._refreshApplicantMedicalReportAnswerData()
    },
      (err) => alert('Failed to load question')
    )
  }

  _refreshApplicantMedicalReportAnswerData() {
    this.medicalReportAnswer = this.medicalReportAnswer.map((item: ApplicantMedicalAnswer) => {
      return {
        Id: item.Id,
        Type: item.Type,
        ApplyID: item.ApplyID,
        LoginEmail: item.LoginEmail,
        QuestionId: item.QuestionId,
        Answer: item.Answer == 'Y' ? 'Yes' : 'No',
        Description: item.Description,
        FilePath: item.FilePath,
        AnsCheckupDt: item.AnsCheckupDt != null ? new Date(item.AnsCheckupDt).getDate() + '/' + (new Date(item.AnsCheckupDt).getMonth()+1) + '/' + new Date(item.AnsCheckupDt).getFullYear() : '',
        AnsExpiryDt: item.AnsExpiryDt != null ? new Date(item.AnsExpiryDt).getDate() + '/' + (new Date(item.AnsExpiryDt).getMonth()+1) + '/' + new Date(item.AnsExpiryDt).getFullYear() : ''
      }
    })
  }
  // Added by Hakim on 2 Feb 2021 - End

  mapStandByRateToId(id) {
    for (var i =0; i < this.standbyRates.length; i++) {
      var item = this.standbyRates[i]
      if (item.Id == id) {
        //this.applicant.CurrencyID = item.Id;
        return item.Rate
      }
    }
  }

  getGender() {
    this._subscription = this.service.getGender().subscribe(
      (result: any) => {
        this.genderlist = result
        //this._refreshCountryData()
      },
      (err) => alert('Failed to load Gender')
    )
  }

  // Added by Hakim on 2 Feb 2021 - Start
  getEducation() {
    this._subscription = this.service.getEducation().subscribe(
      (result: any) => {
        this.educationlist = result
        //this._refreshCountryData()
      },
      (err) => alert('Failed to load Education')
    )
  }
  // Added by Hakim on 2 Feb 2021 - End

  getRelationships() {
    this._subscription = this.relationshipService.getAllRelationships().subscribe(
      (result: any) => {
        this.relationshiplist = result
      },
      (err) => alert('Failed to load relationships')
    )
  }

  mapRelationshipToName(id) {
    for (var i =0; i < this.relationshiplist.length; i++) {
      var item = this.relationshiplist[i]
      if (item.Id == id) {
        //this.applicant.CurrencyID = item.Id;
        return item.Relationship
      }
    }
  }

  mapGenderToName(id) {
    for (var i =0; i < this.genderlist.length; i++) {
      var item = this.genderlist[i]
      if (item.Id == id) {
        //this.applicant.CurrencyID = item.Id;
        return item.Gender
      }
    }
  }

  // Added by Hakim on 2 Feb 2021 - Start
  mapEducationToName(id) {
    for (var i =0; i < this.educationlist.length; i++) {
      var item = this.educationlist[i]
      if (item.Id == id) {
        return item.Education
      }
    }
  }
  // Added by Hakim on 2 Feb 2021 - Start

  mapCurrencyToId(name) {
    for (var i =0; i < this.currencies.length; i++) {
      var item = this.currencies[i]
      if (item.Currency == name) {
        //this.applicant.CurrencyID = item.Id;
        return item.Id
      }
    }
  }

  mapCurrencyToName(id) {
    for (var i =0; i < this.currencies.length; i++) {
      var item = this.currencies[i]
      if (item.Id == id) {
        //this.applicant.CurrencyID = item.Id;
        return item.Currency
      }
    }
  }

  _refreshData() {
    this.applicant.CurrencyID = this.mapCurrencyToId(this.applicant.Currency) 
    this.applicant.GenderName = this.mapGenderToName(this.applicant.Gender)
    this.applicant.Education = this.mapEducationToName(this.applicant.Education) // Added by Hakim on 2 Feb 2021
    console.log(this.applicant)
    //this.applicant.EmergencyContactRelationship = this.mapRelationshipToName(this.applicant.EmergencyContactRelationship)
    //this.standbyRates = this.standby_rate
    /*this.source.load(
      this.applicant.map((item: Applicant, index: number) => {
        return {
          No: index + 1,
          ApplyPosition: item.ApplyPosition,
          ApplyPositionID: item.ApplyPositionID,
          ApplyDtApplication: item.ApplyDtApplication,
          LoginEmail: item.LoginEmail,
          Name: item.Name,
          Gender: item.Gender,
          IC: item.IC,
          Passport: item.Passport,
          ValidityDate: item.ValidityDate,
          DOB: item.DOB,
          PlaceofBirth: item.PlaceofBirth,
          CountryOfOrigin: item.CountryOfOrigin,
          MaritalStatus: item.MaritalStatus,
          Nationality: item.Nationality,
          NationalityOthers: item.NationalityOthers,
          Race: item.Race,
          Raceothers: item.Raceothers,
          Religion: item.Religion,
          Religionothers: item.Religionothers,
          PermanentAddress: item.PermanentAddress,
          PPostCode: item.PPostCode,
          PState: item.PState,
          PStateOthers: item.PStateOthers,
          Residentialaddress: item.Residentialaddress,
          RPostCode: item.RPostCode,
          RState: item.RState,
          RStateOthers: item.RStateOthers,
          Contact_MobileCtryCode: item.Contact_MobileCtryCode,
          Contact_MobileAreaCode: item.Contact_MobileAreaCode,
          Contact_Mobile: item.Contact_Mobile,
          Contact_HouseCtryCode: item.Contact_HouseCtryCode,
          Contact_HouseAreaCode: item.Contact_HouseAreaCode,
          Contact_House: item.Contact_House,
          RepatriationHomePort: item.RepatriationHomePort,
          EmergencyContactName: item.EmergencyContactName,
          EmergencyContactRelationship: item.EmergencyContactRelationship,
          EmergencyContact_MobileCtryCode: item.EmergencyContact_MobileCtryCode,
          EmergencyContact_MobileAreaCode: item.EmergencyContact_MobileAreaCode,
          EmergencyContact_Mobile: item.EmergencyContact_Mobile,
          EmergencyContact_HouseCtryCode: item.EmergencyContact_HouseCtryCode,
          EmergencyContact_HouseAreaCode: item.EmergencyContact_HouseAreaCode,
          EmergencyContact_House: item.EmergencyContact_House,
          OfferPosition: item.OfferPosition ? item.OfferPosition: item.ApplyPosition,
          DailyRate: item.DailyRate,
          StandbyRate: item.StandbyRate,
          Allowance: item.Allowance,
          TypesofAllowance: item.TypesofAllowance,
          ContractPeriodFromInMth: item.ContractPeriodFromInMth,
          ContractPeriodFrom: new Date(item.ContractPeriodFrom),
          ContractPeriodTo: new Date(item.ContractPeriodTo),
          NameofVessel: item.NameofVessel,
          IMONo: item.IMONo,
          PortofRegistry: item.PortofRegistry,
          ApplyStatus: item.ApplyStatus,
          Ref1Name: item.Ref1Name,
          Ref1Company: item.Ref1Company,
          Ref1Designation: item.Ref1Designation,
          Ref1Contact: item.Ref1Contact,
          Ref2Name: item.Ref2Name,
          Ref2Company: item.Ref2Company,
          Ref2Designation: item.Ref2Designation,
          Ref2Contact: item.Ref2Contact,
          FileName: item.FileName,
          FilePath: item.FilePath,
          FileNameCV: item.FileNameCV,
          FilePathCV: item.FilePathCV,
          ApplyLoginEmail: item.ApplyLoginEmail,
          ApplyConfirmFlag: item.ApplyConfirmFlag,
          IncomeTaxNo: item.IncomeTaxNo,*/
    /*ConfirmNo: item.NationalityOthers,
          ConfirmBy: item.NationalityOthers,
          ConfirmByName: item.NationalityOthers,
          SerialNumber: item.NationalityOthers,
          ConfirmDt: Date
          GenDoc: item.NationalityOthers,
          ConfirmFlag: item.NationalityOthers,
          FileAFECreateDt: Date
          FileCVCreateDt: Date
          FileSEACreateDt: Date
          FileAFEEndDt: Date
          FileCVEndDt: Date
          FileSEAEndDt: Date
          SubmitFlag: item.SubmitFlag,
          FileAFE: item.FileAFE,
          FileCV: item.FileCV,
          FileSEA: item.FileSEA,
          ApplyLoginEmail: item.ApplyLoginEmail,
          DtApplication: Date
          SeamanCardNo: string
          SeamanCard_DtIssue: Date
          SeamanCard_DtExpiry: Date
          SeamanBookNo: string
          SeamanBook_DtIssue: Date
          SeamanBook_DtExpiry: Date
          COCNo: string
          COC_DtIssue: Date
          COC_DtExpiry: Date
          CORNo: string
          COR_DtIssue: Date
          COR_DtExpiry: Date
          SignatureBy1: string
          SignDt1: Date
          SignatureBy2: string
          SignDt2: Date
          DtCreated: Date
          DtUpdated: Date
          ForgotPasswordFlag: string
          ForgotPasswordCode: string
          ForgotPasswordDtExpiry: Date*/
    /*}
      })*/
    //)
    //if(this.applicant.length >= 1) {
    // this.applicant = this.applicant[0]
    this.getApplicantNextOfKin(this.applicant.LoginEmail)
    this.getApplicantSeaExperience(this.applicant.LoginEmail)
    this.getApplicantDocument(
      this.applicant.Id,
      this.applicant.LoginEmail,
      this.applicant.ApplyPositionID
    )
    this.getApplicantDropdown(this.applicant.Id)
    this.getApplicantGeneralAnswer(this.applicant.Id)
    this.getApplicantMedicalReportAnswer(this.applicant.Id)
    //}
  }

  _refreshPositionData() {
    this.positions.map((item: Position) => {
      return {
        Id: item.Id,
        Position: item.Position,
      }
    })
  }

  // Added by Hakim on 4 Feb 2021 - Start
  getApplicantSeaExperience(LoginEmail) {
    this.applicant.SEAExp = []
    this.service.getApplicantSeaExperience(LoginEmail).subscribe(
      (result: any) => {
        this.applicant.SEAExp = result
      },
        (err) => alert('Failed to load certification')
    )
  }
  // Added by Hakim on 4 Feb 2021 - End

  getAllowances() {
    this._subscription = this.allowanceService.getAllAllowances().subscribe(
      (result: any) => {
        this.allowances = result
        this._refreshAllowanceData()
      },
      (err) => alert('Failed to load allowances')
    )
  }

  _refreshAllowanceData() {
    this.allowances.map((item: Allowance, index: number) => {
      return {
        No: index + 1,
        Id: item.Id,
        Allowance: item.Allowance,
      }
    })
  }

  // Added by Hakim on 1 Feb 2021 - Start
  vesselIdOnChange(value) {
    let selectedVesselData = this.imonos.find(data => data.Id == this.applicant.applicant_dropdown.VesselId)
    this.applicant.applicant_dropdown.ImonoId = selectedVesselData.Id
  }
  // Added by Hakim on 1 Feb 2021 - End

  // Added by Hakim on 26 Jan 2021 - Start
  contractPeriodFromOnChange(value) {

    this.applicant.ContractPeriodFrom = value
    if (this.applicant.ContractPeriodFromInMth != null && this.applicant.ContractPeriodFrom != null) {
      let period = parseInt(this.applicant.ContractPeriodFromInMth);
      let startDate = new Date(this.applicant.ContractPeriodFrom)
      let endDate = startDate.setMonth(startDate.getMonth()+period)
      endDate = new Date(endDate).setDate(new Date(endDate).getDate()-1)
      this.applicant.ContractPeriodTo = endDate
    }
  }
  // Added by Hakim on 26 Jan 2021 - End

  // Added by Hakim on 27 Jan 2021 - Start
  contractPeriodToOnChange(value) {
    this.applicant.ContractPeriodTo = value
    if (this.applicant.ContractPeriodFrom != null) {
      let startDate = new Date(this.applicant.ContractPeriodFrom)
      let endDate = new Date(this.applicant.ContractPeriodTo)

      let diffYears = endDate.getFullYear()-startDate.getFullYear();
      let diffMonths = endDate.getMonth()-startDate.getMonth();
      let diffDays = endDate.getDate()-startDate.getDate();

      let months = (diffYears*12 + diffMonths);
      let numOfmonth = months.toString();
      if(diffDays>0) {
          numOfmonth += '.'+diffDays;
      } else if(diffDays<0) {
          months--;
          numOfmonth += '.'+(new Date(endDate.getFullYear(),endDate.getMonth(),0).getDate()+diffDays);
      }

      this.applicant.ContractPeriodFromInMth = numOfmonth
    }
  }

  contractPeriodFromInMthOnChange(value) {

    this.applicant.ContractPeriodFromInMth = Math.round(value) // Update by Hakim on 1 Feb 2021
    console.log(parseInt(value))
    if (this.applicant.ContractPeriodFrom != null && this.applicant.ContractPeriodTo != null) {
      let period = parseInt(this.applicant.ContractPeriodFromInMth);
      let startDate = new Date(this.applicant.ContractPeriodFrom)
      let endDate = startDate.setMonth(startDate.getMonth()+period)
      endDate = new Date(endDate).setDate(new Date(endDate).getDate()-1)
      this.applicant.ContractPeriodTo = endDate
    }
  }
  // Added by Hakim on 27 Jan 2021 - End

  currencyOnChange(value) {
    this.applicant.Currency = this.mapCurrencyToName(value)
  }

  onCancel(event) {
    if (
      window.confirm(
        'Do you really want to Cancel? Please update to save the changes.'
      )
    ) {
      this.router.navigate(['pages/jobportal/applicant'])
    } else {
      event.confirm.reject()
    }
  }

  onSaveSanitize() {
    // sanitize all data, convert id back to number
  }

  mapAllowanceIdToString(AllowanceIdToMap) {
    for (var i = 0; i < this.allowances.length; i++) {
      var item = this.allowances[i]
      if (item.Id == AllowanceIdToMap) {
        return item.Allowance
      }
    }
  }

  mapImonoIdToString(ImonoIdToMap) {
    for (var i = 0; i < this.imonos.length; i++) {
      var item = this.imonos[i]
      if (item.Id == ImonoIdToMap) {
        return item.IMONo
      }
    }
  }

  mapVesselIdToString(VesselIdToMap) {
    for (var i = 0; i < this.vessels.length; i++) {
      var item = this.vessels[i]
      if (item.Id == VesselIdToMap) {
        return item.VesselName
      }
    }
  }

  mapPORIdToString(PORIdToMap) {
    for (var i = 0; i < this.portsOfRegistry.length; i++) {
      var item = this.portsOfRegistry[i]
      if (item.Id == PORIdToMap) {
        return item.PortOfRegistry
      }
    }
  }

  mapApplyStatusIdToString(ApplyStatusIdToMap) {
    for (var i = 0; i < this.applicantStatus.length; i++) {
      var item = this.applicantStatus[i]
      if (item.Id == ApplyStatusIdToMap) {
        return item.ApplicantStatus
      }
    }
  }

  mapApplyPositionIdToString(ApplyPositionIdToMap) {
    for (var i = 0; i < this.positions.length; i++) {
      var item = this.positions[i]
      if (item.Id == ApplyPositionIdToMap) {
        return item.Position
      }
    }
  }

  onSaveValueMapping() {
    this.applicant.TypesofAllowance = this.mapAllowanceIdToString(
      this.applicant.applicant_dropdown.AllowanceId
    )
    this.applicant.IMONo = this.mapImonoIdToString(
      this.applicant.applicant_dropdown.ImonoId
    )
    this.applicant.NameofVessel = this.mapVesselIdToString(
      this.applicant.applicant_dropdown.VesselId
    )
    this.applicant.PortofRegistry = this.mapPORIdToString(
      this.applicant.applicant_dropdown.PORId
    )
    this.applicant.Status = this.mapApplyStatusIdToString(
      this.applicant.applicant_dropdown.ApplyStatusId
    )
    this.applicant.OfferPosition = this.mapApplyPositionIdToString(
      this.applicant.ApplyPositionID
    )


  }

  onUpdate(event) {
    if (window.confirm('Do you really want to update?')) {
      this.onSaveValueMapping()
      this.onSaveSanitize()

      if (this.applicant.ContractPeriodTo < this.applicant.ContractPeriodFrom) {
        alert('Invalid Contract Period')
      } else {
        // find a way to save/update data
        const subscription = this.service
          .updateApplicant(JSON.stringify(this.applicant))
          .subscribe((res: any) => {
            if (res.Id == null) {
              alert('Failed to update applicant')
            } else {
              alert('Update Record Successful')
              //event.confirm.resolve(event.newData)
            }
            subscription.unsubscribe()
          })
        this.router.navigate(['pages/jobportal/applicant'])
      }
    } else {
      //event.confirm.reject()
    }
  }

  onConfirmValueMapping() {}

  onConfirmAdminSignature() {
    const dialogConfig = new MatDialogConfig()
    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true
    dialogConfig.width = '60%'
    dialogConfig.data = this.applicant
    this.dialog.open(SignatureComponent, dialogConfig)
    this.onSaveValueMapping()
  }

  getAdminId() {
    this.signatureService
      .getAdminDetails(localStorage.getItem('adminUsername'))
      .subscribe(
        (result: any) => {
          if(result.length != 0){
            this.adminDetails = result[0]
            if(this.adminDetails != []){
              this.signature = this.adminDetails.Signature
              this.signatureAdmin = this.adminDetails.SignatureAdmin

              this.applicant.adminName = this.adminDetails.UserName;
            }else{
              this.signature = null;
              this.signatureAdmin = null;
            }
          }else{
            this.adminDetails = [];
            this.signature = null;
              this.signatureAdmin = null;
          }
        },
        (err) => alert('Failed to load admin details')
      )
  }

  getSignature() {

    if (this.signature != null && this.signature != '') {
      if (this.signatureAdmin != null && this.signatureAdmin != '') {
        this.onConfirm();
      } else {

        alert('Please upload Signature at User Id Configure!')
        this.router.navigate(['pages/jobportal/applicant'])
      }
    }else {
      alert('Please upload Signature at User Id Configure!')
      this.router.navigate(['pages/jobportal/applicant'])
    }
  }

  onConfirm() {
    if (window.confirm('Do you really want to confirm?')) {
      this.onSaveValueMapping()
      this.onConfirmValueMapping()
      this.onSaveSanitize()

      if (this.applicant.ContractPeriodTo < this.applicant.ContractPeriodFrom) {
        alert('Invalid Contract Period')
      } else {
        // find a way to save/update data
        // console.log("check submit data")
        // console.log(this.applicant)
        const subscription = this.service
        .updateConfirmApplicant(JSON.stringify(this.applicant))
        .subscribe((res: any) => {
          if (res.Id == null) {
            alert('Failed to confirm applicant')
          } else {
            alert('Confirm Record Successful, email sent to the applicant email, ' + this.applicant.LoginEmail)
            this.router.navigate(['pages/jobportal/applicant'])
          }
          subscription.unsubscribe()
        },(error)=>{
          alert('Failed to confirm applicant')
          console.log(error)
        })
      }
      
    } else {
      //event.confirm.reject()
    }
  }

  onBan(event) {
    if (window.confirm('Warning: do you really want to ban the applicant?')) {
      this.onSaveValueMapping()
      this.onConfirmValueMapping()
      this.onSaveSanitize()

      // find a way to save/update data
      const subscription = this.service
        .updateBanApplicant(JSON.stringify(this.applicant))
        .subscribe((res: any) => {
          if (res.Id == null) {
            alert('Failed to ban applicant')
          } else {
            alert('Ban Record Successful')
            //event.confirm.resolve(event.newData)
          }
          subscription.unsubscribe()
        })
      this.router.navigate(['pages/jobportal/applicant'])
    } else {
      //event.confirm.reject()
    }
  }
}
