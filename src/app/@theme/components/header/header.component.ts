import { Component, OnDestroy, OnInit } from '@angular/core'
import {
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme'

import { UserData } from '../../../@core/data/users'
import { LayoutService } from '../../../@core/utils'
import { map, takeUntil } from 'rxjs/operators'
import { Subject, Observable } from 'rxjs'
import { RippleService } from '../../../@core/utils/ripple.service'
//import { AuthService } from '../../../auth.service'
import { BaseService } from '../../../services/base.service'
import { Router } from '@angular/router'

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>()
  public readonly materialTheme$: Observable<boolean>
  userPictureOnly: boolean = false
  user: any
  user_name: string
  isUser: boolean = false

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
    {
      value: 'material-light',
      name: 'Material Light',
    },
    {
      value: 'material-dark',
      name: 'Material Dark',
    },
  ]

  currentTheme = 'default'

  userMenu = [
    { title: 'Profile', icon: 'fa fa-user' },
    { title: 'Settings', icon: 'fa fa-gear' },
    { title: 'Log out', icon: 'fa fa-sign-out' }];

  public constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private rippleService: RippleService,
    private router: Router,
    private baseService: BaseService
  ) {
    this.materialTheme$ = this.themeService.onThemeChange().pipe(
      map((theme) => {
        const themeName: string = theme?.name || ''
        return themeName.startsWith('material')
      })
    )
  }

  ngOnInit() {
    if(localStorage.getItem('access_token') != null) {
      this.isUser = true
      this.user_name = localStorage.getItem('user_name');
    }
    else if(localStorage.getItem('admin_access_token') != null) {
      this.isUser = false
      this.user_name = localStorage.getItem('admin_user_name');
    }

    this.currentTheme = this.themeService.currentTheme

    this.userService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => (this.user = users.nick))

    const { xl } = this.breakpointService.getBreakpointsMap()
    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl)
      )

    this.themeService
      .onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$)
      )
      .subscribe((themeName) => {
        this.currentTheme = themeName
        this.rippleService.toggle(themeName?.startsWith('material'))
      })
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName)
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar')
    this.layoutService.changeLayoutSize()

    return false
  }

  navigateHome() {
    this.menuService.navigateHome()
    return false
  }

  logout() {
    if(this.isUser) {
      console.log("User logout")
      this.baseService.logout();
      this.router.navigate(['applicant-login']);
    }
    else {
      console.log("Admin logout")
      this.baseService.logoutAdmin();
      this.router.navigate(['admin']);
    }
  }
}
