import { Component, OnDestroy, OnInit } from '@angular/core'

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard-applicant.component.html',
})
export class DashboardApplicantComponent implements OnInit {
  username: string

  ngOnInit(): void {
    this.username = localStorage.getItem('user_name');
  }
}
