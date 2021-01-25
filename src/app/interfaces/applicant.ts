import { EmailValidator } from '@angular/forms';
import { DateTimeAdapter } from 'ng-pick-datetime';

export interface ApplicantStatus {
  Id: number
  ApplicantStatus: string
}

export interface Currency {
  Id: number
  Currency: string
}

export interface ApplicantDropdownId {
  AllowanceId: number
  PORId: number
  ApplyStatusId: number
  ImonoId: number
  VesselId: number
}

export interface ApplicantGeneralQuestion {
  Id: number
  Type: number
  Question: string
	YesNo: string
	Rating: string
	TxtBox: string
	FileNeeded: string
	PositionRelated: string
}

export interface ApplicantGeneralAnswer {
  Id: number
  ApplyID: number
  Type: number
  LoginEmail: string
  QuestionId: number
	Answer: string
	Description: string
	FilePath: string
}

// Added by Hakim on 14 Jan 2021 - Start
export interface ApplicantMedicalQuestion {
  Id: number
  Type: number
  Question: string
	YesNo: string
	Rating: string
	TxtBox: string
	FileNeeded: string
  PositionRelated: string
  CheckupDt: string
  ExpiryDt: string 
}

export interface ApplicantMedicalAnswer {
  Id: number
  ApplyID: number
  Type: number
  LoginEmail: string
  QuestionId: number
	Answer: string
	Description: string
  FilePath: string
  AnsCheckupDt: Date
  AnsExpiryDt: Date
}
// Added by Hakim on 14 Jan 2021 - End

export interface ApplicantDocument {
  Id: number
  DocumentID: number
  Document: string
  Chk: string
  DocNo: string
  DtExpiry: string
  DtIssue: string
  Position: string
  DocType: string
  DocFile: string
  Charterer: number
  ChartererOthers: string
  DynamicPositionCertType: number
  DynamicPositionCertFileName: string
  ApplicantDocNo: string
  ApplicantDocDtIssue: Date
  ApplicantDocDtExpiry: Date
  ApplicantDocType: string
  ApplicantDocFileName: string
  ApplicantDocFile: string
  FilePath: string
  FileNamePath: string
  FileText: string
  FileExtension: string
  Grade: string
  IssuingAuthority: number
  Competency: number
}

export interface ApplicantNextOfKin {
  Id: number
  ApplyID: number
  UserID: string
  NOKName: string
  NOKMiddleName: string
  NOKLastName: string
  NOKRelationship: string
  NOKOccupaction: string
  NOKGender: string
  NOKContactNumber: string
  NOKDOB: string
  NOKAge: string
			 
  SeqNo: number
  NOKEmployment: number
  NOKHandicap: string
}

export interface Applicant {
  Id: number
  AddNew: boolean
  ApplyPosition: string
  ApplyPositionID: string
  ApplyDtApplication: Date
  ApplyConfirmFlag: string
  SubmitFlag: string
  FileAFE: string
  FileCV: string
  FileSEA: string
  ApplyLoginEmail: string
  ApplyStatus: string
  Position: string
  DtApplication: Date
  LoginEmail: string
  Password: string
  Name: string
  MiddleName: string
  LastName: string
  Gender: string
  Education: number
  EducationFileName: string
  IC: string
  Passport: string
  ValidityDate: Date
  DOB: Date
  PlaceofBirth: string
  CountryOfOrigin: string
  MaritalStatus: string
  Nationality: string
  NationalityOthers: string
  Race: string
  Raceothers: string
  Religion: string
  Religionothers: string
  PermanentAddress: string
  PermanentAddress2: string
  PermanentAddress3: string
  PPostCode: string
  PState: string
  PStateOthers: string
  Residentialaddress: string
  Residentialaddress2: string
  Residentialaddress3: string
  RPostCode: string
  RState: string
  RStateOthers: string
  Contact_MobileCtryCode: string
  Contact_MobileAreaCode: string
  Contact_Mobile: string
  Contact_HouseCtryCode: string
  Contact_HouseAreaCode: string
  Contact_House: string
  RepatriationHomePort: string
  NOKName: string
  NOKRelationship: string
  NOKOccupaction: string
  NOKAge: string
  EmergencyContactName: string
  EmergencyContactMiddleName: string // Added by Hakim on 12 Jan 2021
  EmergencyContactLastName: string // Added by Hakim on 12 Jan 2021
  EmergencyContactRelationship: string
  EmergencyContact_Address: string // Added by Hakim on 12 Jan 2021
  EmergencyContact_Address2: string // Added by Hakim on 12 Jan 2021
  EmergencyContact_Address3: string // Added by Hakim on 12 Jan 2021
  EmergencyContact_PostCode: string // Added by Hakim on 12 Jan 2021
  EmergencyContact_State: string // Added by Hakim on 12 Jan 2021
  EmergencyContact_Country: string // Added by Hakim on 12 Jan 2021
  EmergencyContact_MobileCtryCode: string
  EmergencyContact_MobileAreaCode: string
  EmergencyContact_Mobile: string
  EmergencyContact_HouseCtryCode: string
  EmergencyContact_HouseAreaCode: string
  EmergencyContact_House: string
  IncomeTaxNo: string
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
  ForgotPasswordDtExpiry: Date
  Status: string
  OfferPosition: string
  DailyRate: string
  StandbyRate: string
  Allowance: string
  TypesofAllowance: string
  ContractPeriodFromInMth: string
  ContractPeriodFrom: Date
  ContractPeriodTo: Date
  NameofVessel: string
  IMONo: string
  PortofRegistry: string
  ApplyStatus2: string
  FileName: string
  FilePath: string
  FileNameCV: string
  FilePathCV: string
  ConfirmNo: string
  ConfirmBy: string
  ConfirmByName: string
  SerialNumber: string
  ConfirmDt: Date
  Ref1Name: string
  Ref1Company: string
  Ref1Designation: string
  Ref1Contact: string
  Ref2Name: string
  Ref2Company: string
  Ref2Designation: string
  Ref2Contact: string
  GenDoc: string
  ConfirmFlag: string
  FileAFECreateDt: Date
  FileCVCreateDt: Date
  FileSEACreateDt: Date
  FileAFEEndDt: Date
  FileCVEndDt: Date
  FileSEAEndDt: Date
  SignatureName: string
  SignatureIcPassport: string
  SignatureDate: Date
  Contact_HomeCtryCode: string
  Contact_Home: string
  PCountry: string
  RCountry: string
  Salary: string
  OtherAllowance: string
}

export interface Charterer {
  Id: number
  Charterer: string
}

export interface Competency {
  Id: number
  Competency: string
}

export interface Working {
  Id: number
  Working: string
}

export interface Gender {
  Id: number
  Gender: string
}

export interface Education {
  Id: number
  Education: string
}

export interface DynamicPos {
  Id: number
  DynamicPos: string
}