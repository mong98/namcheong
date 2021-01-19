import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import {
  NbCardModule,
  NbDatepickerModule,
  NbCheckboxModule,
} from '@nebular/theme'
import { ViewApplicantComponent } from './view-applicant.component'
import { Ng2SmartTableModule } from 'ng2-smart-table'
import { routing } from './view-applicant.routing'
import { NbThemeModule, NbButtonModule, NbLayoutModule } from '@nebular/theme'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NbDatepickerModule,
    NbCardModule,
    NbCheckboxModule,
    NbThemeModule,
    NbButtonModule,
    NbLayoutModule,
    Ng2SmartTableModule,
    routing,
  ],
  declarations: [ViewApplicantComponent],
})
export class ViewApplicantModule {}
