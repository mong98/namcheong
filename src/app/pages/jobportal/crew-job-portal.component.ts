import { Component, OnDestroy, OnInit } from '@angular/core'
import { ApplicantService } from '../../services/applicant.service'
import { PositionService } from '../../services/position.service'
import { DocumentChecklistService } from '../../services/documentchecklist.service'
import { ImoNoService } from '../../services/imono.service'
import { PortOfRegistryService } from '../../services/portofregistry.service'
import { AllowanceService } from '../../services/allowance.service'
import { RaceService } from '../../services/race.service'
import { ReligionService } from '../../services/religion.service'
import { RelationshipService } from '../../services/relationship.service'
import { StateService } from '../../services/state.service'
import { CountryService } from '../../services/country.service'
import { ApplicationService } from '../../services/application.service'
import { IssuingAuthorityService } from '../../services/issuingauthority.service'
//import {MatDialog} from '@angular/material/dialog'
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog'

import { Injectable } from '@angular/core'
import { Subscription } from 'rxjs'
import { Applicant, ApplicantDocument, ApplicantStatus, ApplicantNextOfKin, ApplicantGeneralQuestion, ApplicantGeneralAnswer } from '../../interfaces/applicant'
import { Position } from '../../interfaces/position'
import { DocumentChecklist } from '../../interfaces/documentchecklist'
import { ImoNo, VesselType } from '../../interfaces/imono'
import { PortOfRegistry } from '../../interfaces/portofregistry'
import { Allowance } from '../../interfaces/allowance'
import { Race } from '../../interfaces/race'
import { Religion } from '../../interfaces/religion'
import { Relationship } from '../../interfaces/relationship'
import { State } from '../../interfaces/state'
import { Country } from '../../interfaces/country'
import { IssuingAuthority } from '../../interfaces/issuingauthority'

import { DropdownListComponent } from '../../shared/DropdownListComponent.component'
import { Router, ActivatedRoute } from '@angular/router'
import { isObject } from 'util'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'ngx-crewjobportal',
  templateUrl: './crew-job-portal.component.html',
  styleUrls: ['./open-vacancy.component.scss', './crew-job-portal.component.scss'],
})
export class CrewJobPortalComponent implements OnInit, OnDestroy {
  data: any = []
  applicant: any = []
  applicantapply: any = []
  applicantStatus: any = []
  positions: any = []
  documentChecklists: any = []
  imonos: any = []
  vessels: any = []
  portsOfRegistry: any = []
  allowances: any = []
  positionid: string
  daily_rate: string
  standby_rate: string
  allowance_amount: string
  contract_period: string
  races: any[]
  religions: any[]
  relationships: any = []
  states: any = []
  countries: any = []
  maritalStatus = ['', 'Married', 'Single', 'Divorced', 'Other']
  applicantLoginEmail: string
  generalQuestion: any = []
  generalAnswer: any = []
  answer: any = {}
  yesno: any = []
  rating: any = []
  charterers: any = []
  dynamicPosCertType: any = []
  educations: any = []
  charterer_dropdown_shown: boolean = false
  charterer_dropdown_shown2: boolean = false
  defaultPositionID: number = 19
  issuingAuthority: any = []
  signaturePath: string
  signature: File
  fileUploadList: any = []
  saveSuccess: boolean = false
  url;
  msg = "";
  
  private addNew: boolean = false

  _subscription: Subscription

