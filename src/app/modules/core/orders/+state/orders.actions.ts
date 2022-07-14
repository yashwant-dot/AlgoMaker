import { Action } from '@ngrx/store';

export enum OrdersActionTypes {
  GetOrders = '[Orders] Get Orders',
  GetOrdersSuccess = '[Orders] Get Orders Success',
  GetOrdersFail = '[Orders] Get Orders Fail',
}

export class GetOrders implements Action {
  readonly type = OrdersActionTypes.GetOrders;
}

export class GetOrdersSuccess implements Action {
  readonly type = OrdersActionTypes.GetOrdersSuccess;
  constructor(public payload: any) {}
}

export class GetOrdersFail implements Action {
  readonly type = OrdersActionTypes.GetOrdersFail;
  constructor() {}
}

export type OrdersActions = GetOrders | GetOrdersSuccess | GetOrdersFail;
