import { NgModule } from '@angular/core'
import { NbCardModule } from '@nebular/theme'

import { ThemeModule } from '../../@theme/theme.module'
import { ApplicationStatusComponent } from './application-status.component'

@NgModule({
  imports: [NbCardModule, ThemeModule],
  declarations: [ApplicationStatusComponent],
})
export class ApplicationStatusModule {}
