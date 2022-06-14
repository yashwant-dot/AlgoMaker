import { Injectable } from '@angular/core';
import { API } from 'src/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(user: any): Observable<any> {
    return this.http
      .post(`${API}/signin`, JSON.stringify(user), {
        headers: this.getHeaders(),
      })
      .pipe(
        tap((response) => this.storeToken(response)),
        catchError((error) => of(error))
      );
  }

  getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Accept', 'application/json')
      .set('content-type', 'application/json');
  }

  storeToken(data: any): void {
    localStorage.setItem('token', JSON.stringify(data.token));
    localStorage.setItem('user', JSON.stringify(data.user));
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('token') === null) {
      return false;
    }
    return true;
  }
}
