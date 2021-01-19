import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NbCardModule } from '@nebular/theme'
import { FormsModule } from '@angular/forms'
import { NbDatepickerModule, NbCheckboxModule } from '@nebular/theme'
import { Ng2SmartTableModule } from 'ng2-smart-table'
import { NbThemeModule, NbButtonModule, NbLayoutModule } from '@nebular/theme'

import { ThemeModule } from '../../@theme/theme.module'
import { MatrixComponent } from './matrix.component'

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
  declarations: [MatrixComponent],
})
export class MatrixModule {}
