import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import {
  NbCardModule,
  NbDatepickerModule,
  NbCheckboxModule,
} from '@nebular/theme'
import { Ng2SmartTableModule } from 'ng2-smart-table'
import { ThemeModule } from '../../@theme/theme.module'
import { NbThemeModule, NbButtonModule, NbLayoutModule } from '@nebular/theme'

import { ContactUsComponent } from './contact-us.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NbCardModule,
    NbDatepickerModule,
    NbCheckboxModule,
    NbDatepickerModule.forRoot(),
    Ng2SmartTableModule,
    ThemeModule,
    NbThemeModule,
    NbButtonModule,
    NbLayoutModule,
  ],
  declarations: [ContactUsComponent],
})
export class ContactUsModule {}
