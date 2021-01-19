import { Component, OnDestroy, OnInit } from '@angular/core'

import { identity, Subscription } from 'rxjs'
import { OpenVacancy } from '../../interfaces/openvacancy'
import { OpenVacancyService } from '../../services/openvacancy.service'
import { formatDate } from '@angular/common'
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['../jobportal/open-vacancy.component.scss', './crew-job-portal.component.scss'],
  templateUrl: './dashboard-applicant.component.html',
})
export class DashboardApplicantComponent implements OnInit {
  username: string
  userEmail: string
  allVacancies: any[] = []

  private _vacanciesSubscription: Subscription

  constructor(
    private vacancyService: OpenVacancyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('user_name');
    this.userEmail = localStorage.getItem("user_email")
    this._getVacancies()
  }

  ngOnDestroy(): void {
    if (this._vacanciesSubscription) {
      this._vacanciesSubscription.unsubscribe()
    }
  }

  navigatePage(id,psid) {
    //this.router.navigateByUrl('/pages/applicant_jobportal/crew_job_portal')
    this.router.navigate(['/pages/applicant_jobportal/crew_job_portal/'], { queryParams: { openvacancy: id, psid: psid }})
  }

  private _getVacancies() {
    this._vacanciesSubscription = this.vacancyService.getAllOpenVacancies().subscribe(
      (result: any[]) => {
        this._filterVacancyData(result)
      },
      (err) => alert('Failed to load vacancies')
    )
  }

  private _filterVacancyData(result:any []) {
    for (var i =0; i < result.length; i++) {
      var item = result[i]
      let currentDate = new Date();
      var dataDate = new Date(item.DateEnd);
      var convertDataDate = dataDate.toISOString().split("T")[0];
      var convertTodayDate = currentDate.toISOString().split("T")[0];

      if (convertDataDate < convertTodayDate) {
          result.splice(i, 1); 
          i--; 
      }
    }
    this._refreshVacancyData(result)
  }


  private _refreshVacancyData(result: any[]) {
    this.allVacancies = result.map((openvacancy: OpenVacancy) => {
        return {
          Id: openvacancy.Id,
          PSId: openvacancy.PSId,
          Position: openvacancy.Position,
          DateEnd: openvacancy.DateEnd,
          Vessel: openvacancy.HullNo
        } 
    })

  }
}