  constructor(private service: ApplicantService, private positionService: PositionService,
    private imoNoService: ImoNoService, private portOfRegistryService: PortOfRegistryService,
    private activatedRoute: ActivatedRoute, private allowanceService: AllowanceService,
    private raceService: RaceService, private religionService: ReligionService,
    private relationshipService: RelationshipService, private stateService: StateService,
    private countryService: CountryService, private applicationService: ApplicationService,
    private documentChecklistService: DocumentChecklistService, private issuingAuthorityService: IssuingAuthorityService,
    public dialog: MatDialog, private router: Router) {
      //const navigation = this.router.getCurrentNavigation()
      this.yesno = [{value: 'N', title: "No"},{value: 'Y', title: "Yes"}]
      this.rating = [{value: 1, title: "1"}, {value: 2, title: "2"}, {value: 3, title: "3"}, {value: 4, title: "4"}, {value: 5, title: "5"}]
      //this.answer = {1: 'Y', 2: 'N', 3: 'Y', 4: "3", 5: 'Y', 6: 'N', 7: 'Y', 8: 'N', 9: 'Y', 10: 'N'}
      this.educations = [{value: 1, title: "High School Leaver"}, {value: 2, title: "Diploma"}, 
        {value: 3, title: "Degree"}, {value: 4, title: "Postgraduate"}]
      this.charterers = [{ value: 1, title: "PETRONAS"}, {value: 2, title : "SHELL"}, 
        {value: 3, title: "MURPHY"}, {value: 4, title : "Others"}]
      this.dynamicPosCertType = [{ value: 1, title: "BASIC"}, {value: 2, title : "ADVANCED"}, 
        {value: 3, title: "LIMITED"}, {value: 4, title : "FULL/UNLIMITED"}, { value: 5, title : "MAINTENANCE"}]
      this.applicant.general = []
      this.applicant.general.LowerRank = ''
      //generalAnswer[question.Id-1].Answer
      let i: number = 0
      this.generalAnswer = []
      for(i = 0; i < 10; i++) {
        //this.generalAnswer[i] = { "Answer": 'N', "Description" : '', "FileNeeded": 'N', "Rating": '1', "YesNo": 'N' }
        this.generalAnswer.push({ "Answer": 'N', "Description" : '', "FileNeeded": 'N', "Rating": '1', "YesNo": 'N' })
      }
    }

  ngOnInit(): void {
    this.applicant.next_of_kin = []
    this.applicant.applicant_dropdown = []
    this.applicant.applicant_documents = []
    this.applicant.generalAnswer = []
    this.applicantLoginEmail = this.activatedRoute.snapshot.params.LoginEmail
    console.log(this.activatedRoute.snapshot.params.LoginEmail);
    this.getAllowances()
    //this.getApplicantById(135)
    //this.getApplicantById(1274)
    this.getApplicantByLoginEmail(this.applicantLoginEmail)
    this.getApplicantApplyByLoginEmail(this.applicantLoginEmail)
    this.getPositions()
    this.getImoNo()
    this.getVesselType()
    //this.getApplicantStatus()
    this.getPortsOfRegistry()
    this.getRaces()
    this.getReligions()
    this.getRelationships()
    this.getStates()
    this.getCountries()
    // get the general question to display
    this.getApplicantGeneralQuestion()
    this.getIssuingAuthorities()
  }

