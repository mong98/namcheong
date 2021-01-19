import { Component, NgModule } from '@angular/core'
import { NbDatepickerModule } from '@nebular/theme'
import {
  SmartTableDatepickerComponent,
  SmartTableDatepickerRenderComponent,
} from '../../smart-table-datepicker/smart-table-datepicker.component'

@Component({
  selector: 'ngx-jobapplyapplicant',
  templateUrl: './job-apply-applicant.component.html',
  styleUrls: ['./open-vacancy.component.scss'],
})
export class JobApplyApplicantComponent {
  settings = {
    columns: {
      name: {
        title: 'Name',
      },
      relationship: {
        title: 'Relationship',
      },
      occupation: {
        title: 'Occupation',
      },
      contactNumber: {
        title: 'Contact Number',
      },
      dateOfBirth: {
        title: 'Date Of Birth',
      },
      age: {
        title: 'Age',
      },
    },
  }
  data = []
}
