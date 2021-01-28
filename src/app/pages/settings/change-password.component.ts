import { Component, OnDestroy, OnInit } from '@angular/core'
import { UserService } from '../../services/user.service'

import { User } from '../../interfaces/user'

import { Injectable } from '@angular/core'
import { Subscription } from 'rxjs'

import { Router, ActivatedRoute } from '@angular/router'
//import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'ngx-settings',
  templateUrl: './change-password.component.html',
})
export class AdminChangePasswordComponent implements OnInit, OnDestroy {
  _subscription: Subscription
  //user_change_password: User;
  email: string
  password: string
  new_password: string
  username: string
  retyped_password: string
  login_error: string = null
  //salt = bcrypt.genSaltSync(10);

  constructor(
    private service: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    //console.log("constructor href: ", window.location.href)
  }

  ngOnInit(): void {
    console.log('user_email: ', localStorage.getItem('admin_user_email'))
    this.username = localStorage.getItem('adminUsername')
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe()
    }
  }

  _refreshData() {}

  changePassword() {
    console.log('password: ', this.new_password)
    if (this.new_password == this.retyped_password) {
      this._subscription = this.service
        .updateAdminPassword({
          username: this.username,
          password: this.password,
          new_password: this.new_password,
          retyped_password: this.retyped_password,
        })
        .subscribe(
          (result: any) => {
            if (result.token == null) {
              if (result.error) {
                console.log(result)
                this.login_error = result.error
                alert(this.login_error)
              }
            } else {
              console.log('changePassword - result: ', result)
              alert('Password Changed!');
              this.router.navigate(['/pages/dashboard/'])
            }
            this._subscription.unsubscribe()
          },
          (error) => {
            alert('Password Incorrect!');
          }
        )
    } else {
      alert('Retype Password not Match!')
    }
  }
}
