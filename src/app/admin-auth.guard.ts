import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MENU_ITEMS, APPLICANT_MENU_ITEMS } from './pages/pages-menu'
//import { PagesComponent } from './pages/pages.component'

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  //constructor(private router: Router, private pages: PagesComponent) { }
  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('admin_access_token')) {
      console.log("admin_access_token: ", localStorage.getItem('admin_access_token'))
      //this.setPageMenu()
      return true;
    }

    this.router.navigate(['admin']);

    return false;
  }

  /*setPageMenu() {
    this.pages.menu = MENU_ITEMS
  }*/
}