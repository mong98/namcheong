import { Component, Input, OnInit } from '@angular/core'
import { DefaultEditor, ViewCell } from 'ng2-smart-table'
import { environment } from '../../environments/environment';

//var path = require("path");

@Component({
  selector: 'ngx-downloadbuttoncomponent',
  templateUrl: './DownloadButton.component.html',
})
export class DownloadButton extends DefaultEditor implements OnInit, ViewCell {
  @Input() value;
  @Input() rowData: any

  label: string
  filePath: string | null
  url:string

  constructor() {
    super()
  }

  ngOnInit(): void {
    this.label = this.value.label
    this.filePath = this.value.filePath
    this.url = environment.documentPathPrefix +'/'+ this.filePath
  }

  download() {
    this._getApplicantDocument()
  }

  private _getApplicantDocument() {
    // if (this.filePath) {
    //   window.open(`${environment.documentPathPrefix}\\${this.filePath}`, '_blank')
    // }
    if (this.filePath) {
      var link=document.createElement('a');
    link.href = this.url;
    link.download = this.url.substr(this.url.lastIndexOf('/') + 1);
    link.click();
    console.log(link)
    }
    
  }
}
