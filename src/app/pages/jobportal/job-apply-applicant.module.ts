import { NgModule } from '@angular/core'
import {
  NbCardModule,
  NbDatepickerModule,
  NbCheckboxModule,
} from '@nebular/theme'
import {
  SmartTableDatepickerComponent,
  SmartTableDatepickerRenderComponent,
} from '../../smart-table-datepicker/smart-table-datepicker.component'
import { Ng2SmartTableModule } from 'ng2-smart-table'
import { ThemeModule } from '../../@theme/theme.module'
import { JobApplyApplicantComponent } from './job-apply-applicant.component'
import { NbThemeModule, NbButtonModule, NbLayoutModule } from '@nebular/theme'
import { FormsModule } from '@angular/forms'

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbDatepickerModule.forRoot(),
    NbCheckboxModule,
    Ng2SmartTableModule,
    NbThemeModule,
    NbButtonModule,
    NbLayoutModule,
    FormsModule,
  ],
  declarations: [JobApplyApplicantComponent],
})
export class JobApplyApplicantModule {}
