import { Injectable } from '@angular/core';
import { API } from 'src/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { tap, catchError, mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(user: any): Observable<any> {
    return this.http.post(`${API}/signin`, JSON.stringify(user)).pipe(
      tap((response) => this.storeToken(response)),
      catchError((response) => of(response.error))
    );
  }

  logout(): Observable<any> {
    return this.http.get(`${API}/signout`).pipe(
      tap(() => this.removeTokens()),
      mapTo(true),
      catchError((error) => of(error))
    );
  }

  signup(user: any): Observable<any> {
    return this.http
      .post(`${API}/signup`, JSON.stringify(user))
      .pipe(catchError((reponse) => of(reponse.error)));
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

  removeTokens = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  isLoggedIn(): boolean {
    if (localStorage.getItem('token') === null) {
      return false;
    }
    return true;
  }

  getToken(): any {
    return JSON.parse(localStorage.getItem('token'));
  }
}
