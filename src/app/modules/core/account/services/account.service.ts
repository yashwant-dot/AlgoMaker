import { Injectable } from '@angular/core';
import { API } from 'src/config';
import { HttpClient } from '@angular/common/http';
import { of, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  addAccount(payload: any): Observable<any> {
    const id = JSON.parse(localStorage.getItem('user') || '{}')?._id;
    return this.http
      .post(`${API}/accounts/addAccount`, JSON.stringify(payload))
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((error) => of(error))
      );
  }
}
