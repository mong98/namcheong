import { NgModule } from '@angular/core'
import { NbCardModule } from '@nebular/theme'

import { ThemeModule } from '../../@theme/theme.module'
import { DashboardApplicantComponent } from './dashboard-applicant.component'

@NgModule({
  imports: [NbCardModule, ThemeModule],
  declarations: [DashboardApplicantComponent],
})
export class DashboardApplicantModule {}
