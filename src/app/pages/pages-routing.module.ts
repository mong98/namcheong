import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'

import { PagesComponent } from './pages.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { DashboardApplicantComponent } from './applicant_jobportal/dashboard-applicant.component'


import { OpenVacancyComponent } from './jobportal/open-vacancy.component'
import { ApplicantComponent } from './jobportal/applicant.component'
import { ViewApplicantComponent } from './jobportal/view-applicant.component'
import { CrewJobPortalComponent } from './applicant_jobportal/crew-job-portal.component'

import { MatrixComponent } from './report/matrix.component'
import { AfeCvSeaComponent } from './report/afecvsea.component'

import { PositionComponent } from './admin_module/position.component'
import { DocumentComponent } from './admin_module/document.component'
import { DocumentCheckListComponent } from './admin_module/documentchecklist.component'
import { MatrixTemplateComponent } from './admin_module/matrix-template.component'
import { AllowanceComponent } from './admin_module/allowance.component'
import { ImoNoComponent } from './admin_module/imono.component'
import { VesselComponent } from './admin_module/vessel.component'
import { PortOfRegistryComponent } from './admin_module/portofregistry.component'
import { RaceComponent } from './admin_module/race.component'

import { ReligionComponent } from './admin_module/religion.component'
import { RelationshipComponent } from './admin_module/relationship.component'
import { StateComponent } from './admin_module/state.component'
import { CountryComponent } from './admin_module/country.component'
import { IssuingAuthorityComponent } from './admin_module/issuingauthority.component'
import { UserIdConfigureComponent } from './admin_module/useridconfigure.component'
import { UserIdConfigureCrudComponent } from './admin_module/useridconfigurecrud.component'
import { ContactUsComponent } from './applicant_jobportal/contact-us.component'
import { ReportContactUs } from './report/contact-us.component'
import { ApplicationStatusComponent } from './applicant_jobportal/application-status.component'
import { ChangePasswordComponent } from './applicant_jobportal/change-password.component'
import { UserLoginComponent } from './login_page/user-login.component'

import { AuthGuard } from '../auth.guard'
import { AdminAuthGuard } from '../admin-auth.guard'

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    //canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AdminAuthGuard]
      },
      // applicant job portal menu page
      {
        path: 'applicant_jobportal/dashboard-applicant',
        component: DashboardApplicantComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'applicant_jobportal/crew_job_portal',
        component: CrewJobPortalComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'applicant_jobportal/crew_job_portal/:LoginEmail',
        component: CrewJobPortalComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'applicant_jobportal/contact-us',
        component: ContactUsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'applicant_jobportal/application-status',
        component: ApplicationStatusComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'applicant_jobportal/change-password',
        component: ChangePasswordComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'jobportal/open_vacancy',
        component: OpenVacancyComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'jobportal/applicant',
        component: ApplicantComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'jobportal/view-applicant',
        component: ViewApplicantComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'jobportal/view-applicant/:Id',
        component: ViewApplicantComponent,
        canActivate: [AdminAuthGuard]
      },
      /*{
        path: 'jobportal/change-password',
        component: ChangePasswordComponent,
        canActivate: [AdminAuthGuard]
      },*/
      {
        path: 'report/matrix',
        component: MatrixComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'report/afe_cv_sea',
        component: AfeCvSeaComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'report/contact-us',
        component: ReportContactUs,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'admin_module/position',
        component: PositionComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'admin_module/document',
        component: DocumentComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'admin_module/document_check_list',
        component: DocumentCheckListComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'admin_module/matrix_template',
        component: MatrixTemplateComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'admin_module/allowance',
        component: AllowanceComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'admin_module/vessel',
        component: VesselComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'admin_module/imo_no',
        component: ImoNoComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'admin_module/port_of_registry',
        component: PortOfRegistryComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'admin_module/race',
        component: RaceComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'admin_module/religion',
        component: ReligionComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'admin_module/relationship',
        component: RelationshipComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'admin_module/state',
        component: StateComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'admin_module/country',
        component: CountryComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'admin_module/issuing_authority',
        component: IssuingAuthorityComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'admin_module/user_id_configure',
        component: UserIdConfigureComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'admin_module/user_id_configure_crud',
        component: UserIdConfigureCrudComponent,
        canActivate: [AdminAuthGuard]
      },
      // assess user documents
      {
        path: 'assets',
        redirectTo: 'report/afe_cv_sea',
        canActivate: [AdminAuthGuard],
      },
      {
        path: '',
        redirectTo: 'applicant_jobportal/dashboard-applicant',
        pathMatch: 'full',
        canActivate: [AuthGuard],
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
