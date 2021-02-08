import { Component, Input } from '@angular/core'
import { LocalDataSource } from 'ng2-smart-table'
import { Subscription } from 'rxjs'
import { DocumentChecklist } from '../../interfaces/documentchecklist'
import { Position } from '../../interfaces/position'
import { DocumentChecklistService } from '../../services/documentchecklist.service'
import { PositionService } from '../../services/position.service'
import { CheckboxComponent } from '../../shared/CheckboxComponent.component'

@Component({
  selector: 'ngx-documentchecklist',
  templateUrl: './documentchecklist.component.html',
  styleUrls: ['../jobportal/open-vacancy.component.scss'],
})
export class DocumentCheckListComponent {
  positions: any = []
  _selectedPosition = null
  @Input('selectedPosition')
  documentChecklists: any = []
  private _positionsSubscription: Subscription
  private _documentChecklistsSubscription: Subscription

  public source = new LocalDataSource()

  constructor(
    private service: DocumentChecklistService,
    private positionService: PositionService,
  ) { }

  ngOnInit(): void {
    this._getData()
  }

  ngOnDestroy(): void {
    if (this._positionsSubscription) {
      this._positionsSubscription.unsubscribe()
    }
    if (this._documentChecklistsSubscription) {
      this._documentChecklistsSubscription.unsubscribe()
    }
  }

  set selectedPosition(position) {
    this._selectedPosition = position
    this._refreshData()
  }

  get selectedPosition() {
    return this._selectedPosition
  }

  private _getData() {
    this._positionsSubscription = this.positionService.getAllPositions().subscribe(
      (result: any) => {
        this.positions = result
        this.selectedPosition = this.positions[0] ? this.positions[0].Id : ''
        this._refreshData()
      },
      (err) => alert('Failed to load Positions')
    )
    this._documentChecklistsSubscription = this.service.getAllDocumentChecklists().subscribe(
      (result: any) => {
        this.documentChecklists = result
        this._refreshData()
      },
      (err) => alert('Failed to load Document Checklists')
    )
  }

  settings = {
    hideSubHeader: true,
    columns: {
      Id: {
        title: 'Id',
        hide: true
      },
      Position: {
        title: 'Position',
        hide: true
      },
      No: {
        title: 'No',
        filter: false,
        editable: false,
        addable: false,
      },
      Chk: {
        title: 'Check (Mandatory)',
        type: 'custom',
        filter: false,
        renderComponent: CheckboxComponent,
        valuePrepareFunction: (value) => {
          return { value, column: 'Chk' }
        }
      },
      Name: {
        title: 'Certificate or Qualification title',
        filter: false,
      },
      TypeCompetencyChk: {
        title: 'Type of Certificate of Competency Held',
        type: 'custom',
        filter: false,
        renderComponent: CheckboxComponent,
        valuePrepareFunction: (value) => {
          return { value, column: 'TypeCompetencyChk' }
        }
      },
      DocNo: {
        title: 'Certificate No',
        type: 'custom',
        filter: false,
        renderComponent: CheckboxComponent,
        valuePrepareFunction: (value) => {
          return { value, column: 'DocNo' }
        }
      },
      GradeChk: {
        title: 'Grade',
        type: 'custom',
        filter: false,
        renderComponent: CheckboxComponent,
        valuePrepareFunction: (value) => {
          return { value, column: 'GradeChk' }
        }
      },
      IssuingAuthorityChk: {
        title: 'Issuing Authority',
        type: 'custom',
        filter: false,
        renderComponent: CheckboxComponent,
        valuePrepareFunction: (value) => {
          return { value, column: 'IssuingAuthorityChk' }
        }
      },
      DtIssue: {
        title: 'Date of Issue',
        type: 'custom',
        filter: false,
        renderComponent: CheckboxComponent,
        valuePrepareFunction: (value) => {
          return { value, column: 'DtIssue' }
        }
      },
      DtExpiry: {
        title: 'Date of Expiry',
        type: 'custom',
        filter: false,
        renderComponent: CheckboxComponent,
        valuePrepareFunction: (value) => {
          return { value, column: 'DtExpiry' }
        }
      },
      // DocType: {
      //   title: 'Doc Type',
      //   type: 'custom',
      //   filter: false,
      //   renderComponent: CheckboxComponent,
      //   valuePrepareFunction: (value) => {
      //     return { value, column: 'DocType' }
      //   }
      // },
      DocFile: {
        title: 'Doc File',
        type: 'custom',
        filter: false,
        renderComponent: CheckboxComponent,
        valuePrepareFunction: (value) => {
          return { value, column: 'DocFile' }
        }
      },
    },
    actions: {
      delete: false,
      add: false,
      edit: false,
    },
  }

  async onSubmit() {
    if (window.confirm('Are you sure you want to save?')) {
      const subscription = this.service.updateDocumentChecklist(
        this.selectedPosition, JSON.stringify(
          (await this.source.getAll())
            .filter(d => d.Position === this.selectedPosition)
            .map((item: any) => {
              return {
                DocumentID: item.Id,
                Document: item.Name,
                DocNo: item.DocNo,
                Chk: item.Chk,
                DtIssue: item.DtIssue,
                DtExpiry: item.DtExpiry,
                DocType: item.DocType,
                DocFile: item.DocFile,
                TypeCompetencyChk: item.TypeCompetencyChk, // Added by Hakim on 27 Jan 2021
                GradeChk: item.GradeChk, // Added by Hakim on 27 Jan 2021
                IssuingAuthorityChk: item.IssuingAuthorityChk, // Added by Hakim on 27 Jan 2021
              }
            })
        )
      )
        .subscribe((res: any) => {
          if (res.PositionID == null) {
            alert('Failed to update document checklist')
          }
          else {
            alert('Successfully updated document checklist')
          }
          subscription.unsubscribe()
        })
    }
  }

  private _refreshData() {
    if (!this.documentChecklists || !this.selectedPosition) {
      return
    }

    this.source.load(
      this.documentChecklists
        .filter(d => d.PositionID === this.selectedPosition)
        .map((item: DocumentChecklist, index: number) => {
          return {
            No: index + 1,
            Id: item.DocumentID,
            Position: item.PositionID,
            Name: item.Document,
            TypeCompetencyChk: item.TypeCompetencyChk, // Added by Hakim on 27 Jan 2021
            DocNo: item.DocNo,
            GradeChk: item.GradeChk, // Added by Hakim on 27 Jan 2021
            Chk: item.Chk,
            IssuingAuthorityChk: item.IssuingAuthorityChk, // Added by Hakim on 27 Jan 2021
            DtIssue: item.DtIssue,
            DtExpiry: item.DtExpiry,
            DocType: item.DocType,
            DocFile: item.DocFile
          }
        })
    )
  }
}
