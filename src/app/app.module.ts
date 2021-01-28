/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { CoreModule } from './@core/core.module'
import { ThemeModule } from './@theme/theme.module'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule} from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';

import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
  //NbCheckboxModule,
} from '@nebular/theme'

import { FormsModule } from '@angular/forms'
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime'
import {
  SmartTableDatepickerComponent,
  SmartTableDatepickerRenderComponent,
} from './smart-table-datepicker/smart-table-datepicker.component'
import { CheckboxComponent } from './shared/CheckboxComponent.component'
import { DownloadButtonModule } from './shared/DownloadButton.module'
import { DialogContentExampleDialog, SimpleDialogComponent } from './pages/applicant_jobportal/crew-job-portal.component'


// authentication module
//import { AuthService } from './auth.service';
import { BaseService } from './services/base.service'
import { AuthGuard } from './auth.guard';
import { AdminAuthGuard } from './admin-auth.guard';

import { JwtModule } from '@auth0/angular-jwt';
import { SignatureComponent } from './pages/jobportal/signature/signature.component';


export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    SmartTableDatepickerComponent,
    SmartTableDatepickerRenderComponent,
    DialogContentExampleDialog,
    SimpleDialogComponent,
    SignatureComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    ThemeModule.forRoot(),

    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    //NbCheckboxModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    DownloadButtonModule,
    MatDialogModule,
    //MatButtonModule,
    //MatFormFieldModule,
    //MatInputModule,
    //MatRippleModule,
    // Add this import here
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:4200'],
        disallowedRoutes: ['localhost:4200/api/auth']
      }
    }),
  ],
  /*exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
  ],*/
  entryComponents: [
    SmartTableDatepickerComponent,
    SmartTableDatepickerRenderComponent,
    CheckboxComponent,
    DialogContentExampleDialog,
    SimpleDialogComponent,
    SignatureComponent
    
  ],
  bootstrap: [AppComponent],
  providers: [
    BaseService,
    AuthGuard,
    AdminAuthGuard
  ],
})
//export class MaterialModule {};

export class AppModule { }
