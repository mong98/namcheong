import { Component, OnDestroy, OnInit } from '@angular/core'
import { DownloadButton } from '../../shared/DownloadButton.component'

import { LocalDataSource } from 'ng2-smart-table'
import { Subscription } from 'rxjs'
import { ApplicantService } from '../../services/applicant.service'
import { PositionService } from '../../services/position.service'
import { Position } from '../../interfaces/position'
import { Applicant, ApplicantDocument } from '../../interfaces/applicant'
import { formatDate } from '@angular/common'

@Component({
  selector: 'ngx-afecvsea',
  templateUrl: './afecvsea.component.html',
})
export class AfeCvSeaComponent implements OnInit, OnDestroy {
  allApplicants: any[] = []
  allPositions: any[] = []
  allDocuments: ApplicantDocument[] = []
  searchName: string
  searchEmail: string
  searchPosition: number = -1

  private _applicantSubscription: Subscription
  private _positionSubscription: Subscription

  public source = new LocalDataSource()

  constructor(
    private applicantService: ApplicantService,
    private positionService: PositionService
  ) {
  }

  ngOnInit(): void {
    this._getApplicants()
    this._getPositions()
  }

  ngOnDestroy(): void {
    if (this._applicantSubscription) {
      this._applicantSubscription.unsubscribe()
    }
    if (this._positionSubscription) {
      this._positionSubscription.unsubscribe()
    }
  }

  settings = {
    hideSubHeader: true, // hide the add new fields
    columns: {
      No: {
        title: 'No',
        filter: false,
        editable: false,
        addable: false,
      },
      Id: {
        title: 'Id',
        hide: true
      },
      Position: {
        title: 'Position',
        filter: false,
      },
      Email: {
        title: 'Email',
        filter: false,
      },
      Name: {
        title: 'Name',
        filter: false,
      },
      VesselName: {
        title: 'Vessel Name',
        filter: false,
      },
      DtApplication: {
        title: 'Profile',
        filter: false,
      },
      Status: {
        title: 'Status',
        filter: false,
      },
      Afe: {
        title: 'AFE',
        type: 'custom',
        filter: false,
        renderComponent: DownloadButton,
        valuePrepareFunction: (value) => {
          return { label: 'Download AFE', filePath: value }
        }
      },
      Cv: {
        title: 'CV',
        type: 'custom',
        filter: false,
        renderComponent: DownloadButton,
        valuePrepareFunction: (value) => {
          return { label: 'Download CV', filePath: value }
        }
      },
      Sea: {
        title: 'SEA',
        type: 'custom',
        filter: false,
        renderComponent: DownloadButton,
        valuePrepareFunction: (value) => {
          return { label: 'Download SEA', filePath: value }
        }
      },
    },
    actions: {
      delete: false,
      add: false,
      edit: false,
    },
  }

  private _getApplicants() {
    console.log("run 1")
    this._applicantSubscription = this.applicantService.getAllApplicantApplies().subscribe(
      (result: any[]) => {
        this._refreshApplicantData(result)
      },
      (err) => alert('Failed to load applicants')
    )
  }

  private _getPositions() {
    console.log("run 2")
    this._positionSubscription = this.positionService.getAllPositions().subscribe(
      (result: any[]) => {
        this._refreshPositionData(result)
      },
      (err) => alert('Failed to load positions')
    )
  }

  private _refreshApplicantData(result: any[]) {
    console.log("run 3")
    this.source.load(
      this.allApplicants = result.map((applicant: Applicant, i: number) => {
        return {
          No: i + 1,
          Id: applicant.Id,
          Position: applicant.ApplyPosition,
          Email: applicant.LoginEmail,
          Name: applicant.Name,
          VesselName: applicant.NameofVessel || '',
          DtApplication: applicant.ApplyDtApplication
            ? formatDate(applicant.ApplyDtApplication, 'dd/MM/yyyy h:mm a', 'en-MY')
            : '',
          Status: applicant.ApplyStatus,
          Afe: applicant.FileAFE,
          Cv: applicant.FileCV,
          Sea: applicant.FileSEA,
        }
      })
    )
  }

  private _refreshPositionData(result: any[]) {
    console.log("run 4")
    this.allPositions = result.map((position: Position) => {
      return {
        Id: position.Id,
        Position: position.Position
      }
    })
    this.allPositions.unshift({ Id: -1, Position: 'All' })
  }

  onSearch() {
    // clear the filter
    console.log("run 5")
    this.source.setFilter([])

    const filters = []

    console.log("check search name")
    console.log(this.searchName)

    if (this.searchName && this.searchName.length > 0) {
      filters.push({
        field: 'Name',
        search: this.searchName,
      })
    }

    if (this.searchEmail && this.searchEmail.length > 0) {
      filters.push({
        field: 'Email',
        search: this.searchEmail,
      })
    }

    if (this.searchPosition > 0) {
      const found = this.allPositions.find(p => p.Id === Number(this.searchPosition))

      if (found) {
        filters.push({
          field: 'Position',
          search: found.Position,
        })
      }
    }

    this.source.setFilter(filters)
  }
}
