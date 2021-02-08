import { Component } from '@angular/core'

import { MENU_ITEMS, APPLICANT_MENU_ITEMS } from './pages-menu'

import { BaseService } from '../services/base.service'
import { Router } from '@angular/router'

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  menu = MENU_ITEMS

  constructor(private router: Router) {
    // check if user role is admin, show admin page
    if(localStorage.getItem("access_token") != null
    || (localStorage.getItem("access_token") != null
    && this.router.url.includes('applicant-login')
    || this.router.url.includes('applicant_jobportal'))) {
      this.menu = APPLICANT_MENU_ITEMS
    }

    console.log("PagesComponent: ", this.router.url)
    console.log("PagesComponent: ", this.router.url.includes('admin'))
    if(this.router.url.includes('admin') || this.router.url.includes('assets')
    || !this.router.url.includes('/pages/dashboard-applicant')
    && !this.router.url.includes('/pages/applicant_jobportal/')) {
      this.menu = MENU_ITEMS
      
    }
  }

}
