import { NgModule } from '@angular/core'
import { NbCardModule } from '@nebular/theme'

import { ThemeModule } from '../../@theme/theme.module'
import { UserIdConfigureComponent } from './useridconfigure.component'

import { Ng2SmartTableModule } from 'ng2-smart-table'
import { NbThemeModule, NbButtonModule, NbLayoutModule } from '@nebular/theme'
import { FormsModule } from '@angular/forms'

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    Ng2SmartTableModule,
    NbThemeModule,
    NbButtonModule,
    NbLayoutModule,
    FormsModule,
  ],
  declarations: [UserIdConfigureComponent],
})
export class UserIdConfigureModule {}
