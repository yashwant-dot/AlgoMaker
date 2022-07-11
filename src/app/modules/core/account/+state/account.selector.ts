import { createSelector } from '@ngrx/store';
import { AccountState } from './account.reducer';

export interface ManageAccountState {
  account: AccountState;
}

export const selectFeature = (state: ManageAccountState) => state.account;

export const getAccountData = createSelector(
  selectFeature,
  (state: AccountState) => (state ? state.data : null)
);
