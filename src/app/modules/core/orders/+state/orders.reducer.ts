import { OrdersActions, OrdersActionTypes } from './orders.actions';

export interface OrdersState {
  data: any[];
  loading: boolean;
  loaded: boolean;
}

export const initialOrdersState: OrdersState = {
  data: [],
  loading: false,
  loaded: false,
};

export function OrdersReducer(
  state = initialOrdersState,
  action: OrdersActions
): OrdersState {
  switch (action.type) {
    case OrdersActionTypes.GetOrders:
      return {
        ...state,
        loading: true,
      };
    case OrdersActionTypes.GetOrdersSuccess:
      return {
        loading: false,
        loaded: true,
        data: action.payload,
      };
    case OrdersActionTypes.GetOrdersFail:
      return state;
    default:
      return state;
  }
}
