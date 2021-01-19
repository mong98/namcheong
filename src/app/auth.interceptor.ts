import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  HttpHeaders,
  HttpRequest,
  HttpInterceptor,
  HttpHandler,
  HttpEvent
} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        const access_token = localStorage.getItem("access_token");

        if (access_token) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + access_token)
            });
            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }
}