  getIssuingAuthorities() {
    this._subscription = this.issuingAuthorityService.getAllIssuingAuthorities().subscribe(
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
        Description: item.Description
      }
    })
  }

  addCharterer($event, id) {
    console.log("addCharterer", id)
    if(id == 19) {
      this.charterer_dropdown_shown = true
    }
    else if(id == 20) {
      this.charterer_dropdown_shown2 = true
    }
  }

  copyPermanentAddr(event) {
    if (event.target.checked) {
      console.log("Set permanent addr. -> residential")
      this.applicant.Residentialaddress = this.applicant.PermanentAddress
      this.applicant.Residentialaddress2 = this.applicant.PermanentAddress2
      this.applicant.Residentialaddress3 = this.applicant.PermanentAddress3
      this.applicant.RPostcode = this.applicant.PPostcode
      this.applicant.RState = this.applicant.PState
    }
  }

  getCountries() {
    this._subscription = this.countryService.getAllCountries().subscribe(
      (result: any) => {
        this.countries = result
        this._refreshCountryData()
      },
      (err) => alert('Failed to load countries')
    )
  }

  _refreshCountryData() {
    this.countries.map((item: Country) => {
      return {
        Id: item.Id,
        Country: item.Country
      }
    })
  }

  getStates() {
    this._subscription = this.stateService.getAllStates().subscribe(
      (result: any) => {
        this.states = result
        this._refreshStateData()
      },
      (err) => alert('Failed to load states')
    )
  }

  _refreshStateData() {
    this.states.map((item: State) => {
      return {
        Id: item.Id,
        State: item.State
      }
    })
  }

  getRelationships() {
    this._subscription = this.relationshipService.getAllRelationships().subscribe(
      (result: any) => {
        this.relationships = result
        this._refreshRelationshipData()
      },
      (err) => alert('Failed to load relationships')
    )
  }

  _refreshRelationshipData() {
    this.relationships.map((item: Relationship) => {
      return {
        Id: item.Id,
        Relationship: item.Relationship
      }
    })
    // add relationship dropdown value
    //this.settings.columns.NOKRelationship.editor.config.list = [this.relationships]
  }

  getReligions() {
    this._subscription = this.religionService.getAllReligions().subscribe(
      (result: any) => {
        this.religions = result
        this._refreshReligionData()
      },
      (err) => alert('Failed to load religions')
    )
  }

  _refreshReligionData() {
    this.religions.map((item: Religion) => {
      return {
        Id: item.Id,
        Religion: item.Religion
      }
    })
  }

  getRaces() {
    this._subscription = this.raceService.getAllRaces().subscribe(
      (result: any) => {
        this.races = result
        this._refreshRaceData()
      },
      (err) => alert('Failed to load races')
    )
  }

  _refreshRaceData() {
    this.races.map((item: Race) => {
      return {
        Id: item.Id,
        Race: item.Race
      }
    })
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe()
    }
  }

  settings = {
    delete: {
      confirmDelete: true
    },
    add: {
      addButtonContent: 'Add',
      confirmCreate: true
    },
    edit: {
      confirmSave: true
    },
    columns: {
      Id: {
        title: 'Id',
        hide: true,
        filter: false
      },
      UserID: {
        title: 'UserID',
        hide: true,
        filter: false
      },
      NOKName: {
        title: 'Name',
        filter: false
      },
      NOKRelationship: {
        title: 'Relationship',
        filter: false,
        /*type: 'html',
        valuePrepareFunction: (cell, row) => { return row },
        editor: {
          type: 'list',
          config: {
            list: []
          }
        }*/
      },
      NOKOccupaction: {
        title: 'Occupation',
        filter: false
      },
      NOKGender: {
        title: 'Gender',
        filter: false,
        /*type: 'html',
        renderComponent: DropdownListComponent,
        valuePrepareFunction: (dropdown_list) => {
          return { dropdown_list: [{ Id: 1, Title: 'Male' }, { Id: 2, Title: 'Female' }], column: 'NOKGender'}
        }
        editor: {
          type: 'list',
          config: {
            list: [{ value: 1, title: 'Male' }, { value: 2, title: 'Female' }]
          }
        }*/
      },
      NOKContactNumber: {
        title: 'Contact Number',
        filter: false
      },
      NOKDOB: {
        title: 'Date Of Birth',
        filter: false
      },
      Age: {
        title: 'Age',
        addable: false,
        editable: false,
        filter: false
      },
    },
    actions: {
      add: true,
      position: 'right', // left|right
    }
  }

  getApplicantApplyByLoginEmail(LoginEmail) {
    console.log("inside getApplicantApplyByLoginEmail")
    this.service.getApplicantApplyByLoginEmail(LoginEmail).subscribe(
      (result) => {
        //this.data = result
        this.applicantapply = result
        // new user
        if(this.applicantapply == null)
          this.applicantapply = {}
        else {
          this._refreshApplicantApplyData()
        }
      },
      (err) => alert('Failed to load applicant')
    )
  }

  getApplicantByLoginEmail(LoginEmail) {
    console.log("inside getApplicantByLoginEmail")
    this.service.getApplicantByLoginEmail(LoginEmail).subscribe(
      (result) => {
        //this.data = result
        this.applicant = result
        if(this.applicant == null) {
          this.applicant = {}
          this.addNew = true
        }
        this._refreshData()
      },
      (err) => alert('Failed to load applicant')
    )
  }

  getApplicantDocument(Id, LoginEmail, PositionID) {
    console.log("inside getApplicantDocument")
    this.applicant.applicant_documents = []
    if(Id != null && LoginEmail != null && PositionID != null) {
      this.service.getApplicantDocument('?Id='+ Id + '&LoginEmail=' + LoginEmail + '&PositionID=' + PositionID).subscribe(
        (result) => {
          this.applicant.applicant_documents = result
          if(this.applicant.applicant_documents == null) {
            this.applicant.applicant_documents = {}
          }
          else {
            this.defaultPositionID = this.applicantapply.PositionID
            this.applicant.temp_applicant_documents = this.applicant.applicant_documents
          }
          this._refreshApplicantDocument()
        },
        (err) => alert('Failed to load applicant')
      ) 
    }
  }

  _refreshApplicantDocument() {
    this.applicant.applicant_documents.map((item: ApplicantDocument) => {
      return {
        DocumentID: item.DocumentID,
        // display only 1 document name
        // TODO: fix the duplicated document name return from sql
        //Document: item.Document.length > 1 ? item.Document[0] : item.Document,
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
        Charterer: item.Charterer,
        ChartererOthers: item.ChartererOthers,
        DynamicPositionCertType: item.DynamicPositionCertType,
        DynamicPositionCertFileName: item.DynamicPositionCertFileName,
        Grade: item.Grade,
        IssuingAuthority: item.IssuingAuthority,
      }
    })
  }

  getPositions() {
    this.positionService.getAllPositions().subscribe(
      (result) => {
        this.positions = result
        this._refreshPositionData()
      },
      (err) => alert('Failed to load positions')
    )
  }

  getDocumentChecklist() {
    this.documentChecklistService.getDocumentChecklistById(this.applicantapply.PositionID).subscribe(
      (result: any) => {
        this.documentChecklists = result
        //console.log("getDocumentChecklist")
        this._refreshDocumentChecklistData()
        this.applicant.applicant_documents = this.documentChecklists
        // initialize the applicant doc. info. on position change
        for(var i = 0; i < this.applicant.applicant_documents.length; i++) {
          var item = this.applicant.applicant_documents[i]
          item.ApplicantDocNo = ""
          item.ApplicantDocDtIssue = null
          item.ApplicantDocDtExpiry = null
          item.ApplicantDocType = ""
          item.ApplicantDocFileName = ""
          item.ApplicantDocFile = ""
          item.FilePath = ""
          item.FileNamePath = ""
          item.FileText = ""
        }
        //console.log("documentChecklists: ", this.documentChecklists)
        //console.log("this.applicant.applicant_documents: ", this.applicant.applicant_documents)
      },
      (err) => alert('Failed to load Document Checklists')
    )
  }

  _refreshDocumentChecklistData() {
    this.documentChecklists.map((item: DocumentChecklist) => {
      return {
        DocumentID: item.DocumentID,
        PositionID: item.PositionID,
        Document: item.Document,
        DocNo: item.DocNo,
        Chk: item.Chk,
        DtIssue: item.DtIssue,
        DtExpiry: item.DtExpiry,
        DocType: item.DocType,
        DocFile: item.DocFile,
        ApplicantDocNo: "",
        ApplicantDocDtIssue: new Date(),
        ApplicantDocDtExpiry: new Date(),
        ApplicantDocType: "",
        ApplicantDocFileName: "",
        ApplicantDocFile: "",
        FilePath: "",
        FileNamePath: "",
        FileText: ""
      }
    })
  }

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
    this.generalAnswer.map((item: ApplicantGeneralAnswer) => {
      return {
        Id: item.Id,
        Type: item.Type,
        ApplyID: item.ApplyID,
        LoginEmail: item.LoginEmail,
        QuestionId: item.QuestionId,
        Answer: item.Answer,
        Description: item.Description,
        FilePath: item.FilePath
      }
    })
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
        IMONo: item.ApplicantStatus
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
        VesselName: item.VesselName
      }
    })
  }

  getApplicantDropdown(Id) {
    this.applicant.applicant_dropdown = []
    console.log("inside getApplicantDropdownId: ", this.applicant.applicant_dropdown)
    this.service.getApplicantDropdown(Id).subscribe(
      (result) => {
        this.applicant.applicant_dropdown = result[0]
        console.log("this.applicant.applicant_dropdown: ", this.applicant.applicant_dropdown)
        this._refreshApplicantDropdownData()
      },
      (err) => alert('Failed to load applicant dropdown ids')
    )
  }

  _refreshApplicantDropdownData() {

  }

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
          PortOfRegistry: item.PortOfRegistry
        }
      })
  }

  getVesselType() {
    this.imoNoService.getAllVessels().subscribe(
      (result: any) => {
        this.vessels = result
        this._refreshVesselData()
      },
        (err) => alert('Failed to load Vessel Type')
    )
  }

  _refreshVesselData() {
    this.vessels.map((item: VesselType) => {
      return {
        VesselId: item.VesselId,
        HullNo: item.HullNo
      }
    })
  }

  getApplicantNextOfKin(LoginEmail) {
    this.applicant.next_of_kin = []
    this.service.getApplicantNextOfKin(LoginEmail).subscribe(
      (result: any) => {
        this.applicant.next_of_kin = result
        this.data = result
        this._refreshNextOfKinData()
      },
        (err) => alert('Failed to load Next Of Kin')
    )
  }

  _refreshNextOfKinData() {
    this.applicant.next_of_kin.map((item: ApplicantNextOfKin) => {
      return {
        Id: item.Id,
        ApplyID: item.ApplyID,
        UserID: item.UserID,
        NOKName: item.NOKName,
        NOKRelationship: item.NOKRelationship,
        NOKOccupaction: item.NOKOccupaction,
        NOKGender: item.NOKGender,
        NOKAge: item.NOKAge,
        NOKContactNumber: item.NOKContactNumber,
        NOKDOB: item.NOKDOB,
       // Age: item.Age
      }
    })

    this.data.map((item: ApplicantNextOfKin) => {
      return {
        Id: item.Id,
        UserID: item.UserID,
        NOKName: item.NOKName,
        NOKRelationship: item.NOKRelationship,
        NOKOccupaction: item.NOKOccupaction,
        NOKGender: item.NOKGender,
        NOKAge: item.NOKAge,
        NOKContactNumber: item.NOKContactNumber,
        NOKDOB: item.NOKDOB,
        //Age: item.Age
      }
    })
  }

  _refreshData() {
    console.log(this.applicant)
    // load applicant photo if any
    if(this.applicant.FileName)
      this.url = "assets/UserDoc/" + this.applicant.FileName
    this.getApplicantDropdown(this.applicant.Id)
    this.getApplicantNextOfKin(this.applicant.LoginEmail)
    //this.getApplicantDocument(this.applicant.Id, this.applicant.LoginEmail, this.applicantapply.PositionID)
    //this._refreshApplicantApplyData()
    //console.log(this.applicant.ApplyPosition)
  }

  _refreshApplicantApplyData() {
    // retry loading
    this.getApplicantGeneralAnswer(this.applicantapply.Id)
    this.getApplicantDocument(this.applicantapply.Id, this.applicant.LoginEmail, this.applicantapply.PositionID)
    console.log(this.applicantapply)
    console.log(this.applicantapply.Position, this.applicantapply.PositionID)
    console.log("applicant_documents: ", this.applicant.Id, " email: ", this.applicant.LoginEmail, " ApplyPositionID: ", this.applicant.ApplyPositionID)
  }

  _refreshPositionData() {
    this.positions.map((item: Position) => {
      return {
        Id: item.Id,
        Position: item.Position
      }
    })
  }

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
        Allowance: item.Allowance
      }
    })
  }

  onCancel(event) {
    if (window.confirm('Do you really want to Cancel? Please update to save the changes.')) {
      this.router.navigate(['pages/jobportal/applicant'])
    } else {
      event.confirm.reject()
    }
  }

  onSaveSanitize() {
    // sanitize all data, convert id back to number

  }

  mapPositionIdToString(PositionIdToMap) {
    for(var i = 0; i < this.positions.length; i++) {
      var item = this.positions[i]
      if(item.Id == PositionIdToMap) 
      {
        return item.Position
      }
    }
  }

  loadFile(event) {
    //var image = document.getElementById('output');
    //image.src = URL.createObjectURL(event.target.files[0]);

    if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
      this.url = reader.result;
      this.fileChange(event, 0, "profile")
		}
  }

  viewFile(filePath) {
    console.log("filePath: ", filePath)
    if (filePath && filePath.length > 0) {
      window.open(`${environment.documentPathPrefix}/` + filePath, '_blank')
    }
  }

  fileChange(event, documentId, columnType) {
    let fileList: FileList = event.target.files;
    console.log("signatureChange: fileList - ", fileList)
    if (fileList.length > 0) {
      this.signature = fileList[0];
      this.fileUploadList.push({"file": this.signature, "DocumentID": documentId, "ColumnType": columnType})
      console.log("signatureChange: fileList - ", fileList, " DocumentID: ", documentId)
    }
  }

  onSaveFile() {
    console.log("this.fileUploadList: ", this.fileUploadList)
    for (var i = 0; i < this.fileUploadList.length; i++) {
      console.log("Inside upload file - this.fileUploadList: ", this.fileUploadList[i])
      const fileUploadSubscription = this.applicationService.uploadDocument(this.fileUploadList[i].DocumentID,
        this.applicant.LoginEmail, this.fileUploadList[i].file, this.fileUploadList[i].ColumnType).subscribe(
        (sigRes: any) => {
          if (!sigRes) {
            alert('Failed to upload document')
          } else {
            alert('Save as Draft New Record Successful')
            //this.router.navigate(['pages/jobportal/crew_job_portal/', this.applicant.LoginEmail])
          }
          this.saveSuccess = false
          fileUploadSubscription.unsubscribe()
        },
        (err) => {
          alert('Failed to upload file. Make sure you select the correct file.')
        }
      )
    }
  }

  onRemoveFile(documentId) {
    if (window.confirm('Are you sure you want to remove file?')) {
      const subscription = this.applicationService.deleteDocument(documentId).subscribe(
        (result: any) => {
          console.log(result)
          if(result.success_code == 0) {
            alert('Successfully removed File')
            this.signaturePath = null
          }
        },
        (err) => alert('Failed to remove File')
      )
    }
  }

  onSaveValueMapping() {
    this.applicant.Position = this.mapPositionIdToString(this.applicantapply.PositionID)
    this.applicant.PositionID = this.applicantapply.PositionID
    // deep copy generalAnswer array
    this.applicant.generalAnswer = JSON.parse(JSON.stringify(this.generalAnswer));
    console.log(this.generalAnswer)
    console.log("Value in string: Position: ", this.applicant.Position, " PositionID: ", this.applicant.PositionID)
  }

  onPDPAChk() {
    if(!this.applicant.PDPAChk) {
      alert('Please tick to agree to the PDPA before proceed.')
      return false
    }
    return true
  }

  onSaveAsDraft(event) {
    if(!this.onPDPAChk()) {
      // stop the save
      return
    }

    if (window.confirm('Do you really want to save as draft?')) {
      this.onSaveValueMapping()
      //this.onSaveSanitize()
      if(this.addNew) {
        // temp. add login email
        this.applicant.AddNew = this.addNew
        this.applicant.LoginEmail = (this.applicant.Name).replace(/\s/g, "") + '@gmail.com'
        console.log("login email created: ", this.applicant.LoginEmail)
        const subscription = this.applicationService.addApplicationSaveAsDraft(
          JSON.stringify(this.applicant))
          .subscribe((res: any) => {
            if (res.LoginEmail == null) {
              alert('Failed to save as draft new application')
            } else {
              alert('Save as Draft New Record Successful')
              // upload file & update filepath
              this.onSaveFile()
            }
            //subscription.unsubscribe()
          })
      }
      else {
         // find a way to save/update data
        const subscription = this.applicationService.updateApplicationSaveAsDraft(
          JSON.stringify(this.applicant))
          .subscribe((res: any) => {
            if (res.LoginEmail == null) {
              alert('Failed to update application')
            } else {
              alert('Save as Draft Record Successful')
              console.log("saveSuccess: ", this.saveSuccess, " this.signature: ", this.signature)
              // upload file & update filepath
              this.onSaveFile()
            }
            //subscription.unsubscribe()
          })
      }
      //this.router.navigate(['pages/jobportal/crew_job_portal/', this.applicant.LoginEmail])
    } else {
      //event.confirm.reject()
    }
  }

  onConfirmValueMapping() {
    this.onSaveValueMapping()
  }

  openDialog(event) {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      width: '400px',
      panelClass: 'custom-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(result == true) {
        this.onSubmit(event)
      }
    });
  }

  onSubmit(event) {
    if(!this.onPDPAChk()) {
      // stop the save
      return
    }

    if (window.confirm('Do you really want to submit?')) {
      this.onSaveValueMapping()
      this.onConfirmValueMapping()
      //this.onSaveSanitize()
      if(this.addNew) {
        // temp. add login email
        this.applicant.AddNew = this.addNew
        this.applicant.LoginEmail = (this.applicant.Name).replace(/\s/g, "") + '@gmail.com'
        console.log("login email created: ", this.applicant.LoginEmail)
        // add new application submit
        const subscription = this.applicationService.addApplicationSubmit(
          JSON.stringify(this.applicant))
          .subscribe((res: any) => {
            if (res.LoginEmail == null) {
              alert('Failed to submit new application ')
            } else {
              alert('Submit New Record Successful')
              // upload file & update filepath
              this.onSaveFile()
            }
            subscription.unsubscribe()
          })
      }
      else {
        //if(this.applicantapply != null && this.applicantapply.LoginEmail != null) {
        // find a way to save/update data
        // submit existing application
        const subscription = this.applicationService.updateApplicationSubmit(
          JSON.stringify(this.applicant))
          .subscribe((res: any) => {
            if (res.LoginEmail == null) {
              alert('Failed to submit application')
            } else {
              alert('Submit Record Successful')
              // upload file & update filepath
              this.onSaveFile()
            }
            subscription.unsubscribe()
          })
      }
        //this.router.navigate(['pages/jobportal/crew_job_portal/', this.applicant.LoginEmail])
    } else {
      // add else case for confirmm
    }
  }

  updatePositionDocumentChecklist($event) {
    console.log("updatePositionDocumentChecklist")
    // restore default applicant document if orginal position is selected
    if(this.defaultPositionID == this.applicantapply.PositionID) {
      console.log("updatePositionDocumentChecklist: defaultPositionID")
      this.applicant.applicant_documents = this.applicant.temp_applicant_documents
    }
    else {
      // new position document checklist required
      this.applicant.temp_applicant_documents = this.applicant.applicant_documents
      console.log("updatePositionDocumentChecklist: new PositionID")
      this.getDocumentChecklist()
    }
  }

  // TODO: placeholder for next-to-kin smart table
  onDeleteConfirm(event) {
    if (window.confirm(`Are you sure you want to delete next-of-kin?`)) {
      event.data.UserID = this.applicant.LoginEmail
      const subscription = this.applicationService.deleteApplicantNextOfKin(event.data.Id).subscribe((res: any) => {
        if (res.Id == null) {
          alert(`Failed to delete next-of-kin`)
        } else {
          this.applicant.next_of_kin = this.applicant.next_of_kin.filter(a => a.Id !== event.data.Id)
          this._refreshNextOfKinData()
          event.confirm.resolve(event.newData)
        }
        subscription.unsubscribe()
      })
    } else {
      event.confirm.reject()
    }
  }

  onSaveConfirm(event) {
    if (window.confirm('Are you sure you want to save next-of-kin?')) {
      event.confirm.resolve(event.newData)
      event.newData.UserID = this.applicant.LoginEmail
      const subscription = this.applicationService.updateApplicantNextOfKin(
        JSON.stringify(event.newData))
        .subscribe((res: any) => {
          if (res.Id == null) {
            alert('Failed to update next-of-kin')
          } else {
            event.confirm.resolve(event.newData)
          }
          subscription.unsubscribe()
        })
    } else {
      event.confirm.reject()
    }
  }

  onCreateConfirm(event) {
    if (window.confirm(`Are you sure you want to add next-of-kin?`)) {
      //event.newData.Id = this.applicant.Id
      event.newData.UserID = this.applicant.LoginEmail
      const subscription = this.applicationService.addApplicantNextOfKin(
        JSON.stringify(event.newData)
      ).subscribe((res: any) => {
        if (res.Id == null) {
          alert(`Failed to create next-of-kin`)
        } else {
          event.newData.No = this.applicant.next_of_kin.length + 1
          event.newData.Id = res.Id
          this.applicant.next_of_kin.push(event.newData)
          event.confirm.resolve(event.newData)
        }
        subscription.unsubscribe()
      })
    } else {
      event.confirm.reject()
    }
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {
  //constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}