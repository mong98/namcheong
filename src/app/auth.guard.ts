import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { MENU_ITEMS, APPLICANT_MENU_ITEMS } from './pages/pages-menu'
//import { PagesComponent } from './pages/pages.component'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  //constructor(private router: Router, private pages: PagesComponent) { }
  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('access_token')) {
      console.log("access_token: ", localStorage.getItem('access_token'))
      //this.setPageMenu()
      return true;
    }
    
    if(localStorage.getItem('is_admin')) {
      this.router.navigate(['admin']);
    }

    this.router.navigate(['applicant-login']);
    return false;
  }

  /*setPageMenu() {
    this.pages.menu = MENU_ITEMS
  }*/
}