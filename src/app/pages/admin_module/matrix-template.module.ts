import { NgModule } from '@angular/core'
import { NbCardModule } from '@nebular/theme'

import { ThemeModule } from '../../@theme/theme.module'
import { MatrixTemplateComponent } from './matrix-template.component'
import { NbThemeModule, NbButtonModule, NbLayoutModule } from '@nebular/theme'

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbThemeModule,
    NbButtonModule,
    NbLayoutModule,
  ],
  declarations: [MatrixTemplateComponent],
})
export class MatrixTemplateModule {}
