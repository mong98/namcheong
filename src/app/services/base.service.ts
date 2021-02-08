import { Injectable } from '@angular/core'
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http'

import { throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
//import { AuthService } from '../auth.service'

import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private apiServer = 'http://localhost:9000'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient, //private authService: AuthService,
    private router: Router) {
    //auth_token = authService.loggedIn
  }

  constructHttpOptions() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getAccessToken()
      })
    }
  }

  registerAdmin(email: string, username: string, password: string, retyped_password: string) {
    this.constructHttpOptions()
    return this.httpClient
    .post<{token: string, name: string, email: string}>(`${this.apiServer}` + '/users/add_admin',
    {email: email, username: username, password: password, retyped_password: retyped_password}, this.httpOptions)
    .pipe(
      map(result => {
        if(result.token) {
          localStorage.setItem('admin_access_token', result.token);
          localStorage.setItem('admin_user_name', result.name);
          localStorage.setItem('admin_user_email', result.email);
          return true;
        }
        return false
      })
    );
  }



  loginAdmin(email: string, username: string, password: string) {
    this.constructHttpOptions()
    return this.httpClient
    .post<{token: string, name: string, email: string,UserID:string,AccessModule:any}>(`${this.apiServer}` + '/users/login_admin',
    {email: email, username: username, password: password}, this.httpOptions)
    .pipe(
      map(result => {
        console.log('Admin Login')
        console.log(result);
        if(result.token) {
          localStorage.setItem('admin_access_token', result.token);
          localStorage.setItem('admin_user_name', result.name);
          localStorage.setItem('admin_user_email', result.email);
          localStorage.setItem('admin_userID', result.UserID);
          localStorage.setItem('admin_accessModule', JSON.stringify(result.AccessModule));
          return true;
        }
        return false
        })
    );
  }

  registerUser(email: string, username: string, password: string, retyped_password: string) {
    this.constructHttpOptions()
    return this.httpClient
    .post<{token: string, name: string, email: string}>(`${this.apiServer}` + '/users/add_user',
    {email: email, username: username, password: password, retyped_password: retyped_password}, this.httpOptions)
    .pipe(
      map(result => {
        if(result.token) {
          localStorage.setItem('access_token', result.token);
          localStorage.setItem('user_name', result.name);
          localStorage.setItem('user_email', result.email);
          return true;
        }
        return false
      })
    );
  }

  loginUser(email: string, username: string, password: string) {
    this.constructHttpOptions()
    return this.httpClient
    .post<{token: string, name: string, email: string}>(`${this.apiServer}` + '/users/login_user',
    {email: email, username: username, password: password}, this.httpOptions)
      .pipe(
        map(result => {
          if(result.token) {
            localStorage.setItem('access_token', result.token);
            localStorage.setItem('user_name', result.name);
            localStorage.setItem('user_email', result.email);
            return true;
          }
          return false
         })
      );
    /*return this.httpClient
    .post<{token: string, name: string, email: string}>(`${this.apiServer}` + '/users/login_user',
    {email: email, username: username, password: password}, this.httpOptions)
    .pipe(catchError(this.errorHandler));*/
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_email');
    localStorage.clear();
  }

  logoutAdmin() {
    localStorage.removeItem('admin_access_token');
    localStorage.removeItem('admin_user_name');
    localStorage.removeItem('admin_user_email');
    localStorage.clear();
  }

  getAccessToken(): string {
    return (localStorage.getItem('access_token'));
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }

  get(entity: string) {
    this.constructHttpOptions()
    return this.httpClient
      .get(`${this.apiServer}/${entity}/get_${entity}`,
      this.httpOptions)
      .pipe(catchError(this.errorHandler))
  }

  getWithParams(entity: string, params: any) {
    // const paramQuery = Object.values(params).join('&')
    const paramQuery = Object.values(params).join('/') // Update by Hakim on 1 Feb 2021

    return this.httpClient
      .get(`${this.apiServer}/${entity}/get_${entity}/${paramQuery}`)
      .pipe(catchError(this.errorHandler))
  }

  getSecondaryEntity(entity: string, secondaryEntity: string) {
    this.constructHttpOptions()
    return this.httpClient
      .get(`${this.apiServer}/${entity}/get_${secondaryEntity}`,
      this.httpOptions)
      .pipe(catchError(this.errorHandler))
  }

  getSecondaryEntityById(entity: string, secondaryEntity: string, id: string) {
    this.constructHttpOptions()
    return this.httpClient
      .get(`${this.apiServer}/${entity}/get_${secondaryEntity}/${id}`,
      this.httpOptions)
      .pipe(catchError(this.errorHandler))
  }

  getById(entity: string, id: string) {
    this.constructHttpOptions()
    return this.httpClient
      .get(`${this.apiServer}/${entity}/get_${entity}/${id}`,
      this.httpOptions)
      .pipe(catchError(this.errorHandler))
  }

  add(entity: string, data: any) {
    this.constructHttpOptions()
    return this.httpClient
      .post(
        `${this.apiServer}/${entity}/add_${entity}`,
        data,
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler))
  }

  addSecondaryEntity(entity: string, secondaryEntity: string, data: any) {
    this.constructHttpOptions()
    return this.httpClient
      .post(
        `${this.apiServer}/${entity}/add_${secondaryEntity}`,
        data,
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler))
  }

  update(entity: string, data: any) { 
    this.constructHttpOptions()
    return this.httpClient
      .put(
        `${this.apiServer}/${entity}/update_${entity}`,
        data,
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler))
  }

  updateWithId(entity: string, updateId: string, data: any) {
    this.constructHttpOptions()
    return this.httpClient
      .put(
        `${this.apiServer}/${entity}/update_${entity}/${updateId}`,
        data,
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler))
  }

  // Added by Hakim on 3 Feb 2021 - Start
  updatePasswordWithId(entity: string, updateId: string, data: any) {
    this.constructHttpOptions()
    return this.httpClient
      .put(
        `${this.apiServer}/${entity}/update_${entity}password/${updateId}`,
        data,
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler))
  }
  // Added by Hakim on 3 Feb 2021 - End

  updateSecondaryEntity(entity: string, secondaryEntity: string, data: any) {
    this.constructHttpOptions()
    return this.httpClient
      .put(
        `${this.apiServer}/${entity}/update_${secondaryEntity}`,
        data,
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler))
  }

  customPutSecondaryEntity(entity: string, customSecondaryEntity: string, data: any) {
    this.constructHttpOptions()
    return this.httpClient
      .put(
        `${this.apiServer}/${entity}/${customSecondaryEntity}`,
        data,
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler))
  }

  delete(entity: string, id: string) {
    this.constructHttpOptions()
    return this.httpClient
      .delete(
        `${this.apiServer}/${entity}/delete_${entity}/${id}`,
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler))
  }

  deleteSecondaryEntity(entity: string, secondaryEntity: string, id: string) {
    this.constructHttpOptions()
    return this.httpClient
      .delete(
        `${this.apiServer}/${entity}/delete_${secondaryEntity}/${id}`,
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler))
  }

  uploadFile(Id: string, userId: string, file: File, columnType: string) {
    //this.constructHttpOptions()
    // reconstruct http opt
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.getAccessToken()
      })
    }

    const formData = new FormData()
    formData.append('Id', Id)
    formData.append('file', file)
    formData.append('UserID', userId)
    formData.append('ColumnType', columnType)

    return this.httpClient
      .post(
        `${this.apiServer}/file_upload/update_fileupload`,
        formData,
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler))
  }

  deleteFile(entity: string, columnToDelete: string, Id: string) {
    this.constructHttpOptions()
    return this.httpClient
      .delete(
        `${this.apiServer}/${entity}/delete_${columnToDelete}/${Id}`,
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler))
  }

  getAdminDetails(entity: string,secondaryEntity: string, Id: string) {
    this.constructHttpOptions()
    return this.httpClient
      .get(
        `${this.apiServer}/${entity}/${secondaryEntity}/${Id}`,
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler))
  }

  errorHandler(error: any) {
    let errorMessage = ''
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`
      if(error.status == 401) {
        this.router.navigate(['applicant-login']);
      }
    }

    return throwError(errorMessage)
  }
}
