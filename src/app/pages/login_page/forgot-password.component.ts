import { Component, OnDestroy, OnInit } from '@angular/core'
import { UserService } from '../../services/user.service'

import { User } from '../../interfaces/user'

import { Injectable } from '@angular/core'
import { Subscription } from 'rxjs'

import { Router, ActivatedRoute } from '@angular/router'

@Injectable({
  providedIn: 'root'
})

@Component({
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  _subscription: Subscription
  email: string
  forgot_error: string = null;
  forgot_done: string = null;

  constructor(private service: UserService, private router: Router,
    private route: ActivatedRoute) {
    //this.routeURL = this.router.url;
  }

  ngOnInit(): void {
    //this.forgotPassword()
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe()
    }
  }

  btnBack() {
    this.router.navigateByUrl('/applicant-login');
  }

  isValid() {
    if (this.email === '') {
      window.alert('Please specify email')
      return false
    }
    return true
  }

  forgotPassword() {
    if (!this.isValid()) return

    this._subscription = this.service.forgotPassword({ 
      email: this.email }
      ).subscribe(
        (result: any) => {
          //this.forgot_done = result.message
          alert(result.message)
          setTimeout(() => {
            this.router.navigate(['/'])
          }
          , 2000);
        },
        (err: any) => {
          console.log(err)
          if(err) {
            //this.forgot_error = 'Failed to reset password!'
            alert('Failed to reset password!')
          }
        }
      );
  }

}
