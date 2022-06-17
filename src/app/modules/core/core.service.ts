import { Injectable } from '@angular/core';
import { API } from 'src/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(private http: HttpClient) {}

  getStartergies(): Observable<any> {
    const id = JSON.parse(localStorage.getItem('user') || '{}')?._id;
    return this.http
      .get(`${API}/strategies/getAllStrategies/${id}`, {
        headers: this.getHeaders(),
      })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((response) => of(response.error))
      );
  }

  getHeaders(): HttpHeaders {
    const token = JSON.parse(localStorage.getItem('token') || '{}');
    return new HttpHeaders()
      .set('Accept', 'application/json')
      .set('content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
  }
}
