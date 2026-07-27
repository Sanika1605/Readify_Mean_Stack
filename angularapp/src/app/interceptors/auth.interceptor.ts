import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token=localStorage.getItem('authToken');
    const currentUrl=this.router.url;

    if(token){
      const cloneReq=request.clone({
        setHeaders:{
          authorization:`Bearer ${token}`
        }
      })
      return next.handle(cloneReq).pipe(
        catchError((error:HttpErrorResponse)=>{
          if(currentUrl.includes('/error')){
            return throwError(()=>error)
          }
          if(error.status===404){
            this.router.navigate(['/error']).then(()=>{
              setTimeout(()=>{this.router.navigate(['/'])},2000)
            })
          }
          else if(error.status===500){
            this.router.navigate(['/error']).then(()=>{
              setTimeout(()=>{this.router.navigate(['/'])},2000)
            })
          }
          return throwError(()=>error)
        })
      )
    }
    return next.handle(request);
  }
}
