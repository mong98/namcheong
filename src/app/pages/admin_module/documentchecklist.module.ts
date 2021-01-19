import { NgModule } from '@angular/core'
import { NbCardModule } from '@nebular/theme'

import { ThemeModule } from '../../@theme/theme.module'
import { DocumentCheckListComponent } from './documentchecklist.component'

import { Ng2SmartTableModule } from 'ng2-smart-table'
import {
  NbThemeModule,
  NbButtonModule,
  NbLayoutModule,
  NbCheckboxModule,
} from '@nebular/theme'
//import { NbThemeModule, NbButtonModule, NbLayoutModule, NbCheckboxModule } from '@nebular/theme';
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
    NbCheckboxModule,
  ],
  declarations: [DocumentCheckListComponent],
})
export class DocumentCheckListModule {}
