import { Component, OnDestroy, OnInit } from '@angular/core'

import { identity, Subscription } from 'rxjs'
import { ApplicationStatus } from '../../interfaces/applicationstatus'
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
    userEmail: string
  
    private _statusSubscription: Subscription
  
    constructor(
      private statusService: OpenVacancyService,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      this.username = localStorage.getItem('user_name');
      this.userEmail = localStorage.getItem('user_email');
      this._getStatus()
    }
  
    ngOnDestroy(): void {
      if (this._statusSubscription) {
        this._statusSubscription.unsubscribe()
      }
    }
  
    navigatePage() {
      this.router.navigateByUrl('/pages/applicant_jobportal/crew_job_portal')
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
  
    private _refreshVacancyData(result: any[]) {
      this.allStatus = result.map((status: ApplicationStatus) => {
        return {
          Id: status.Id,
          Position: status.Position,
          Status: status.Status
        }
      })
  
    }
  }