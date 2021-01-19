import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'ngx-editlinkcomponent',
  template: `
    <input nbButton type="button" (click)="onClick($event)" value="Edit" />
  `,
})
export class EditLinkComponent implements OnInit {
  link_url: string

  @Input() rowData: any

  @Output() save: EventEmitter<any> = new EventEmitter()

  constructor(private router: Router) {
    console.log('Inside constructor ', this.constructor.name)
  }

  ngOnInit(): void {
    console.log(
      'Inside ngOnInit ',
      this.constructor.name,
      ' link_url: ',
      this.link_url
    )
  }

  onClick(event) {
    console.log(
      'Inside onClick ',
      this.constructor.name,
      ' id: ',
      this.rowData.no,
      ' link_url: ',
      this.link_url
    )
    //event.preventDefault();
  }
}
