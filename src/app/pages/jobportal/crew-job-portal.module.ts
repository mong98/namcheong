import { NgModule } from '@angular/core'
import { NbDateFnsDateModule } from '@nebular/date-fns'
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
import { CrewJobPortalComponent } from './crew-job-portal.component'
import { NbThemeModule, NbButtonModule, NbLayoutModule } from '@nebular/theme'
import { FormsModule } from '@angular/forms'

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbCheckboxModule,
    Ng2SmartTableModule,
    NbThemeModule,
    NbButtonModule,
    NbLayoutModule,
    FormsModule,
    NbDateFnsDateModule.forRoot({ format: 'dd.MM.yyyy' }),
    //NbDateFnsDateModule.forChild({ format: 'dd.MM.yyyy' }),
    NbDatepickerModule.forRoot(),
  ],
  declarations: [CrewJobPortalComponent],
})
export class CrewJobPortalModule {}
