import { NgModule } from '@angular/core'
import { NbMenuModule, NbCheckboxModule, NbButtonModule } from '@nebular/theme'

import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule} from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';

import { ThemeModule } from '../@theme/theme.module'
import { PagesComponent } from './pages.component'
import { DashboardModule } from './dashboard/dashboard.module'

import { OpenVacancyModule } from './jobportal/open-vacancy.module'
import { ApplicantModule } from './jobportal/applicant.module'
import { JobApplyApplicantModule } from './jobportal/job-apply-applicant.module'

import { MatrixModule } from './report/matrix.module'
import { AfeCvSeaModule } from './report/afecvsea.module'

import { PositionModule } from './admin_module/position.module'
import { DocumentModule } from './admin_module/document.module'
import { DocumentCheckListModule } from './admin_module/documentchecklist.module'
import { MatrixTemplateModule } from './admin_module/matrix-template.module'

import { AllowanceModule } from './admin_module/allowance.module'
import { ImoNoModule } from './admin_module/imono.module'
import { VesselModule } from './admin_module/vessel.module'
import { PortOfRegistryModule } from './admin_module/portofregistry.module'
import { RaceModule } from './admin_module/race.module'

import { ReligionModule } from './admin_module/religion.module'
import { RelationshipModule } from './admin_module/relationship.module'
import { StateModule } from './admin_module/state.module'
import { CountryModule } from './admin_module/country.module'
import { IssuingAuthorityModule } from './admin_module/issuingauthority.module'
import { UserIdConfigureModule } from './admin_module/useridconfigure.module'

import { PagesRoutingModule } from './pages-routing.module'
import { DashboardApplicantModule } from './applicant_jobportal/dashboard-applicant.module'

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    DashboardApplicantModule,
    OpenVacancyModule,
    ApplicantModule,
    JobApplyApplicantModule,
    MatrixModule,
    AfeCvSeaModule,
    AllowanceModule,
    DocumentModule,
    DocumentCheckListModule,
    ImoNoModule,
    VesselModule,
    PortOfRegistryModule,
    PositionModule,
    RaceModule,
    ReligionModule,
    RelationshipModule,
    StateModule,
    CountryModule,
    IssuingAuthorityModule,
    UserIdConfigureModule,
    MatrixTemplateModule,
    NbCheckboxModule,
    NbButtonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    //MatRippleModule,
  ],
  declarations: [PagesComponent],
})
export class PagesModule { }
