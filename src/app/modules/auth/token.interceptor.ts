import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from './services/auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authServ: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // if not logged IN
    request = request.clone({
      setHeaders: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (this.authServ.isLoggedIn()) {
      request = request.clone({
        setHeaders: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.authServ.getToken(),
        },
      });
    }
    return next.handle(request).pipe(
      catchError((errorData) => {
        if (errorData.status === 401) {
          this.authServ.removeTokens();
          this.router.navigate(['login']);
        }
        return of(errorData);
      })
    ) as Observable<HttpEvent<any>>;
  }
}
