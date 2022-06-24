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
    return this.http.get(`${API}/strategies/getAllStrategies/${id}`).pipe(
      map((response) => {
        return response;
      }),
      catchError((response) => of(response.error))
    );
  }

  addStratergy(payload: any): Observable<any> {
    return this.http
      .post(`${API}/strategies/addStrategy`, JSON.stringify(payload))
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((response) => of(response.error))
      );
  }
}
