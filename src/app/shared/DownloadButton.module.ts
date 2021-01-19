import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { DownloadButton } from './DownloadButton.component'

@NgModule({
  imports: [
    CommonModule,
    BrowserModule
  ],
  declarations: [DownloadButton],
})
export class DownloadButtonModule { }
