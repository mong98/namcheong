export interface DocumentChecklist {
  DocumentID: number
  PositionID: number
  Document: string
  TypeCompetencyChk: string // Added by Hakim on 27 Jan 2021
  DocNo: string
  IssuingAuthorityChk: String // Added by Hakim on 27 Jan 2021
  Chk: string
  GradeChk: string //  Added by Hakim on 27 Jan 2021
  DtIssue: string
  DtExpiry: string
  DocType: string
  DocFile: string
}
