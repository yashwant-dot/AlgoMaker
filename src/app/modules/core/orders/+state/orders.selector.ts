import { createSelector } from '@ngrx/store';
import { OrdersState } from './orders.reducer';

export interface ManageOrdersState {
  orders: OrdersState;
}

export const selectFeature = (state: ManageOrdersState) => state.orders;

export const getOrdersData = createSelector(
  selectFeature,
  (state: OrdersState) => (state ? state.data : null)
);

export const getLoading = createSelector(selectFeature, (state: OrdersState) =>
  state ? state.loading : null
);
