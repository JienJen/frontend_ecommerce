import {    HttpEvent, 
            HttpHandler, 
            HttpInterceptor, 
            HttpRequest,
            HttpErrorResponse } from "@angular/common/http";
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { UserAuthService } from '../_services/user-auth.service';
import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from "ngx-ui-loader";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userAuthService: UserAuthService,
    private router:Router,
    private _ngxUiLoaderService: NgxUiLoaderService) {}

    private _activeRequest = 0;


    
 

  
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('**INGRESANDO AL INTERCEPTOR**');

    if (this._activeRequest === 0) {
      this._ngxUiLoaderService.startBackground();
    }
    this._activeRequest++; //1

    if (req.headers.get('No-Auth') === 'True') {
      return next.handle(req.clone());
    }
    

    const token = this.userAuthService.getToken();

    if(token) {
      req = this.addToken(req, token);
    }

    return next.handle(req).pipe(
        catchError(
            (err:HttpErrorResponse) => {
                console.log(err.status);
                if(err.status === 401) {
                  this.router.navigate(['/login']);
              } else if(err.status === 403) {
                  this.router.navigate(['/forbidden']);
              }
                return throwError(err.error.message);
              }
        ),
        finalize(() => this._stopLoader())

    ); 
              
  }

  private _stopLoader() {
    this._activeRequest--;
    if (this._activeRequest === 0) {
      this._ngxUiLoaderService.stopBackground();
    }
  }

  private addToken(request:HttpRequest<any>, token:string) {
      return request.clone(
          {
              setHeaders: {
                  Authorization : `Bearer ${token}`
              }
          }
      );
  }
}