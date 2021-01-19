import { ExtraOptions, RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth'
import { UserLoginComponent } from './pages/login_page/user-login.component'
import { AdminLoginComponent } from './pages/login_page/admin-login.component'
import { ForgotPasswordComponent } from './pages/login_page/forgot-password.component'
import { ContactUsComponent } from './pages/login_page/contact-us.component'

export const routes: Routes = [
  { path: 'applicant-login', component: UserLoginComponent, pathMatch: 'full'  },
  { path: 'admin', component: AdminLoginComponent, pathMatch: 'full'  },
  { path: 'forgot-password', component: ForgotPasswordComponent, pathMatch: 'full'  },
  { path: 'contact-us', component: ContactUsComponent, pathMatch: 'full'  },
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },
  /*{
    path: 'testAPI',
    redirectTo: "http://localhost:9000/",
  },*/

  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  //{ path: '**', redirectTo: 'pages' },
]

const config: ExtraOptions = {
  useHash: false,
}

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
