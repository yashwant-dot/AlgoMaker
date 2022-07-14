import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import {
  GetOrders,
  GetOrdersFail,
  GetOrdersSuccess,
  OrdersActionTypes,
} from './orders.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { OrdersService } from '../services';

@Injectable()
export class OrdersEffects {
  constructor(private actions$: Actions, private ordersServ: OrdersService) {}

  @Effect() getOrders$ = this.actions$.pipe(
    ofType<GetOrders>(OrdersActionTypes.GetOrders),
    switchMap((action) => {
      return this.ordersServ.getOrders().pipe(
        map((data) => {
          return new GetOrdersSuccess(data);
        }),
        catchError((err) => of(new GetOrdersFail()))
      );
    })
  );
}
