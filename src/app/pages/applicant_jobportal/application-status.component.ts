import { Component, OnDestroy, OnInit } from '@angular/core'

import { identity, Subscription } from 'rxjs'
import { ApplicationStatus } from '../../interfaces/applicationstatus'
import { OpenVacancy } from '../../interfaces/openvacancy'
import { OpenVacancyService } from '../../services/openvacancy.service'
import { formatDate } from '@angular/common'
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['../jobportal/open-vacancy.component.scss', './crew-job-portal.component.scss'],
  templateUrl: './application-status.component.html',
})
export class ApplicationStatusComponent implements OnInit {
    username: string
    allStatus: any[] = []
    allVacancies: any[] = [] // Added by Hakim on 19 Jan 2021
    userEmail: string
  
    private _statusSubscription: Subscription
    private _vacanciesSubscription: Subscription

    constructor(
      private statusService: OpenVacancyService,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      this.username = localStorage.getItem('user_name');
      this.userEmail = localStorage.getItem('user_email');
      this._getVacancies() // Added by Hakim on 19 Jan 2021
      this._getStatus()
    }
  
    ngOnDestroy(): void {
      if (this._statusSubscription) {
        this._statusSubscription.unsubscribe()
      }

      // Added by Hakim on 19 Jan 2021 - Start
      if (this._vacanciesSubscription) {
        this._vacanciesSubscription.unsubscribe()
      }
      // Added by Hakim on 19 Jan 2021 - End
    }
  
    navigatePage(id,psid) {
      //this.router.navigateByUrl('/pages/applicant_jobportal/crew_job_portal')
      console.log("check id")
      console.log(id)
      console.log(psid)
      this.router.navigate(['/pages/applicant_jobportal/crew_job_portal/'], { queryParams: { openvacancy: id, psid: psid }})
    }

    private _getStatus() {
      this._statusSubscription = this.statusService.getAppliedOpenVacancy(this.userEmail).subscribe(
        (result: any[]) => {
          this._refreshVacancyData(result),
          console.log("result in here")
        },
        (err) => alert('Failed to load vacancies')
      )
    }

    private _getVacancies() {
      this._vacanciesSubscription = this.statusService.getAllOpenVacancies().subscribe(
        (result: any[]) => {
          this.allVacancies = result
        },
        (err) => alert('Failed to load vacancies')
      )
    }
  
    private _refreshVacancyData(result: any[]) {
      this.allStatus = result.map((status: ApplicationStatus) => {

        let dtUpdate = new Date(status.DtApplication).toLocaleString()
        let dtSubmit = new Date(status.SubmitDt).toLocaleString()
        let vacancy = this.allVacancies.filter(v => v.PSId == status.PositionID)
        console.log(vacancy)
        return {
          Id: status.Id,
          PositionID: status.PositionID,
          VacancyID: vacancy[0].Id ? vacancy[0].Id : '',
          Position: status.Position,
          DateUpdate: dtUpdate,
          DateSubmit: dtSubmit, // Added by Hakim on 19 Jan 2021
          Status: status.Status
        }
      })
    }
  }