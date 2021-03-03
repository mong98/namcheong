import { Component, Injectable, OnDestroy, OnInit } from '@angular/core'
import { ApplicantService } from '../../services/applicant.service'
import { PositionService } from '../../services/position.service'
import { LocalDataSource } from 'ng2-smart-table'

import { Subscription } from 'rxjs'
import { Applicant, ApplicantStatus } from '../../interfaces/applicant'
import { Position } from '../../interfaces/position'

import { Router } from '@angular/router'
import * as XLSX from 'xlsx';
import { formatDate } from '@angular/common'

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'ngx-applicant',
  templateUrl: './applicant.component.html',
})
export class ApplicantComponent implements OnInit, OnDestroy {
  applicants: any[] = []
  positions: any[] = []
  exportData: any[] = []
  applicantStatus: any = []
  name: string = ''
  middlename: string = ''
  lastname: string = ''
  status: string = ''
  _applicantSubscription: Subscription
  _positionSubscription: Subscription
  private router: Router
  public source = new LocalDataSource()

  constructor(private service: ApplicantService, private positionService: PositionService) { }

  ngOnInit(): void {
    this.getApplicant()
    this.getPositions()
    this.getApplicantStatus()
  }

  ngOnDestroy(): void {
    if (this._applicantSubscription) {
      this._applicantSubscription.unsubscribe()
    }
    if (this._positionSubscription) {
      this._positionSubscription.unsubscribe()
    }
  }

  getApplicant() {
    this._applicantSubscription = this.service.getAllApplicants().subscribe(
      async (result: any) => {
        this.applicants = result
        await this._refreshData()
      },
      (err) => alert('Failed to load applicants')
    )
  }

  getPositions() {
    this._positionSubscription = this.positionService.getAllPositions().subscribe(
      (result: any) => {
        this.positions = result
        this._refreshPositionData()
      },
      (err) => alert('Failed to load positions')
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
        ApplicantStatus: item.ApplicantStatus
      }
    })
  }

  settings = {
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: false,
    },
    hideSubHeader: true,
    columns: {
      No: {
        title: 'No',
      },
      ApplyPosition: {
        title: 'Position',
        filter: false,
      },
      LoginEmail: {
        title: 'Email',
        filter: false,
      },
      Name: {
        title: 'Applicant Name',
        filter: false,
      },
      ApplyDtApplication: {
        title: 'Profile Updated Date',
        filter: false,
        /*type: 'date',
        valuePrepareFunction: (date) => {
          if (date) {
            return new DatePipe('en-GB').transform(date, 'dd-MM-yyyy hh:mm:ss');
          }
          return null;
        }*/
      },
      ApplyStatus: {
        title: 'Status',
        filter: false,
      },
      action: {
        title: 'Action',
        type: 'html',
        filter: false,
      },
    },
  }

  filterDate(dateFrom: Date, dateTo: Date, date: Date) {
    return date >= dateFrom && date <= dateTo
  }

  async onSearch(position: string = '') {
    const dateTo = (<HTMLInputElement>document.getElementById('update_date_to')).value
    const dateFrom = (<HTMLInputElement>document.getElementById('update_date_from')).value
    let dts = dateTo.split(/[.]/)
    const dateToObject = new Date(parseInt(dts[2]), parseInt(dts[1]) - 1, parseInt(dts[0]))
    dts = dateFrom.split(/[.]/)
    const dateFromObject = new Date(parseInt(dts[2]), parseInt(dts[1]) - 1, parseInt(dts[0]))

    const retval = []
    for (let i = 0; i < this.applicants.length; i++) {
      const dateString = this.applicants[i].ApplyDtApplication
      const t = dateString.split(/[- :]/)
      const date = new Date(parseInt(t[0]), parseInt(t[1]) - 1, parseInt(t[2]))
      let filterCond = true

      if (dateFrom !== '' && dateTo !== '') {
        filterCond = this.filterDate(dateFromObject, dateToObject, date)
      }
      else if (dateFrom !== '') { // No dateTo
        filterCond = this.filterDate(dateFromObject, new Date(2999, 1, 1), date)
      }
      else if (dateTo !== '') {
        filterCond = this.filterDate(new Date(1900, 1, 1), dateToObject, date)
      }

      if (this.applicants[i].MiddleName == null) {
        this.applicants[i].MiddleName = ''
      }

      if (this.applicants[i].LastName == null) {
        this.applicants[i].LastName = ''
      }

      if ((position === '19' || position === '' || (position !== '' && this.applicants[i].ApplyPositionID == position)) && filterCond
        && (this.name == '' || this.applicants[i].Name.toLowerCase().indexOf(this.name.toLowerCase()) > -1)
        && (this.middlename == '' || this.applicants[i].MiddleName.toLowerCase().indexOf(this.middlename.toLowerCase()) > -1)
        && (this.lastname == '' || this.applicants[i].LastName.toLowerCase().indexOf(this.lastname.toLowerCase()) > -1)
        && (this.status == '' || this.applicants[i].ApplyStatus == this.status)) {
        retval.push(this.applicants[i])
      }
    }

    await this.source.load(
      retval.map((item: Applicant, index: number) => {
        var dataDate = new Date(item.ApplyDtApplication);
        var convertDataDate = dataDate.toISOString().split("T")[0];
        var fullname = [item.Name, item.MiddleName, item.LastName].filter(Boolean).join(" ");
        return {
          No: index + 1,
          Id: item.Id,
          ApplyPosition: item.ApplyPosition,
          ApplyPositionID: item.ApplyPositionID,
          LoginEmail: item.LoginEmail,
          Name: fullname,
          ApplyDtApplication: convertDataDate,
          ApplyStatus: item.ApplyStatus,
          action: '<a href="pages/jobportal/view-applicant/' + item.Id + '">View</a>',
        }
      })
    )
    await this._setupExportData()
  }

  clickView(Id) {
    this.router.navigate(
      ['pages/jobportal/view-applicant'],
      Id
    )
  }

  exportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.exportData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'applicant.xlsx');
  }

  private async _refreshData() {
    console.log("refresh data")
    console.log(this.applicants)
    await this.source.load(
      this.applicants.map((item: Applicant, index: number) => {
        var dataDate = new Date(item.ApplyDtApplication);
        var convertDataDate = dataDate.toISOString().split("T")[0];
        var fullname = [item.Name, item.MiddleName, item.LastName].filter(Boolean).join(" ");
        return {
          No: index + 1,
          Id: item.Id,
          ApplyPosition: item.ApplyPosition,
          ApplyPositionID: item.ApplyPositionID,
          LoginEmail: item.LoginEmail,
          Name: fullname,
          ApplyDtApplication: convertDataDate,
          ApplyStatus: item.ApplyStatus,
          action: '<a href="pages/jobportal/view-applicant/' + item.Id + '">View</a>',
        }
      })
    )
    await this._setupExportData()
  }

  private _refreshPositionData() {
    this.positions.map((item: Position) => {
      return {
        Id: item.Id,
        Position: item.Position
      }
    })
    this.positions.unshift({ Id: 19, Position: 'All' })
  }

  private async _setupExportData() {
    const data = (await this.source.getAll() as any[]).map((row) => { 
      const rowData = []
      rowData.push(row.ApplyPosition)
      rowData.push(row.LoginEmail)
      rowData.push(row.Name)
      rowData.push(formatDate(row.ApplyDtApplication, 'dd/MM/yyyy', 'en-MY'))
      rowData.push(row.ApplyStatus)
      return rowData
    })
    this.exportData = [['Position', 'Email', 'Applicant Name', 'Profile Updated Date', 'Status'], ...data]
  }
}