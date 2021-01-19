import { Component, OnDestroy, OnInit } from '@angular/core'
import { UserService } from '../../services/user.service'

import { User } from '../../interfaces/user'

import { Injectable } from '@angular/core'
import { Subscription } from 'rxjs'

import { Router, ActivatedRoute, CanActivate,  ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
//import * as bcrypt from 'bcryptjs';

import { BaseService } from '../../services/base.service'
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

@Component({
  templateUrl: './user-login.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit, OnDestroy{
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
    this.routeURL = this.router.url;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe()
    }
  }

  loginUser(event) {
    //this.password = bcrypt.hashSync(this.password, this.salt)
      console.log("loginUser password: ", this.password)
      this.baseService.loginUser(this.email, this.username, this.password)
      .pipe(first())
      .subscribe(
        (result: any) => {
          console.log("result: ", result, " email: ", this.email)
          this.router.navigate(['/pages/applicant_jobportal/dashboard-applicant/'], { queryParams: { email: this.email }})
        },
        (err: any) => {
          this.login_error = 'Could not authenticate'
          console.log(this.login_error)
          console.log(err)
          if(err) {
            this.login_error = err.error.error
          }
        }
      );
  }

  logoutUser() {
    this.baseService.logout();
    this.router.navigate(['applicant-login']);
  }

  registerUser(event) {
    //this.login_user.password = bcrypt.hashSync(this.login_user.password, this.salt)
    console.log("registerUser: ", this.register_password)
    this.baseService.registerUser(this.register_email, this.register_username, this.register_password, this.register_retyped_password)
    .pipe(first())
    .subscribe(
      (result: any) => {
        console.log("result: ", result, " email: ", this.register_email)
        this.router.navigate(['/pages/applicant_jobportal/dashboard-applicant/'], { queryParams: { email: this.register_email }})
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