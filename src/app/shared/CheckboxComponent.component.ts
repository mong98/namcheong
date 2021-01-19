import { Component, Input, OnInit } from '@angular/core'
import { DefaultEditor, ViewCell } from 'ng2-smart-table'

@Component({
  selector: 'ngx-checkboxcomponent',
  templateUrl: './Checkbox.component.html',
})
export class CheckboxComponent extends DefaultEditor implements OnInit, ViewCell {
  public Chk: boolean
  column: string

  @Input() value;
  @Input() rowData: any

  constructor() {
    super()
  }

  ngOnInit(): void {
    this.Chk = this.value.value ? this.value.value === 'Y' : this.value
    this.column = this.value.column
  }

  onChange() {
    this.Chk = !this.Chk

    if (this.column) {
      this.rowData[this.column] = this.Chk ? 'Y' : 'N'
    }
  }
}
