import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authServ: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
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
    return next.handle(request);
  }
}
