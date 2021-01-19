import { Routes, RouterModule } from '@angular/router'

import { ViewApplicantComponent } from './view-applicant.component'

const routes: Routes = [
  {
    path: '',
    component: ViewApplicantComponent,
  },
]

export const routing = RouterModule.forChild(routes)
