import { BaseService } from '../../services/base.service'
import { first } from 'rxjs/operators';

import { User } from '../../interfaces/user'

import { Component, OnDestroy, OnInit } from '@angular/core'
import { UserService } from '../../services/user.service'

import { Injectable } from '@angular/core'
import { Subscription } from 'rxjs'

import { Router, ActivatedRoute } from '@angular/router'
//import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})

@Component({
  templateUrl: './admin-login.html',
  styleUrls: ['./admin-login.component.scss'],
})

export class AdminLoginComponent implements OnInit, OnDestroy {
  _subscription: Subscription
  login_user: User;
  email: string;
  password: string;
  username: string;
  retyped_password: string;
  register_email: string;
  register_password: string;
  register_username: string;
  register_retyped_password: string;
  login_error: string = null;
  register_error: string = null;
  routeURL: string;
  //salt = bcrypt.genSaltSync(10);

  constructor(private service: UserService, private router: Router,
    private baseService: BaseService) {
    //this.routeURL = this.router.url;
  }

  ngOnInit(): void {
    //this.loginAdmin()
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe()
    }
  }

  loginAdmin() {
    //this.password = bcrypt.hashSync(this.password, this.salt)
      console.log("loginAdmin password: ", this.password)
      this.baseService.loginAdmin(this.email, this.username, this.password)
      .pipe(first())
      .subscribe(
        (result: any) => {
          console.log("result: ", result, " email: ", this.email)
          this.router.navigate(['/pages/dashboard/'], { queryParams: { email: this.email }})
          localStorage.setItem('adminUsername',this.username);
          localStorage.setItem('adminEmail',this.email);
        },
        (err: any) => {
          this.login_error = 'Could not authenticate'
          console.log(this.login_error)
          console.log(err)
          if(err) {
            if(err.error.text) {
              this.login_error = err.error.text
            } else {
              this.login_error = err.error.error
            }
          }
        }
      );
  }

  logoutAdmin() {
    this.baseService.logoutAdmin();
    this.router.navigate(['/admin']);
  }

  registerAdmin(event) {
    //this.login_user.password = bcrypt.hashSync(this.login_user.password, this.salt)
    console.log("registerAdmin: ", this.register_password)
    this.baseService.registerAdmin(this.register_email, this.register_username, this.register_password, this.register_retyped_password)
    .pipe(first())
    .subscribe(
      (result: any) => {
        console.log("result: ", result, " email: ", this.register_email)
        this.router.navigate(['/pages/dashboard/'], { queryParams: { email: this.register_email }})
      },
      (err: any) => {
        console.log("error: ", err)
        this.register_error = 'Could not register user'
        console.log(this.register_error)
        if(err) {
          this.register_error = err.error.error
        }
      }
    );
  }
}