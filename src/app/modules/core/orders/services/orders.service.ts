import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API } from 'src/config';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  getOrders(): Observable<any> {
    const id = JSON.parse(localStorage.getItem('user') || '{}')?._id;
    return this.http.get(`${API}/orders/getTodaysOrders/${id}`).pipe(
      map((response) => {
        return response;
      }),
      catchError((response) => of(response.error))
    );
  }
}
