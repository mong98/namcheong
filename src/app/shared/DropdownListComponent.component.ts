import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'ngx-dropdownlistcomponent',
  template: `
    <select #item_name class="custom-select mb-2 mr-sm-2" id="item_name">
      <option *ngFor="let item of dropdown_list" value="{{ item.Id }}">
        {{ item.Title }}
      </option>
    </select>
  `,
})
export class DropdownListComponent implements OnInit {
  buttonValue: string
  column: string

  @Input() dropdown_list: any
  @Output() save: EventEmitter<any> = new EventEmitter()

  constructor() {
    console.log('Inside constructor ', this.constructor.name)
    console.log(this.dropdown_list)
  }

  ngOnInit(): void {
    console.log(
      'Inside ngOnInit ',
      this.constructor.name,
      ': - buttonValue: ',
      this.buttonValue
    )
  }

  onClick() {
    console.log(
      'Inside onClick ',
      this.constructor.name,
      ': - buttonValue: ',
      this.buttonValue,
      ' id: ',
      this.dropdown_list.Id
    )
  }
}
