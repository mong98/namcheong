import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  HttpHeaders
} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiServer = 'http://localhost:9000'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  login(email: string, username: string, password: string): Observable<boolean> {
    //localStorage.removeItem('access_token');
    return this.http.post<{token: string}>( `${this.apiServer}` + '/users/loginuser',
    {email: email, username: username, password: password}, this.httpOptions)
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result.token);
          return true;
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.clear();
    console.log("remove token: ", localStorage.getItem('access_token'))
  }

  getAccessToken(): string {
    return (localStorage.getItem('access_token'));
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }
}